// backend/models/Word.js
const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  word: String,
  hint: String,
});

module.exports = mongoose.model('Word', WordSchema);
