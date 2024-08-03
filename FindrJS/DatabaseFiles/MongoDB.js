// app.js
const mongoose = require('mongoose');
const Planet = require('./models/planet');

const mongoURI = 'mongodb://localhost:27017/planetdb'; // Change this to your MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
