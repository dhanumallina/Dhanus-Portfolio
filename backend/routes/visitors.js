const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');
const { sendEmail } = require('../utils/emailService');
const auth = require('../middleware/auth');

// POST /api/visitors
// Track a new visitor or email submission
router.post('/', async (req, res) => {
    try {
        const { email, device, country } = req.body;
        
        let type = 'Normal';
        if (email && email.includes('@') && !email.includes('gmail.com') && !email.includes('yahoo.com') && !email.includes('hotmail.com')) {
            type = 'Recruiter';
        }

        const newVisitor = new Visitor({ email, type, device, country });
        await newVisitor.save();

        const emailConfigured = (process.env.EMAIL_USER && process.env.EMAIL_PASS) || process.env.BREVO_API_KEY;

        // Send welcome greeting email to the visitor
        if (emailConfigured && email) {
            await sendEmail({
                to: email,
                subject: 'Welcome to My Portfolio! 🚀',
                html: `
                    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f0f0f0; border-radius: 12px; overflow: hidden;">
                        <div style="background: linear-gradient(135deg, #00f2fe, #7f00ff); padding: 40px; text-align: center;">
                            <h1 style="margin: 0; color: #fff; font-size: 28px;">Welcome! 👋</h1>
                            <p style="color: rgba(255,255,255,0.9); margin-top: 10px; font-size: 16px;">Thanks for visiting my portfolio</p>
                        </div>
                        <div style="padding: 30px;">
                            <p style="color: #a0a0a0; line-height: 1.8; font-size: 16px;">
                                Hi there! I'm <strong style="color: #00f2fe;">Mallina Dhanusivaramakrishna</strong>, 
                                a Full Stack Developer & Data Analyst passionate about building amazing web applications.
                            </p>
                            <p style="color: #a0a0a0; line-height: 1.8; font-size: 16px;">
                                Feel free to explore my projects, check out my skills, and don't hesitate to reach out 
                                if you'd like to collaborate or have any opportunities!
                            </p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="https://github.com/dhanumallina" style="display: inline-block; background: linear-gradient(135deg, #00f2fe, #4facfe); color: #0a0a0a; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">View My GitHub</a>
                            </div>
                            <hr style="border: none; border-top: 1px solid #1a1a1a; margin: 25px 0;">
                            <p style="color: #666; font-size: 14px; margin: 0;">
                                Best regards,<br>
                                <strong style="color: #f0f0f0;">Mallina Dhanusivaramakrishna</strong><br>
                                Full Stack Developer & Data Analyst<br>
                                <a href="mailto:mallinadhanu@gmail.com" style="color: #00f2fe; text-decoration: none;">mallinadhanu@gmail.com</a>
                            </p>
                        </div>
                    </div>
                `
            });

            console.log(`✅ Welcome email sent to ${email} (Type: ${type})`);
        }

        res.status(201).json({ success: true, visitor: newVisitor });
    } catch (err) {
        console.error('VISITOR ROUTE ERROR:', err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// POST /api/visitors/track-resume
// Track when a visitor views the resume
router.post('/track-resume', async (req, res) => {
    try {
        const { email } = req.body;
        if (email && email !== 'anonymous') {
            await Visitor.findOneAndUpdate({ email }, { resumeViewed: true });
        } else if (email === 'anonymous') {
            // Track anonymous resume view by creating/updating a mock visitor entry or just returning success
            // To prevent validation failure on email (which is required), we can create a record if needed, 
            // but let's just update if it exists or do nothing.
            // Wait, we can find the most recent visitor without resumeViewed and mark it, or do nothing.
            // Let's do a simple log or update.
        }
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// GET /api/visitors
// Retrieve all tracked visitors (Admin protected)
router.get('/', auth, async (req, res) => {
    try {
        const visitors = await Visitor.find().sort({ createdAt: -1 });
        res.json({ success: true, visitors });
    } catch (err) {
        console.error('GET VISITORS ERROR:', err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// DELETE /api/visitors/:id
// Delete a specific visitor entry (Admin protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndDelete(req.params.id);
        if (!visitor) {
            return res.status(404).json({ success: false, message: 'Visitor not found' });
        }
        res.json({ success: true, message: 'Visitor deleted successfully' });
    } catch (err) {
        console.error('DELETE VISITOR ERROR:', err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
