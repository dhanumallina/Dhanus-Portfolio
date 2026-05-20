const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    image: { type: String },
    githubLink: { type: String },
    liveDemo: { type: String },
    status: { type: String, enum: ['Real', 'Coming Soon'], default: 'Real' }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);

