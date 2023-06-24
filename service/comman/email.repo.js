import { createTransport } from 'nodemailer';

/**
 * @description this is comman method to send email by passing dtoEmail object
 * @param {*} dtoEmail 
 * @returns SentMessageInfo
 */
export async function sendEmail(dtoEmail) {
    try {
        console.log(dtoEmail);
        const transporter = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: dtoEmail.toEmailId,
            subject: dtoEmail.subject,
            headers: {
                'Content-Type': 'text/html; charset=utf-8'
            },
            html: dtoEmail.emailBody
        };

        return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error(error);
        return error;
    }
}
