'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Resources',
      [
        {
          name: 'Resource one',
          description: 'This is the current desc for this resource',
          url: 'https://pager.com',
          code: 'resource_one',
          type: 'employer',
          createdAt: 'now()',
          updatedAt: 'now()'
        },
        {
          name: 'Resource Two',
          description: 'This is the current desc for this resource',
          url: 'https://pager.com',
          code: 'resource_two',
          type: 'insurance',
          createdAt: 'now()',
          updatedAt: 'now()'
        },
        {
          name: 'Resource Three',
          description: 'This is the current desc for this resource',
          url: 'https://pager.com',
          code: 'resource_three',
          type: 'health system',
          createdAt: 'now()',
          updatedAt: 'now()'
        },
        {
          name: 'Resource Four',
          description: 'This is the current desc for this resource',
          url: 'https://pager.com',
          type: 'insurance',
          createdAt: 'now()',
          updatedAt: 'now()'
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Resources', null, {});
  }
};
