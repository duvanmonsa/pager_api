'use strict';

const { ORGANIZATION_TYPES } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define(
    'Organization',
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      code: DataTypes.STRING,
      type: DataTypes.ENUM(ORGANIZATION_TYPES)
    },
    {}
  );
  return Organization;
};
