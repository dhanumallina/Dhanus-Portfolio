const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

// POST /api/visitors
// Track a new visitor or email submission
router.post('/', async (req, res) => {
    try {
        const { email, device, country } = req.body;
        
        let type = 'Normal';
        if (email && email.includes('@') && !email.includes('gmail.com') && !email.includes('yahoo.com') && !email.includes('hotmail.com')) {
            type = 'Recruiter'; // Simple check for company domain
        }

        const newVisitor = new Visitor({ email, type, device, country });
        await newVisitor.save();

        res.status(201).json({ success: true, visitor: newVisitor });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// POST /api/visitors/track-resume
// Track when a visitor views the resume
router.post('/track-resume', async (req, res) => {
    try {
        const { email } = req.body;
        if (email) {
            await Visitor.findOneAndUpdate({ email }, { resumeViewed: true });
        }
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
