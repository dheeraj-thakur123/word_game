// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/guessaword', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB Schemas and Models
const Word = require('./models/Word');
const Score = require('./models/Score');

// API endpoint to get words and hints
app.get('/api/words', async (req, res) => {
  try {
    const { rounds } = req.query;
    if (!rounds || isNaN(rounds) || rounds <= 0) {
      return res.status(400).json({ error: 'Invalid rounds parameter' });
    }
    const words = await Word.aggregate([{ $sample: { size: Number(rounds) } }]);
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// API endpoint to save user score
app.post('/api/score', async (req, res) => {
  try {
    const { name, score } = req.body;
    if (!name || typeof score !== 'number') {
      return res.status(400).json({ error: 'Invalid name or score' });
    }
    const newScore = new Score({ name, score });
    await newScore.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// API endpoint to get top scores
app.get('/api/scores', async (req, res) => {
  try {
    const topScores = await Score.find().sort({ score: -1, createdAt: 1 }).limit(3);
    res.json(topScores);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(5000, () => {
  
  console.log('Server is running on port 5000');
});
