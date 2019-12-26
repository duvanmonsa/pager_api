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
     * POST /resource
     */
    server.route(
      {
        method: 'POST',
        path: '/resource',
        config: {
          description: 'Create a new resource',
          notes: 'Returns the new resource',
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

    // server.route({
    //   method: ['GET', 'PUT', 'POST'],
    //   path: '/api/movie/{title?}',
    //   config: {
    //     validate: {
    //       params: {
    //         title: Joi.string().required()
    //       }
    //     }
    //   },
    //   handler: async (request, h) => {
    //     let findMovie
    //     try {
    //       findMovie = await movieCall(process.env.API_KEY, request.params.title)
    //     } catch (err) {
    //       console.error(err)
    //     }
    //     return h.response(findMovie).type('application/json')
    //   }
    // })
  }
}

module.exports = resources
