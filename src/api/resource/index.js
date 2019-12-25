const Joi = require('@hapi/joi');

const handlers = require('./handlers');

const resources = {
  name: 'resource',
  version: '0.1.0',
  register: (server, options) => {
    server.route(
      {
        method: 'GET',
        path: '/resource',
        config: {
          description: 'Get a list of resources',
          // validate: {
          //   params: {
          //     name: Joi.string().required()
          //   }
          // }
        },
        handler: handlers.getResources
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
