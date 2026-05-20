const sendEmail = async ({ to, subject, html }) => {
    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.EMAIL_USER || 'mallinadhanu@gmail.com';

    if (!apiKey) {
        console.warn('⚠️ BREVO_API_KEY is not defined. Email will not be sent.');
        return;
    }

    try {
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
        console.log(`✅ Email sent successfully to ${to}. MessageId:`, data.messageId);
        return data;
    } catch (error) {
        console.error('❌ Brevo Email Error:', error.message);
        throw error;
    }
};

module.exports = { sendEmail };
