import express from "express";
import { GetOTP, matchOtp, saveOtp } from "../../controller/comman/otp.controller.js";

const router = express.Router();

router.get('/GetOtp', GetOTP);

router.post('/MatchOtp', matchOtp);

router.post('/SaveOtp', saveOtp);


export default router;