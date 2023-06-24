import { PaymentDetails } from "../../models/payment/paymentDetails.model.js";
import { Message } from "../../utils/constant.js";
import KeyGen from "../../utils/key.js";

export async function SavePaymentDetails(razorPayRs, cart, api_id, req) {
    try {
        const response = {
            status: false,
            message: '',
            data: null
        };

        const paymentDetails = {
            payment_link_id: razorPayRs.id,
            order_id: cart._id,
            payment_api_id: api_id,
            payment_time: new Date().toISOString(),
            payment_for: 'Food Order',
            is_payment_confirmed: false,
            created_by: req.user._id,
            created_on: new Date().toISOString(),
            updated_by: req.user._id,
            updated_on: new Date().toISOString()
        };
        const res = await PaymentDetails.create(paymentDetails);
        if (res) {
            response.status = true;
            response.message = Message;
            response.data = paymentDetails;
            return response;
        } else {
            response.message = Message.NotSaved;
            response.data = paymentDetails;
            return response;
        }
    } catch (error) {
        return {
            status: false,
            message: error,
            data: null
        };
    }
}

export async function UpdatePaymentDetails(session_id, order_id, req) {
    try {
        const response = {
            status: false,
            message: '',
            data: null
        };

        const paymentDetail = await PaymentDetails.findOne({ order_id: session_id });
        paymentDetail.order_id = order_id;
        paymentDetail.is_payment_confirmed = true;
        paymentDetail.updated_on = new Date().toISOString();
        const res = await PaymentDetails.updateOne({ _id: paymentDetail._id }, paymentDetail);
        if (res) {
            response.status = true;
            response.message = Message.Updated;
            response.data = paymentDetail;
            return response;
        } else {
            response.message = Message.NotUpdated;
            response.data = paymentDetail;
            return response;
        }
    } catch (error) {
        return {
            status: false,
            message: error,
            data: null
        };
    }
}