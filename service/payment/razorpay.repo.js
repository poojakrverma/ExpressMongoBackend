import { PaymentAPI } from "../../models/payment/paymentAPI.model.js";
import { PaymentDetails } from "../../models/payment/paymentDetails.model.js";
import KeyGen from "../../utils/key.js";
import * as _payment from "./payment.repo.js";
import Razorpay from 'razorpay';


export async function GetRazorPayPaymentLink(cart, req) {
    const response = await _cart.AddToCart(cart);
    if (!response.resp) {
        return null;
    }

    const apiDetails = await PaymentAPI.findOne({ payment_api_id: "2302251837217803911" });
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
            email: Email
        },
        notify: {
            sms: true,
            email: true
        },
        reminder_enable: true,
        notes: {
            policy_name: "Test Restraunt"
        },
        callback_url: "http://localhost:4200/details/restraunt-food/order-Confirmation",
        callback_method: "get"
    };

    const jsonData = JSON.stringify(options);

    const authInfo = apiDetails.payment_api_key + ":" + apiDetails.payment_api_secret_key;
    const encodedAuthInfo = Buffer.from(authInfo).toString("base64");

    const headers = {
        "Authorization": "Basic " + encodedAuthInfo,
        "Content-Type": "application/json"
    };

    const requestOptions = {
        method: "POST",
        headers: headers,
        body: jsonData
    };

    const paymentLinkResponse = await fetch(apiDetails.payment_url + "payment_links", requestOptions);
    const responseData = await paymentLinkResponse.json();
    const rrr = JSON.parse(responseData);

    const resp = await this._payment.SavePaymentDetails(rrr, cart, apiDetails.payment_api_id);

    return rrr;
}

export async function FetchRazorPayPaymentInformation(paymentRzPay, req) {
    try {
        const paymentDetails = await PaymentDetails.findOne({ order_id: paymentRzPay.session_id });
        const apiDetails = await PaymentAPI.findOne({ payment_api_id: "2302251837217803911" });

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

        const response = new Response();
        if (status === "captured") {
            response.status = true;
            response.message = "Payment Successful";
            response.data = payment;
        } else {
            response.status = false;
        }

        return response;
    } catch (error) {
        console.error(error);
        // Handle the error
        const response = new Response();
        response.status = false;
        return response;
    }
}

