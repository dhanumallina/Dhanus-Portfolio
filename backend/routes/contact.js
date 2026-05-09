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

        // Send email via Nodemailer
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Thanks for visiting my portfolio!',
                text: `Hi ${name},\n\nThank you for reaching out! I have received your message and will get back to you soon.\n\nBest,\nMallina Dhanusivaramakrishna\nFull Stack Developer & Data Analyst`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) console.error('Error sending email:', error);
                else console.log('Email sent:', info.response);
            });
        }

        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
