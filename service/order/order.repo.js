import { Orders } from "../../models/order/order.model.js";
import { User } from "../../models/user.js";
import { Message, OrderStatus } from "../../utils/constant.js";
import KeyGen from "../../utils/key.js";
import * as _payment from "../payment/payment.repo.js";
import * as _razorPay from "../payment/razorpay.repo.js";
import * as _restrauntDailyLogin from "../restraunt/restrauntDailyLogin.repo.js";
import * as _cart from "./cart.repo.js";
import * as _emailNew from "./../comman/emailNew.repo.js";



export async function getAllOrderByRestrauntId(req) {
    const response = { status: false, message: '', data: null };

    try {
        const orders = await Orders.find({ restraunt_id: req.user._id, created_on: { $gte: new Date().setUTCHours(0, 0, 0, 0), $lt: new Date().setUTCHours(23, 59, 59, 999) } });

        if (!orders || orders.length === 0) {
            response.message = 'No orders found';
            return response;
        }

        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            const orderItems = orders[i].OrderItems;

            if (!orderItems || orderItems.length === 0) {
                response.message = 'No order items found for the order';
                return response;
            }

            order.OrderItems = orderItems;

            const customerEmail = await User.findOne({ user_id: order.customer_id });
            order.customer_id = customerEmail?.email;
        }

        response.status = true;
        response.message = 'Orders fetched successfully';
        response.data = orders;
        return response;
    } catch (error) {
        response.message = error.message;
        return response;
    }
}

export async function getAllOrderByRestrauntIdDescending(req) {
    const response = { status: false, message: '', data: null };

    try {
        const orders = await Orders.find({ restraunt_id: req.user._id }).sort({ created_on: -1 });

        if (!orders || orders.length === 0) {
            response.message = 'No orders found';
            return response;
        }

        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            const orderItems = orders[i].OrderItems;

            if (!orderItems || orderItems.length === 0) {
                response.message = 'No order items found for the order';
                return response;
            }

            order.OrderItems = orderItems;

            const customerEmail = await User.findOne({ user_id: order.customer_id });
            order.customer_id = customerEmail?.email;
        }

        response.status = true;
        response.message = 'Orders fetched successfully';
        response.data = orders;
        return response;
    } catch (error) {
        response.message = error.message;
        return response;
    }
}

export async function getOrderDetailsByOrderId(OrderId) {
    const response = { status: false, message: '', data: null };

    try {
        const order = await Orders.findOne({ _id: OrderId });

        if (!order) {
            response.message = 'Order not found';
            return response;
        }

        const orderItems = order.OrderItems;

        if (!orderItems || orderItems.length === 0) {
            response.message = 'No order items found for the order';
            return response;
        }

        order.OrderItems = orderItems;

        response.status = true;
        response.message = 'Order details fetched successfully';
        response.data = order;
        return response;
    } catch (error) {
        response.message = error.message;
        return response;
    }
}

export async function saveOrder(paymentRzPay, req) {
    const response = { status: false, message: '', data: null };

    try {
        const paymentDetails = await _razorPay.FetchRazorPayPaymentInformation(paymentRzPay, req);

        if (!paymentDetails.status) {
            response.message = 'Payment not completed yet';
            return response;
        }

        const cartDetails = await _cart.getCart(paymentRzPay.session_id, req);
        if (!cartDetails) {
            response.message = 'Cart not found';
            return response;
        }

        if (paymentDetails.data.amount !== cartDetails.total_amount * 100) {
            response.message = 'payment amount not match';
            return response;
        }

        const foodDetails = cartDetails.food_details;

        const order = new Orders();
        order.total_price = cartDetails.total_amount;
        order.customer_id = req.user._id;
        order.restraunt_id = cartDetails.food_details[0].restraunt_id;
        order.delivery_address = cartDetails.address || '';
        order.discount = '';
        order.notes = '';
        order.order_details = JSON.stringify(foodDetails);
        order.updated_by = req.user._id;
        order.updated_on = new Date();
        order.created_by = req.user._id;
        order.created_on = new Date();
        order.delivery_address = cartDetails.address || '';
        order.executive_id = 'Test Rider';
        order.delivery_by = new Date(Date.now() + 40 * 60000);

        order.OrderItems = [];
        for (const item of foodDetails) {

            order.OrderItems.push({
                food_category_id: '6497441b3fd9f43cba4b3ed9',
                order_item_price: item.price,
                order_item_total_price: item.price * item.quantity,
                order_item_qty: item.quantity,
                order_item_name: item.food_name,
                is_active: true,
                updated_by: req.user._id,
                updated_on: new Date(),
                created_by: req.user._id,
                created_on: new Date()
            });
        }

        const resp = await Orders.create(order);
        if (!resp) {
            response.message = 'Invalid order data';
            return response;
        }

        const paymentUpdateResult = await _payment.UpdatePaymentDetails(paymentRzPay.session_id, order.order_id, req);

        if (!paymentUpdateResult.status) {
            response.message = 'Payment details update failed';
            return response;
        }

        const objRestraunt = await _restrauntDailyLogin.UpdateTotalOrder(resp, req);

        if (!objRestraunt.status) {
            response.message = objRestraunt.message;
            return response;
        }

        //const emailResp = await _emailNew.sendOrderConfirmationMail(order);

        response.status = true;
        response.message = `Order placed successfully with order id: ${resp._id}`;
        response.data = order;
        return response;
    } catch (error) {
        response.message = error.message;
        return response;
    }
}

export async function updateOrder(order, req) {
    const response = { status: false, message: '', data: null };

    try {
        if (!order) {
            response.message = 'Invalid order data';
            return response;
        }

        const data = await Orders.findById(order.order_id);

        if (!data) {
            response.message = 'Wrong Order Id';
            return response;
        }

        order.created_by = data.created_by;
        order.created_on = data.created_on;

        const resp = await Orders.findByIdAndUpdate(order.order_id, order);
        if (!resp) {
            response.status = false;
            response.message = Message.NotSaved;
            return response;
        }

        response.status = true;
        response.message = `Order updated successfully with order id: ${order.order_id}`;
        response.data = order;
        return response;
    } catch (error) {
        response.message = error.message;
        return response;
    }
}

export async function updateOrderStatus(order, req) {
    const response = { status: false, message: '', data: null };

    try {
        if (!order) {
            response.message = 'Invalid data';
            return response;
        }

        const data = await Orders.findById(order.order_id);

        if (!data) {
            response.message = 'Wrong Order Id';
            return response;
        }

        data.order_status = order.order_status;
        data.updated_by = req.user._id;
        data.updated_on = new Date();

        const resp = await Orders.findByIdAndUpdate(order.order_id, data);

        if (order.order_status === OrderStatus.Cooked) {
            const objOrder = await Orders.findOne({ order_id: order.order_id });
            const objRestraunt = await _restrauntDailyLogin.UpdateCompletedOrder(objOrder, req);
        }

        response.status = true;
        response.message = 'Order status updated';
        response.data = resp;
        return response;
    } catch (error) {
        response.message = error.message;
        return response;
    }
}