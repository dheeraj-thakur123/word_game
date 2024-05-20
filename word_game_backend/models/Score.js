// backend/models/Score.js
const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  name: String,
  score: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Score', ScoreSchema);
