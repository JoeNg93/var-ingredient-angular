const path = require('path');

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const expressWinston = require('express-winston');
const compression = require('compression');

const apiRouter = require('./routers/api');
const logger = require('./utils/logger');

const app = express();

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/test-var-ingredients',
  { useNewUrlParser: true },
  err => {
    if (err) {
      logger.log('error', `Failed to connect to database: ${err.message}.`);
      return;
    }
    logger.log('info', 'Connected to database.');
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

app.use(compression());
app.use(express.static(STATIC_FOLDER));

app.use(
  '/api',
  expressWinston.logger({
    winstonInstance: logger,
    meta: false,
    expressFormat: true,
  })
);
app.use('/api', bodyParser.json());
app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(STATIC_FOLDER, 'index.html'));
});

app.listen(process.env.PORT || 1206, () => {
  logger.log('info', 'Server is listening on port 1206.');
});
