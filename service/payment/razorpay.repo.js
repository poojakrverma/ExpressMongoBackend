import { PaymentAPI } from "../../models/payment/paymentAPI.model.js";
import { PaymentDetails } from "../../models/payment/paymentDetails.model.js";
import KeyGen from "../../utils/key.js";
import * as _payment from "./payment.repo.js";
import * as _cart from "../order/cart.repo.js"
import Razorpay from 'razorpay';
import fetch from 'node-fetch';


export async function GetRazorPayPaymentLink(cart, req) {
    const response = await _cart.addToCart(cart, req);
    if (!response.status) {
        return response;
    }

    const apiDetails = await PaymentAPI.findOne({ _id: "649748bfee035e3bcce4e49a" });
    const options = {
        amount: cart.total_amount * 100, // Amount in paise
        currency: "INR",
        accept_partial: true,
        expire_by: 1691097057,
        reference_id: KeyGen.GetKey(),
        description: "Food Order bill.",
        customer: {
            name: "Purushuttam Kumar",
            contact: "+918210272811",
            email: req.user.email
        },
        notify: {
            sms: true,
            email: true
        },
        reminder_enable: true,
        notes: {
            policy_name: "Test Express Mongodb Backend API"
        },
        callback_url: "http://localhost:4200/details/restraunt-food/order-Confirmation",
        callback_method: "get"
    };

    const jsonData = JSON.stringify(options);

    const authInfo = apiDetails.payment_api_key + ":" + apiDetails.payment_api_secret_key;
    const encodedAuthInfo = Buffer.from(authInfo).toString("base64");

    const headers = {
        Authorization: `Basic ${encodedAuthInfo}`,
        'Content-Type': 'application/json',
    };

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: jsonData,
    };

    try {
        const paymentLinkResponse = await fetch(apiDetails.payment_url + 'payment_links', requestOptions);
        const responseData = await paymentLinkResponse.json();

        const resp = await _payment.SavePaymentDetails(responseData, cart, apiDetails._id, req);
        console.log(resp);
        if (resp.status) {
            return {
                status: true,
                message: "created payment link",
                data: responseData
            };
        }

        return {
            status: false,
            message: "Something went wrong",
            data: resp.data
        };
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: error
        }
    }
}

export async function FetchRazorPayPaymentInformation(paymentRzPay, req) {

    const response = { status: false, message: '', data: null }
    try {
        const paymentDetails = await PaymentDetails.findOne({ order_id: paymentRzPay.session_id });
        const apiDetails = await PaymentAPI.findOne({ _id: "649748bfee035e3bcce4e49a" });
        const client = new Razorpay({
            key_id: apiDetails.payment_api_key,
            key_secret: apiDetails.payment_api_secret_key,
        });

        const payment = await client.payments.fetch(paymentRzPay.razorpay_payment_id);
        const paymentId = payment.id;
        const amount = payment.amount;
        const status = payment.status;

        console.log("Payment ID: " + paymentId);
        console.log("Amount: " + amount);
        console.log("Status: " + status);

        if (status === "captured") {
            response.status = true;
            response.message = "Payment Successful";
            response.data = payment;
        } else {
            response.status = false;
            response.message = "Payment not successfull"
        }

        return response;
    } catch (error) {
        console.error(error);
        response.status = false;
        response.data = error;
        return response;
    }
}

