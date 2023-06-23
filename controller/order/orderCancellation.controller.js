import * as _orderCancellation from "../../service/order/orderCancellation.repo.js";



export const getAllOrderCancellationByRestrauntId = async (req, res) => {
    try {
        const result = await _orderCancellation.getAllOrderCancellationByRestrauntId(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const getOrderCancellationByOrderId = async (req, res) => {
    try {
        const result = await _orderCancellation.getOrderCancellationByOrderId(req.params.order_id, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const saveOrderCancellation = async (req, res) => {
    try {
        const result = await _orderCancellation.saveOrderCancellation(req.body, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}