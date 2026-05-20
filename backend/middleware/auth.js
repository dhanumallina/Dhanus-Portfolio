const auth = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

        if (!authHeader) {
            return res.status(401).json({ success: false, message: 'No authorization token, access denied' });
        }

        // Expected format: Bearer <password>
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ success: false, message: 'Authorization format is Bearer <password>' });
        }

        const token = parts[1];
        if (token !== adminPassword) {
            return res.status(401).json({ success: false, message: 'Invalid password, authorization failed' });
        }

        next();
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server authentication error' });
    }
};

module.exports = auth;
