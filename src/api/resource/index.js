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
          validate: {
            query: {
              name: Joi.string().description('filter by name'),
              code: Joi.string().description('filter by code')
            }
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
          validate: {
            params: {
              id: Joi.string().required()
            }
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
          validate: {
            payload: {
              name: Joi.string().required(),
              description: Joi.string().required(),
              url: Joi.string().uri().required(),
              type: Joi.string().valid(RESOURCE_TYPES).required(),
            }
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
          validate: {
            params: {
              id: Joi.string().required()
            },
            payload: {
              name: Joi.string().required(),
              description: Joi.string().required(),
              url: Joi.string().uri().required(),
              type: Joi.string().valid(RESOURCE_TYPES).required(),
            }
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
          validate: {
            params: {
              id: Joi.string().required()
            }
          }
        },
        handler: handlers.deleteResource
      }
    );
  }
}

module.exports = resources
