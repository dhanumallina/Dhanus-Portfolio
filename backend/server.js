require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Root Route
app.get('/', (req, res) => {
  res.send('Backend is running successfully 🚀');
});

// Ping Route (to keep Render awake)
app.get('/api/ping', (req, res) => {
  res.status(200).send('pong');
});

// API Routes
app.use('/api/contact', require('./routes/contact'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/visitors', require('./routes/visitors'));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});