import * as _order from "../../service/order/order.repo.js";

export const getAllOrderByRestrauntId = async (req, res) => {
    try {
        const result = await _order.getAllOrderByRestrauntId(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}


export const getAllOrderByRestrauntIdDescending = async (req, res) => {
    try {
        const result = await _order.getAllOrderByRestrauntIdDescending(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}


export const getOrderDetailsByOrderId = async (req, res) => {
    try {
        const result = await _order.getOrderDetailsByOrderId(req.params.order_id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}


export const saveOrder = async (req, res) => {
    try {
        const result = await _order.saveOrder(req.body, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}


export const updateOrder = async (req, res) => {
    try {
        const result = await _order.updateOrder(req.body, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}


export const updateOrderStatus = async (req, res) => {
    try {
        const result = await _order.updateOrderStatus(req.body, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}