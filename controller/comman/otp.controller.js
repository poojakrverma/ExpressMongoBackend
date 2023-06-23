import * as OTPRepository from "../../service/comman/otp.repo.js";


export const GetOTP = async (req, res) => {
    try {
        const ressult = OTPRepository.GetOTP();
        return res.status(200).json(ressult);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const matchOtp = async (req, res) => {
    try {
        const ressult = await OTPRepository.matchOtp(req.body, req);
        return res.status(200).json(ressult);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}


export const saveOtp = async (req, res) => {
    try {
        const ressult = await OTPRepository.saveOtp(req.body, req);
        return res.status(200).json(ressult);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}