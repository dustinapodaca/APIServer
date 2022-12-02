'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('food', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['FRUIT', 'VEGETABLE', 'PROTEIN', 'CARB', 'DAIRY', 'OTHER'],
      allowNull: false,
    },
  });
};

