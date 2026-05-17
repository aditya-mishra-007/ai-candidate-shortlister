const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// 3. Shortlist Candidates via Basic Logic (POST /api/match) [cite: 47-48]
router.post('/match', async (req, res) => {
    try {
        const { requiredSkills, minExperience } = req.body;
        const candidates = await Candidate.find();

        // Core matching logic matching requirements exactly [cite: 81-93]
        const matchedResults = candidates.map(candidate => {
            const matchedSkills = candidate.skills.filter(skill =>
                requiredSkills.includes(skill)
            );
            
            // Formula specified in PDF: matched length / required length [cite: 88]
            const score = requiredSkills.length > 0 ? (matchedSkills.length / requiredSkills.length) : 0;
            
            return {
                ...candidate._doc,
                matchScore: score,
                skillsMatched: matchedSkills
            };
        })
        // Enforce basic minimum experience criteria threshold [cite: 21, 53]
        .filter(candidate => candidate.experience >= minExperience)
        // Sort descending by highest score [cite: 22-25, 93]
        .sort((a, b) => b.matchScore - a.matchScore);

        res.status(200).json(matchedResults);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. AI-Based Shortlisting using OpenRouter (POST /api/ai/shortlist)
router.post('/ai/shortlist', async (req, res) => {
    try {
        const { requiredSkills, minExperience } = req.body;
        const candidates = await Candidate.find();

        // Parse database contents into textual prompt format
        const candidateContext = candidates.map((c, i) => 
            `${i + 1}. Name: ${c.name} | Skills: [${c.skills.join(', ')}] | Experience: ${c.experience} years`
        ).join('\n');

        const fetchModule = globalThis.fetch || require('node-fetch');

        // Clean matrix: Fast specific model first, followed by the zero-404 universal fallback router
        const freeModels = [
            "meta-llama/llama-3.2-3b-instruct:free",
            "openrouter/free"
        ];

        let aiData = null;
        let successfulModel = "";

        for (const model of freeModels) {
            try {
                console.log(`🤖 Requesting evaluation using: ${model}...`);
                const response = await fetchModule("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                        "Content-Type": "application/json",
                        "HTTP-Referer": "http://localhost:5000",
                        "X-Title": "FSD Candidate Filter"
                    },
                    body: JSON.stringify({
                        model: model, 
                        messages: [
                            {
                                role: "user",
                                content: `Job requires skills: ${requiredSkills.join(', ')} with minimum ${minExperience} years of experience.\n\nAvailable Candidate Database Profiles:\n${candidateContext}\n\nRank these candidates and provide detailed qualitative explanations for suitability.`
                            }
                        ]
                    })
                });

                const data = await response.json();

                if (data.choices && data.choices[0]) {
                    aiData = data;
                    successfulModel = model;
                    break; // Success! Break loop execution instantly
                } else {
                    console.warn(`⚠️ Model ${model} was busy or limited. Rolling over to fallback router...`);
                }
            } catch (err) {
                console.error(`❌ Network problem with model ${model}:`, err.message);
            }
        }

        console.log("============= OPENROUTER RAW RESPONSE =============");
        console.log(`Verified Dispatcher Source: ${successfulModel || "None (All Failed)"}`);
        console.log("==================================================");
        
        if (aiData && aiData.choices && aiData.choices[0]) {
            const aiTextResponse = aiData.choices[0].message?.content || aiData.choices[0].text || "Processing completed.";
            res.status(200).json(aiTextResponse);
        } else {
            res.status(502).json({ 
                error: "All upstream free tier AI endpoints are temporarily congested. Please wait a moment and try again.",
                details: "Rate limit threshold breached across models fallback matrix."
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;