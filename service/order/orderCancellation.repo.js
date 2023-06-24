import { Orders } from "../../models/order/order.model.js";
import { OrderCancellation } from "../../models/order/orderCancellation.model.js";
import * as _restrauntDailyLogin from "../restraunt/restrauntDailyLogin.repo.js";

export async function getAllOrderCancellationByRestrauntId(req) {
    const response = { status: false, message: '', data: null };
    try {
        const order = await OrderCancellation.find({ user_id: req.user.user_id });

        if (!order || order.length === 0) {
            response.message = 'No order cancellations found';
            return response;
        }

        response.status = true;
        response.message = 'Order cancellations fetched successfully';
        response.data = order;
        return response;
    } catch (error) {
        response.message = error.message;
        return response;
    }
}

export async function getOrderCancellationByOrderId(orderId, req) {
    const response = { status: false, message: '', data: null };
    try {
        const order = await OrderCancellation.findOne({ order_id: orderId });

        if (!order) {
            response.message = 'Order cancellation not found';
            return response;
        }

        response.status = true;
        response.message = 'Order cancellation fetched successfully';
        response.data = order;
        return response;
    } catch (error) {
        response.message = error.message;
        return response;
    }
}

export async function saveOrderCancellation(orderCancellation, req) {
    const response = { status: false, message: '', data: null };

    try {
        if (!orderCancellation) {
            response.message = 'Invalid order cancellation data';
            return response;
        }

        orderCancellation.cancellation_time = new Date();
        orderCancellation.user_id = LoggedInUser;

        const resp = await OrderCancellation.create(orderCancellation);
        if (!resp) {
            response.message = 'Error while cancelling the order';
            return response;
        }
        const objOrders = await Orders.findOne({ order_id: orderCancellation.order_id });
        const objRestraunt = await _restrauntDailyLogin.UpdateCancelledOrder(objOrders, req);

        if (!objRestraunt.status) {
            response.message = 'Error updating cancelled order in the restaurant';
            return response;
        }

        response.status = true;
        response.message = 'Order cancellation saved successfully';
        response.data = resp;
        return response;
    } catch (error) {
        response.message = error.message;
        return response;
    }
}