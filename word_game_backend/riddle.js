// backend/seeder.js
const mongoose = require('mongoose');
const Word = require('./models/Word');

mongoose.connect('mongodb://localhost:27017/guessaword', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const words = [
  { word: 'egg', hint: 'median between vegetarians and non-vegetarians?' },
  { word: 'tree', hint: 'Produces oxygen, has leaves?' },
  { word: 'river', hint: 'Flows continuously, often leads to the sea?' },
  { word: 'book', hint: 'Contains pages, provides knowledge?' },
  { word: 'computer', hint: 'Used for computing and processing tasks?' },
  { word: 'cards', hint: 'What has 13 hearts but no other organs?' },
  { word: 'bank', hint: 'I have branches but no fruit, trunk, or leaves. What am I?' },
  { word: 'Incorrectly', hint: 'Which word in the dictionary is spelled incorrectly?' },
  { word: 'orange', hint: ' What color can you eat?' },
  { word: 'stars', hint: 'They come at night without being called and are lost in the day without being stolen. What are they?' },
  // Add more words and hints as needed
];

Word.insertMany(words).then(() => {
  console.log('Words seeded');
  mongoose.connection.close();
});




