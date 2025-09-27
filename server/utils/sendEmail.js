const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text }) => {
    try {
        // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: Boolean(process.env.SMTP_SECURE), // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        // Send mail with defined transport object
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject,
            text
        });

        console.log('Email sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }
};

module.exports = sendEmail;
