import express from "express";
import { isAuthenticated } from "./../../middlewares/auth.js";
import { getAllOrderCancellationByRestrauntId, getOrderCancellationByOrderId, saveOrderCancellation } from "../../controller/order/orderCancellation.controller.js";

const router = express.Router();

router.get('/GetAllOrderCancellationByRestrauntId', getAllOrderCancellationByRestrauntId);

router.post('/GetOrderCancellationByOrderId', getOrderCancellationByOrderId);

router.post('/SaveOrderCancellation', saveOrderCancellation);

export default router;