require('dotenv').config();
const { sendEmail } = require('./utils/emailService');

const runTest = async () => {
    const toEmail = process.env.EMAIL_USER;
    if (!toEmail) {
        console.error('❌ EMAIL_USER is not set in your .env file!');
        process.exit(1);
    }

    console.log(`Sending test email to ${toEmail}...`);
    try {
        await sendEmail({
            to: toEmail,
            subject: 'Portfolio Test Email 📧',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background: #000; color: #fff;">
                    <h2>Gmail SMTP Configuration works! 🚀</h2>
                    <p>This is a test email confirming that Nodemailer is successfully configured with your Gmail App Password.</p>
                </div>
            `
        });
        console.log('✅ Test email sent successfully! Please check your inbox (and spam folder).');
    } catch (err) {
        console.error('❌ Failed to send test email:', err.message);
    }
};

runTest();
