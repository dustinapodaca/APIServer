'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('clothes', {
    name: {
      type: DataTypes.ENUM,
      values: ['shirt', 'pants', 'socks', 'shoes'],
      allowNull: false,
    },
    color: {
      type: DataTypes.ENUM,
      values: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
      allowNull: true,
    },
    size: {
      type: DataTypes.ENUM,
      values: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
      allowNull: false,
    },
  });
};
