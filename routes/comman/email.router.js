import express from "express";
import { SendEmail, SendEmailVerificationMail, SentOTPEmail } from "../../controller/comman/email.controller.js";


const router = express.Router();

router.post('/SendEmail', SendEmail);

router.post('/SendOTPEmail', SentOTPEmail);

router.post('/SendEmailVerificationMail', SendEmailVerificationMail);

export default router;