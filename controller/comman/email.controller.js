import { sentOTPEmail } from '../../service/comman/emailNew.repo.js';
import { sendEmail } from './../../service/comman/email.repo.js'

export const SendEmail = async (req, res) => {
    try {
        const resp = await sendEmail(req.body);
        console.log(resp);
        return res.status(200).json({ success: true, message: resp });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error });
    }
}

export const SentOTPEmail = async (req, res) => {
    try {
        const resp = await sentOTPEmail(req.body);
        console.log(resp);
        return res.status(200).json({ success: true, message: resp });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error });
    }
}