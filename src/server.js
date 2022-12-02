'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const notFound = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const clothesRouter = require('./routes/clothes.js');
const foodRouter = require('./routes/food.js');
const PORT = process.env.PORT || 3004;

const app = express();
app.use(cors());
app.use(express.json());
app.use(clothesRouter);
app.use(foodRouter);

app.get('/', logger, (req, res, next) => {
  res.status(200).send('Connected to API');
});

app.use('*', notFound);
app.use(errorHandler);

const start = () => {
  app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
};

module.exports = {
  app,
  start,
};
