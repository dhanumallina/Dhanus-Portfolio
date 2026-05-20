const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

const defaultProjects = [
    {
        title: "Business Sales Analytics Dashboard",
        description: "Interactive dashboard providing actionable insights into sales data, helping optimize business strategies and revenue generation.",
        techStack: ["Power BI", "Excel"],
        status: "Real",
        image: "/images/sales_dashboard.png",
        githubLink: "https://github.com/dhanumallina",
        liveDemo: ""
    },
    {
        title: "Placement Prediction Model",
        description: "Machine learning model predicting student placement probabilities based on academic performance and skills.",
        techStack: ["Python", "NumPy", "Pandas"],
        status: "Real",
        image: "/images/prediction_model.png",
        githubLink: "https://github.com/dhanumallina",
        liveDemo: ""
    },
    {
        title: "Currency Converter",
        description: "Real-time currency converter utilizing live exchange rate APIs for accurate financial conversions.",
        techStack: ["Python", "API"],
        status: "Real",
        image: "/images/currency_converter.png",
        githubLink: "https://github.com/dhanumallina",
        liveDemo: ""
    },
    {
        title: "Real-Time Chat App",
        description: "Full-stack instant messaging application with real-time updates and secure user authentication.",
        techStack: ["React", "Node.js", "MongoDB", "Socket.io"],
        status: "Coming Soon",
        image: "/images/in_progress.png",
        githubLink: "",
        liveDemo: ""
    },
    {
        title: "Student Placement Portal",
        description: "Comprehensive portal for managing student profiles, job postings, and application tracking.",
        techStack: ["React", "Node.js", "MongoDB"],
        status: "Coming Soon",
        image: "/images/in_progress.png",
        githubLink: "",
        liveDemo: ""
    },
    {
        title: "AI Interview Prep App",
        description: "AI-powered application helping candidates practice interviews with real-time feedback.",
        techStack: ["React", "Node.js", "MongoDB", "AI API"],
        status: "Coming Soon",
        image: "/images/in_progress.png",
        githubLink: "",
        liveDemo: ""
    },
    {
        title: "Music Streaming Platform",
        description: "Web-based music streaming service with custom playlists and audio playback features.",
        techStack: ["React", "Node.js", "MongoDB"],
        status: "Coming Soon",
        image: "/images/in_progress.png",
        githubLink: "",
        liveDemo: ""
    }
];

// GET /api/projects
// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        console.error('GET PROJECTS ERROR:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/projects
// Create a new project (Admin protected)
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, techStack, image, githubLink, liveDemo, status } = req.body;
        const newProject = new Project({
            title,
            description,
            techStack: Array.isArray(techStack) ? techStack : techStack.split(',').map(s => s.trim()).filter(Boolean),
            image,
            githubLink,
            liveDemo,
            status
        });
        await newProject.save();
        res.status(201).json({ success: true, project: newProject });
    } catch (err) {
        console.error('CREATE PROJECT ERROR:', err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// PUT /api/projects/:id
// Update an existing project (Admin protected)
router.put('/:id', auth, async (req, res) => {
    try {
        const { title, description, techStack, image, githubLink, liveDemo, status } = req.body;
        
        const updateData = {
            title,
            description,
            techStack: Array.isArray(techStack) ? techStack : techStack.split(',').map(s => s.trim()).filter(Boolean),
            image,
            githubLink,
            liveDemo,
            status
        };

        const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, project });
    } catch (err) {
        console.error('UPDATE PROJECT ERROR:', err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// DELETE /api/projects/:id
// Delete a project (Admin protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, message: 'Project deleted successfully' });
    } catch (err) {
        console.error('DELETE PROJECT ERROR:', err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// POST /api/projects/seed
// Seed/restore default projects (Admin protected)
router.post('/seed', auth, async (req, res) => {
    try {
        // Clear existing projects first
        await Project.deleteMany({});
        // Insert defaults
        const seeded = await Project.insertMany(defaultProjects);
        res.json({ success: true, count: seeded.length });
    } catch (err) {
        console.error('SEED PROJECTS ERROR:', err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

router.defaultProjects = defaultProjects;
module.exports = router;


