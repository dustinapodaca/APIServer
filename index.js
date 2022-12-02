'use strict';

const { sequelizeDatabase } = require('./src/models/index.js');
const { start } = require('./src/server.js');

sequelizeDatabase.sync()
  .then(() => {
    console.log('Successful connection to database');
    start();
  })
  .catch(e => console.error('Could not connect to database', e));
