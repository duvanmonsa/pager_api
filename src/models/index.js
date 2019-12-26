'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require(__dirname + '/../../config/config.js');
let db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
  .filter(file => {
    /* $lab:coverage:off$ */
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
    /* $lab:coverage:on$ */
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  /* $lab:coverage:off$ */
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
  /* $lab:coverage:on$ */
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
