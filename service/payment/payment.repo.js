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
        const res = await PaymentDetails.findOneAndUpdate(
            { order_id: session_id },
            {
                $set: {
                    order_id: order_id,
                    is_payment_confirmed: true,
                    updated_on: new Date().toISOString()
                }
            },

        );
        if (res) {
            response.status = true;
            response.message = Message.Updated;
            response.data = res;
            return response;
        } else {
            response.message = Message.NotUpdated;
            response.data = res;
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