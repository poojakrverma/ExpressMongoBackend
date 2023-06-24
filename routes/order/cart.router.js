import express from "express";
import { AddToCart, RemoveFromCart, getCartDetails } from "../../controller/order/cart.controller.js";

const router = express.Router();

router.get('/GetCartDetails/:session_id', getCartDetails);

router.post('/AddToCart', AddToCart);

router.get('/RemoveFromCart/:session_id/:index', RemoveFromCart);

export default router;