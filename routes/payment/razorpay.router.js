import express from "express";
import { isAuthenticated } from "./../../middlewares/auth.js";
import { GetRazorPayPaymentLink } from "../../controller/payment/razorpay.controller.js";

const router = express.Router();

router.post('/GetRazorPayPaymentLink', isAuthenticated, GetRazorPayPaymentLink);


export default router;