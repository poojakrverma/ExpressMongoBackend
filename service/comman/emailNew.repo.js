import { sendEmail } from "./email.repo.js";
import { GetOTP } from "./otp.repo.js";
import fs from 'fs'
import ejs from 'ejs'

// Read the HTML template file
const loadHTMLTemplate = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./../ExpressMongoBackend/assets/email/otpMail.ejs', 'utf8', (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
};

/**
 * @description this method is used to send the OTP in email
 * @param {*} dtoEmail 
 * @returns the response of sent email info
 * @author Purushuttam Kumar
 */
export const sentOTPEmail = async (dtoEmail) => {
    try {
        // Generate the OTP
        const otp = GetOTP();
        const name = 'Purushuttam kumar'
        // Load the HTML template
        const htmlTemplate = await loadHTMLTemplate();
        // Replace the OTP placeholder and name with the actual OTP value and name
        const emailContent = ejs.render(htmlTemplate, { otp, name });
        const resp = await sendEmail({
            "toEmailId": dtoEmail.toEmailId,
            "subject": dtoEmail.subject,
            "emailBody": emailContent
        })
        console.log(resp);
        return resp;

    } catch (error) {
        console.log(error);
        return error;
    }
}