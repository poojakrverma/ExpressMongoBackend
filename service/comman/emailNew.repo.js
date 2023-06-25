import { sendEmail } from "./email.repo.js";
import { GetOTP } from "./otp.repo.js";
import { readFile } from 'fs/promises';
import ejs from 'ejs'

/**
 * @description this method is used to fetch the email template by passing the template name.
 * @param {*} templateName 
 * @returns email template.
 */
export const loadEmailViews = async (templateName, emailDataObject) => {
    try {
        const data = await readFile(`./views/email/${templateName}.ejs`, 'utf8');
        const emailContent = ejs.render(data, emailDataObject);
        return emailContent;
    } catch (error) {
        console.log(error);
        return error;
    }
};

/**
 * @description this method is used to send the OTP in email
 * @param {*} dtoEmail 
 * @returns the response of sent email info
 */
export const sentOTPEmail = async (dtoEmail) => {
    try {
        // Generate the OTP
        const otp = GetOTP();
        const name = dtoEmail.name;
        // Load the HTML template
        const emailObj = { otp, name };
        const htmlTemplate = await loadEmailViews('otpMail', emailObj);
        const resp = await sendEmail({
            "toEmailId": dtoEmail.toEmailId,
            "subject": dtoEmail.subject,
            "emailBody": htmlTemplate
        })
        return resp;

    } catch (error) {
        console.log(error);
        return error;
    }
}

export const sendEmailVerificationMail = async (dtoEmail) => {
    try {
        const emailObj = {
            verificationLink: 'https://www.google.com'
        };
        const htmlTemplate = await loadEmailViews('emailVerification', emailObj);
        const resp = await sendEmail({
            "toEmailId": dtoEmail.toEmailId,
            "subject": dtoEmail.subject,
            "emailBody": htmlTemplate
        })
        return resp;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const sendOrderConfirmationMail = async (orders) => {
    try {
        orders.restraunt_name = 'Test Restraunt'
        orders.customer_name = 'Test Customer';
        const htmlTemplate = await loadEmailViews('orderConfirmation', orders);
        const resp = await sendEmail({
            "toEmailId": dtoEmail.toEmailId,
            "subject": dtoEmail.subject,
            "emailBody": htmlTemplate
        })
        return resp;
    } catch (error) {
        console.log(error);
        return error;
    }
}