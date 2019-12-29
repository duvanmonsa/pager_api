'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Organizations',
      [
        {
          name: 'Organization one',
          description: 'This is the current desc for this Organization',
          url: 'https://pager.com',
          code: 'organization_one',
          type: 'employer',
          createdAt: 'now()',
          updatedAt: 'now()'
        },
        {
          name: 'Organization Two',
          description: 'This is the current desc for this organization',
          url: 'https://pager.com',
          code: 'organization_two',
          type: 'insurance',
          createdAt: 'now()',
          updatedAt: 'now()'
        },
        {
          name: 'Organization Three',
          description: 'This is the current desc for this organization',
          url: 'https://pager.com',
          code: 'organization_three',
          type: 'health system',
          createdAt: 'now()',
          updatedAt: 'now()'
        },
        {
          name: 'Organization Four',
          description: 'This is the current desc for this organization',
          url: 'https://pager.com',
          type: 'insurance',
          createdAt: 'now()',
          updatedAt: 'now()'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Organizations', null, {});
  }
};
