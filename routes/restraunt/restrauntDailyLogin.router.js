import express from "express";
import { GetAllTodayOrderDetails, GetRestrauntStatus, OfflineRestraunt, OnlineRestraunt, UpdateCancelledOrder, UpdateCompletedOrder, UpdateTotalOrder } from "../../controller/restraunt/restrauntDailyLogin.controller.js";
import { isAuthenticated } from "../../middlewares/auth.js";


const router = express.Router();

router.get('/GetAllTodayOrderDetails', isAuthenticated, GetAllTodayOrderDetails);

router.get('/GetRestrauntStatus', GetRestrauntStatus);

router.post('/OfflineRestraunt', isAuthenticated, OfflineRestraunt);

router.post('/OnlineRestraunt', isAuthenticated, OnlineRestraunt);

router.post('/UpdateCancelledOrder', UpdateCancelledOrder);

router.post('/UpdateCompletedOrder', UpdateCompletedOrder);

router.post('/UpdateTotalOrder', UpdateTotalOrder);

export default router;