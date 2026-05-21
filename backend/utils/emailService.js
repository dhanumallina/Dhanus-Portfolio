const nodemailer = require('nodemailer');

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const sendEmail = async ({ to, subject, html }) => {
    if (!to || !validateEmail(to)) {
        throw new Error(`Invalid email address: ${to}`);
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const apiKey = process.env.BREVO_API_KEY;

    if (emailUser && emailPass) {
        // Use Gmail SMTP
        try {
          const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

            const mailOptions = {
                from: `"Mallina Dhanusivaramakrishna" <${emailUser}>`,
                to,
                subject,
                html
            };

            const info = await transporter.sendMail(mailOptions);
            console.log(`✅ Email sent successfully via Gmail SMTP to ${to}. MessageId:`, info.messageId);
            return info;
        } catch (error) {
            console.error('❌ Gmail SMTP Email Error:', error.message);
            throw error;
        }
    } else if (apiKey) {
        // Fallback to Brevo
        try {
            const senderEmail = emailUser || 'mallinadhanu@gmail.com';
            const response = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': apiKey,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    sender: {
                        name: 'Mallina Dhanusivaramakrishna',
                        email: senderEmail
                    },
                    to: [
                        {
                            email: to
                        }
                    ],
                    subject: subject,
                    htmlContent: html
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to send email via Brevo');
            }
            console.log(`✅ Email sent successfully via Brevo to ${to}. MessageId:`, data.messageId);
            return data;
        } catch (error) {
            console.error('❌ Brevo Email Error:', error.message);
            throw error;
        }
    } else {
        console.warn('⚠️ Neither Gmail SMTP credentials (EMAIL_USER & EMAIL_PASS) nor BREVO_API_KEY are defined. Email will not be sent.');
        return null;
    }
};

module.exports = { sendEmail };

