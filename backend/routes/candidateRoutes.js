const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// 1. Add Candidate (POST /api/candidates) [cite: 35-36]
router.post('/', async (req, res) => {
    try {
        const { name, email, skills, experience } = req.body;
        
        const newCandidate = new Candidate({
            name,
            email,
            skills,
            experience
        });

        await newCandidate.save();
        res.status(201).json({ message: 'Candidate added successfully!', candidate: newCandidate });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 2. Get All Candidates (GET /api/candidates) [cite: 44-45]
router.get('/', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Delete Candidate Profile (DELETE /api/candidates/:id)
router.delete('/:id', async (req, res) => {
    try {
        await Candidate.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Candidate profile removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;