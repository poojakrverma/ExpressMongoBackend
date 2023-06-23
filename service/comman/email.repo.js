import { createTransport } from 'nodemailer';

async function sendEmail(dtoEmail) {
    try {
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

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error(error);
    }
}

// Call the function with the DtoEmail object
//sendEmail(dtoEmail);
module.exports = sendEmail;