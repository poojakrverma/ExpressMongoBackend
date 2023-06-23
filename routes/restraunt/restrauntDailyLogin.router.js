import express from "express";
import { GetAllTodayOrderDetails, GetRestrauntStatus, OfflineRestraunt, OnlineRestraunt, UpdateCancelledOrder, UpdateCompletedOrder, UpdateTotalOrder } from "../../controller/restraunt/restrauntDailyLogin.controller.js";


const router = express.Router();

router.get('/GetAllTodayOrderDetails', GetAllTodayOrderDetails);

router.get('/GetRestrauntStatus', GetRestrauntStatus);

router.post('/OfflineRestraunt', OfflineRestraunt);

router.post('/OnlineRestraunt', OnlineRestraunt);

router.post('/UpdateCancelledOrder', UpdateCancelledOrder);

router.post('/UpdateCompletedOrder', UpdateCompletedOrder);

router.post('/UpdateTotalOrder', UpdateTotalOrder);

export default router;