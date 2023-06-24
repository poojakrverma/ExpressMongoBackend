import { OTP } from "../../models/comman/otp.model.js";
import KeyGen from "../../utils/key.js";


function GetOTP() {
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}

async function matchOtp(confirmOTP, req) {
    const response = { status: false, message: '', data: null };
    try {
        if (confirmOTP === null) {
            response.message = 'Invalid Data';
            return response;
        }

        const otpDetails = await OTP.findOne({ UserId: confirmOTP.UserId, OTP: confirmOTP.OTP });

        if (otpDetails === null) {
            response.message = 'Invalid OTP.';
            return response;
        }

        if (otpDetails.OTP === confirmOTP.OTP && otpDetails.OtpExpiryTime < new Date()) {
            response.message = 'OTP Expired';
            return response;
        }

        if (otpDetails.OTP === confirmOTP.OTP && otpDetails.OtpExpiryTime > new Date()) {
            response.status = true;
            response.message = Message.Updated;
            response.data = res;
            return response;
        }

        response.message = Message.Error;
        return response;
    } catch (error) {
        response.message = Message.Error;
        response.data = error.message;
        return response;
    }
}

async function saveOtp(otpDto, req) {
    const response = { status: false, message: '', data: null };
    try {
        if (otpDto === null) {
            response.message = Message.InvalidData;
            return response;
        }

        otpDto.OTP = GetOTP();
        otpDto.Email = Email;
        otpDto.OtpTime = new Date();
        otpDto.OtpExpiryTime = new Date();
        otpDto.OtpExpiryTime.setMinutes(otpDto.OtpExpiryTime.getMinutes() + 5);
        otpDto.is_active = true;
        otpDto.created_by = req.user.user_id;
        otpDto.created_on = new Date();
        otpDto.updated_by = req.user.user_id;
        otpDto.updated_on = new Date();

        const resp = await OTP.create(otpDto);
        if (resp) {
            // await sendEmail({
            //     EmailBody: `Dear ${Email}. Login OTP is ${otpDto.OTP}. It will be expired within 2 minutes.`,
            //     FromEmailid: _configuration.getValue('Email:emailId'),
            //     Subject: 'Login OTP',
            //     ToEmailid: Email
            // });

            response.status = true;
            response.message = 'OTP sent successfully.';
            return response;
        } else {
            response.message = Message.Error;
            return response;
        }
    } catch (error) {
        response.message = error.message;
        return response;
    }
}


export { GetOTP, matchOtp, saveOtp };