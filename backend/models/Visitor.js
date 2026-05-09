const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
    email: { type: String, required: true },
    type: { type: String, enum: ['Normal', 'Recruiter'], default: 'Normal' },
    resumeViewed: { type: Boolean, default: false },
    device: { type: String },
    country: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Visitor', VisitorSchema);
