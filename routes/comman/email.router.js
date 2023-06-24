import express from "express";
import { SendEmail, SentOTPEmail } from "../../controller/comman/email.controller.js";


const router = express.Router();

router.post('/SendEmail', SendEmail);

router.post('/SendOTPEmail', SentOTPEmail);

export default router;