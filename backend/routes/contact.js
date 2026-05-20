const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports (like 587)
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false,
            minVersion: 'TLSv1.2'
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000
    });
};

router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Save message to DB
        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        // Send emails if credentials are configured
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = createTransporter();

            // 1. Send "Thank You" email TO THE VISITOR
            await transporter.sendMail({
                from: `"Mallina Dhanusivaramakrishna" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'Thanks for reaching out! 🙌',
                html: `
                    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f0f0f0; border-radius: 12px; overflow: hidden;">
                        <div style="background: linear-gradient(135deg, #00f2fe, #4facfe); padding: 30px; text-align: center;">
                            <h1 style="margin: 0; color: #0a0a0a; font-size: 24px;">Thank You, ${name}!</h1>
                        </div>
                        <div style="padding: 30px;">
                            <p style="color: #a0a0a0; line-height: 1.8; font-size: 16px;">
                                I really appreciate you taking the time to visit my portfolio and reaching out. 
                                I've received your message and will get back to you as soon as possible.
                            </p>
                            <div style="background: #121212; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 3px solid #00f2fe;">
                                <p style="color: #666; margin: 0 0 8px 0; font-size: 14px;">Your message:</p>
                                <p style="color: #f0f0f0; margin: 0; font-style: italic;">"${message}"</p>
                            </div>
                            <p style="color: #a0a0a0; line-height: 1.8;">
                                In the meantime, feel free to check out my latest projects on 
                                <a href="https://github.com/dhanumallina" style="color: #00f2fe; text-decoration: none;">GitHub</a>.
                            </p>
                            <hr style="border: none; border-top: 1px solid #1a1a1a; margin: 25px 0;">
                            <p style="color: #666; font-size: 14px; margin: 0;">
                                Best regards,<br>
                                <strong style="color: #f0f0f0;">Mallina Dhanusivaramakrishna</strong><br>
                                Full Stack Developer & Data Analyst
                            </p>
                        </div>
                    </div>
                `
            });

            // 2. Send notification TO THE ADMIN (you)
            await transporter.sendMail({
                from: `"Portfolio Bot" <${process.env.EMAIL_USER}>`,
                to: process.env.EMAIL_USER,
                subject: `📬 New Contact: ${name} (${email})`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px;">
                        <h2>New Contact Form Submission</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Message:</strong></p>
                        <blockquote style="background: #f5f5f5; padding: 15px; border-left: 3px solid #00f2fe; border-radius: 4px;">${message}</blockquote>
                        <p style="color: #888; font-size: 12px;">Sent from your portfolio contact form</p>
                    </div>
                `
            });

            console.log(`✅ Emails sent: Thank-you to ${email}, Notification to admin`);
        }

        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
        console.error('CONTACT ROUTE ERROR:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;