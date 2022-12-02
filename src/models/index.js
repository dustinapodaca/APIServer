'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const clothesSchema = require('./clothes.schema.js');
const foodSchema = require('./food.schema.js');
const ModelInterface = require('./ModelInterface');

// 'postgres://localhost:5432/api-app'
// 'postgres://username:password@localhost:5432/rest-api-app'  <-- if you have a username and password
// use ternary operator to setup sqlite for testing
const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite:memory'
  : process.env.DATABASE_URL;

console.log(DATABASE_URL);

// Instantiate a new Sequelize instance - this is the connection to the database
// let sequelizeDatabase;
// if (process.env.NODE_ENV === 'test') {
//   sequelizeDatabase = new Sequelize({
//     dialect: 'sqlite',
//     database: ':memory',
//   });
// } else {
//   sequelizeDatabase = new Sequelize(process.env.DATABASE_URL, {
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   });
// }

// const sequelizeDatabase = new Sequelize(DATABASE_URL);

const sequelizeDatabase = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Create a new model for the clothes and food table with the schema defined in the schema files
const ClothesModel = clothesSchema(sequelizeDatabase, DataTypes);
const FoodModel = foodSchema(sequelizeDatabase, DataTypes);

module.exports = {
  sequelizeDatabase,
  clothesInterface: new ModelInterface(ClothesModel),
  foodInterface: new ModelInterface(FoodModel),
};
