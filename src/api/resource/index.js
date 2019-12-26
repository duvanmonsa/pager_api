const Joi = require('@hapi/joi');
const { RESOURCE_TYPES } = require('../../constants');

const handlers = require('./handlers');

const resources = {
  name: 'resource',
  version: '0.1.0',
  register: (server, options) => {
    /**
     * GET /resource
     */
    server.route(
      {
        method: 'GET',
        path: '/resource',
        config: {
          description: 'Get a list of resources',
          notes: 'Returns an array of resources',
          tags: ['api'],
          validate: {
            query: Joi.object({
              name: Joi.string().description('filter by name'),
              code: Joi.string().description('filter by code')
            })
          }
        },
        handler: handlers.getResources
      }
    );

    /**
     * GET /resource/{id}
     */
    server.route(
      {
        method: 'GET',
        path: '/resource/{id}',
        config: {
          description: 'Get resource by id',
          notes: 'Returns resource object',
          tags: ['api'],
          validate: {
            params: Joi.object({
              id: Joi.string().required()
            })
          }
        },
        handler: handlers.getResource
      }
    );

    /**
     * POST /resource
     */
    server.route(
      {
        method: 'POST',
        path: '/resource',
        config: {
          description: 'Create a new resource',
          notes: 'Returns resource object',
          tags: ['api'],
          validate: {
            payload: Joi.object({
              name: Joi.string().required(),
              description: Joi.string().required(),
              url: Joi.string().uri().required(),
              type: Joi.string().valid(RESOURCE_TYPES[0], RESOURCE_TYPES[1], RESOURCE_TYPES[2]).required(),
            })
          }
        },
        handler: handlers.createResource
      }
    );

    /**
     * PUT /resource/{id}
     */
    server.route(
      {
        method: 'PUT',
        path: '/resource/{id}',
        config: {
          description: 'Update resource by id',
          notes: 'Returns resource object',
          tags: ['api'],
          validate: {
            params: Joi.object({
              id: Joi.string().required()
            }),
            payload: Joi.object({
              name: Joi.string().required(),
              description: Joi.string().required(),
              url: Joi.string().uri().required(),
              type: Joi.string().valid(RESOURCE_TYPES[0], RESOURCE_TYPES[1], RESOURCE_TYPES[2]).required(),
            })
          }
        },
        handler: handlers.updateResource
      }
    );

    /**
     * DELETE /resource/{id}
     */
    server.route(
      {
        method: 'DELETE',
        path: '/resource/{id}',
        config: {
          description: 'Delete resource by id',
          notes: 'Returns delete status',
          tags: ['api'],
          validate: {
            params: Joi.object({
              id: Joi.string().required()
            })
          }
        },
        handler: handlers.deleteResource
      }
    );
  }
}

module.exports = resources
