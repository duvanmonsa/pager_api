'use strict';

const { RESOURCE_TYPES } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const Resource = sequelize.define(
    'Resource',
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      code: DataTypes.STRING,
      type: DataTypes.ENUM(RESOURCE_TYPES)
    },
    {}
  );
  return Resource;
};
