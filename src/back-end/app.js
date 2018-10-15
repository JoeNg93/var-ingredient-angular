const path = require('path');

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const apiRouter = require('./routers/api');

const app = express();

mongoose.connect(
  'mongodb://localhost:27017/test-var-ingredients',
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log(`Failed to connect to database: ${err.message}.`);
      return;
    }
    console.log('Connected to database.');
  }
);

app.use(cors());

const STATIC_FOLDER = path.join(
  __dirname,
  '..',
  '..',
  'dist',
  'var-ingredient-angular'
);

app.use(express.static(STATIC_FOLDER));

app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(STATIC_FOLDER, 'index.html'));
});

app.listen(1206, () => {
  console.log('Server is listening on port 1206...');
});
