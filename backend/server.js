require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const Project = require('./models/Project');
const projectsRouter = require('./routes/projects');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected');
    try {
      const count = await Project.countDocuments();
      if (count === 0) {
        console.log('🌱 Database empty. Seeding default projects...');
        await Project.insertMany(projectsRouter.defaultProjects);
        console.log('✅ Default projects seeded!');
      }
    } catch (seedErr) {
      console.error('❌ Error during auto-seeding:', seedErr);
    }
  })
  .catch((err) => console.log(err));

// Root Route
app.get('/', (req, res) => {
  res.send('Backend is running successfully 🚀');
});

// Ping Route (to keep Render awake)
app.get('/api/ping', (req, res) => {
  res.status(200).send('pong');
});

// Debug Email Route
app.get('/api/debug-email', async (req, res) => {
  const toEmail = req.query.to || 'mallinadhanu@gmail.com';
  try {
    const { sendEmail } = require('./utils/emailService');
    const info = await sendEmail({
      to: toEmail,
      subject: 'Debug Email from Render 🧪',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #111; color: #fff;">
          <h2>Render Backend Debug Email</h2>
          <p>This is a debug test email sent from the live Render container.</p>
          <p>SMTP User in use: <strong>${process.env.SMTP_USER || process.env.EMAIL_USER}</strong></p>
        </div>
      `
    });
    res.json({ success: true, message: 'Email sent successfully', info });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email', 
      error: err.message, 
      stack: err.stack,
      env: {
        hasUser: !!(process.env.SMTP_USER || process.env.EMAIL_USER),
        hasPass: !!(process.env.SMTP_PASS || process.env.EMAIL_PASS),
        userVal: process.env.SMTP_USER || process.env.EMAIL_USER,
        hasBrevoKey: !!process.env.BREVO_API_KEY,
        brevoKeyPrefix: process.env.BREVO_API_KEY ? process.env.BREVO_API_KEY.substring(0, 6) : 'none'
      }
    });
  }
});

// API Routes
app.use('/api/contact', require('./routes/contact'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/visitors', require('./routes/visitors'));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});