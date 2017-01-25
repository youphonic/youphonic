const path = require('path');
const express = require('express');

const app = express();
module.exports = app;

const staticMiddleware = require('./static.middleware');

app.set('port', (process.env.PORT || 1337));

app.use(staticMiddleware);

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', '..', 'src', 'index.html'));
});
