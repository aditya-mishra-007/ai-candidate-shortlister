const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import Defined API Routers
const candidateRoutes = require('./routes/candidateRoutes');
const matchRoutes = require('./routes/matchRoutes');

// Load configurations
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Bind Global Router Entry Routes [cite: 33]
app.use('/api/candidates', candidateRoutes); // Maps /api/candidates [cite: 36, 45]
app.use('/api', matchRoutes);               // Maps /api/match and /api/ai/shortlist [cite: 48, 55]

// Root health-check endpoint
app.get('/', (req, res) => {
    res.send('🚀 Full-Stack Assessment Server Running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🔥 Server listening on port ${PORT}`);
});