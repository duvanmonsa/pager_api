'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('Resources', ['id']);
    await queryInterface.addIndex('Resources', ['code']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('Resources', ['id']);
    await queryInterface.removeIndex('Resources', ['code']);
  }
};
