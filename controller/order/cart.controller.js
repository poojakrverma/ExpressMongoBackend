import * as _cart from "../../service/order/cart.repo.js";


export const AddToCart = async (req, res) => {
    try {
        const result = await _cart.addToCart(req.body, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const RemoveFromCart = async (req, res) => {
    try {
        const { session_id, index } = req.params;
        const result = await _cart.removeFromCart(session_id, index, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const getCartDetails = async (req, res) => {
    try {
        const result = await _cart.getCartDetails(req.params.session_id, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const getCart = async (req, res) => {
    try {
        const result = await _cart.getCart(req.params.session_id, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}