import { sendEmail } from "./email.repo.js";
import { GetOTP } from "./otp.repo.js";
import fs from 'fs'
import ejs from 'ejs'

/**
 * @description this method is used to fetch the email template by passing the template name.
 * @param {*} templateName 
 * @returns email template.
 * @author Purushuttam Kumar
 */
const loadEmailViews = (templateName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`./views/email/${templateName}.ejs`, 'utf8', (error, data) => {
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
        const name = dtoEmail.name;
        // Load the HTML template
        const htmlTemplate = await loadEmailViews('otpMail');
        // Replace the OTP placeholder and name with the actual OTP value and name
        const emailContent = ejs.render(htmlTemplate, { otp, name });
        const resp = await sendEmail({
            "toEmailId": dtoEmail.toEmailId,
            "subject": dtoEmail.subject,
            "emailBody": emailContent
        })
        return resp;

    } catch (error) {
        console.log(error);
        return error;
    }
}