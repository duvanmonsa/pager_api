'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('Organizations', ['id']);
    await queryInterface.addIndex('Organizations', ['code']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('Organizations', ['id']);
    await queryInterface.removeIndex('Organizations', ['code']);
  }
};
