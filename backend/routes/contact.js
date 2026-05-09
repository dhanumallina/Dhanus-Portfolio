const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { Resend } = require('resend');

const resend = new Resend(process.env.re_BwpTkfD8_FGUhqLCiG4z5Ev9uq1yXdjMX);

router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Save to MongoDB
        const newMessage = new Message({
            name,
            email,
            message
        });

        await newMessage.save();

        // Send thank-you email
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Thanks for visiting my portfolio!',
            text: `Hi ${name},

Thank you for reaching out! I received your message and will get back to you soon.

Best,
Mallina Dhanusivaramakrishna`
        });

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