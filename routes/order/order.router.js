import express from "express";
import { isAuthenticated } from "./../../middlewares/auth.js";
import { getAllOrderByRestrauntId, getAllOrderByRestrauntIdDescending, getOrderDetailsByOrderId, saveOrder, updateOrder, updateOrderStatus } from "../../controller/order/order.controller.js";

const router = express.Router();

router.get('/GetAllOrderByRestrauntId', isAuthenticated, getAllOrderByRestrauntId);

router.get('/GetAllOrderByRestrauntIdDescending', isAuthenticated, getAllOrderByRestrauntIdDescending);

router.get('/GetOrderDetailsByOrderId/:order_id', getOrderDetailsByOrderId);

router.post('/SaveOrder', isAuthenticated, saveOrder);

router.post('/UpdateOrder', isAuthenticated, updateOrder);

router.post('/UpdateOrderStatus', isAuthenticated, updateOrderStatus);

export default router;