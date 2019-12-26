const Joi = require('@hapi/joi');
const { ORGANIZATION_TYPES } = require('../../constants');

const handlers = require('./handlers');

const organizationRoutes = {
  name: 'organization',
  version: '0.1.0',
  register: (server, options) => {
    /**
     * GET /organization
     */
    server.route(
      {
        method: 'GET',
        path: '/organization',
        config: {
          description: 'Get a list of organizations',
          notes: 'Returns an array of organizations',
          tags: ['api'],
          validate: {
            query: Joi.object({
              name: Joi.string().description('filter by name'),
              code: Joi.string().description('filter by code')
            })
          }
        },
        handler: handlers.getOrganizations
      }
    );
    /**
     * POST /organization
     */
    server.route(
      {
        method: 'POST',
        path: '/organization',
        config: {
          description: 'Create a new organization',
          notes: 'Returns organization object',
          tags: ['api'],
          validate: {
            payload: Joi.object({
              name: Joi.string().required(),
              description: Joi.string().required(),
              url: Joi.string().uri().required(),
              type: Joi.string().valid(...ORGANIZATION_TYPES).required(),
            }).label('Organization')
          }
        },
        handler: handlers.createOrganization
      }
    );

    /**
     * PUT /organization/{id}
     */
    server.route(
      {
        method: 'PUT',
        path: '/organization/{id}',
        config: {
          description: 'Update organization by id',
          notes: 'Returns organization object',
          tags: ['api'],
          validate: {
            params: Joi.object({
              id: Joi.string().required()
            }),
            payload: Joi.object({
              name: Joi.string(),
              description: Joi.string(),
              url: Joi.string().uri(),
              type: Joi.string().valid(...ORGANIZATION_TYPES),
            })
          }
        },
        handler: handlers.updateOrganization
      }
    );

    /**
     * DELETE /organization/{id}
     */
    server.route(
      {
        method: 'DELETE',
        path: '/organization/{id}',
        config: {
          description: 'Delete organization by id',
          notes: 'Returns delete status',
          tags: ['api'],
          validate: {
            params: Joi.object({
              id: Joi.string().required()
            })
          }
        },
        handler: handlers.deleteOrganization
      }
    );
  }
}

module.exports = organizationRoutes
