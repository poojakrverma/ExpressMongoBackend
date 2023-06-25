import { PaymentAPI } from "../../models/payment/paymentAPI.model.js";
import { PaymentDetails } from "../../models/payment/paymentDetails.model.js";
import KeyGen from "../../utils/key.js";
import * as _payment from "./payment.repo.js";
import * as _cart from "../order/cart.repo.js"
import Razorpay from 'razorpay';
import fetch from 'node-fetch';


export async function GetRazorPayPaymentLink(cart, req) {
    const addToCartResponse = await _cart.addToCart(cart, req);
    if (!addToCartResponse.status) {
        return addToCartResponse;
    }

    const { payment_api_key, payment_api_secret_key, payment_url } = await PaymentAPI.findOne({ _id: "649748bfee035e3bcce4e49a" });

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
        callback_url: process.env.PAYMENT_CALLBACK_URL || "http://localhost:4200/details/restraunt-food/order-Confirmation",
        callback_method: "get"
    };

    const encodedAuthInfo = Buffer.from(`${payment_api_key}:${payment_api_secret_key}`).toString("base64");

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Basic ${encodedAuthInfo}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
    };

    try {
        const paymentLinkResponse = await fetch(payment_url + 'payment_links', requestOptions);
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
        };
    }
}

export async function FetchRazorPayPaymentInformation(paymentRzPay, req) {
    try {
        const paymentDetails = await PaymentDetails.findOne({ order_id: paymentRzPay.session_id });
        const { payment_api_key, payment_api_secret_key } = await PaymentAPI.findOne({ _id: "649748bfee035e3bcce4e49a" });
        const client = new Razorpay({
            key_id: payment_api_key,
            key_secret: payment_api_secret_key,
        });

        const payment = await client.payments.fetch(paymentRzPay.razorpay_payment_id);
        const status = payment.status;

        if (status === "captured") {
            const response = {
                status: true,
                message: "Payment Successful",
                data: payment
            };
            return response;
        } else {
            return {
                status: false,
                message: "Payment not successful"
            };
        }
    } catch (error) {
        console.error(error);
        return {
            status: false,
            message: "Error occurred",
            data: error
        };
    }
}


