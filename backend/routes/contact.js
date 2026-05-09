const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// POST /api/contact
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Save message to DB
        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        // Create transporter
       const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

        // Verify transporter
        await transporter.verify();

        // Send thank-you email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thanks for visiting my portfolio!',
            text: `Hi ${name},

Thank you for reaching out! I have received your message and will get back to you soon.

Best,
Mallina Dhanusivaramakrishna
Full Stack Developer & Data Analyst`
        });

        console.log('Thank-you email sent successfully');

        res.status(201).json({
            success: true,
            message: 'Message sent successfully!'
        });

    } catch (err) {
        console.error('CONTACT ROUTE ERROR:', err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;