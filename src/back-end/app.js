const express = require('express');
const path = require('path');

const app = express();

const STATIC_FOLDER = path.join(
  __dirname,
  '..',
  '..',
  'dist',
  'var-ingredient-angular'
);

app.use(express.static(STATIC_FOLDER));

app.get('*', (req, res) => {
  res.sendFile(path.join(STATIC_FOLDER, 'index.html'));
});

app.listen(1206, () => {
  console.log('Server is listening on port 1206...');
});
