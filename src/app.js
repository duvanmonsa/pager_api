'use strict'

const Hapi = require('@hapi/hapi')
const Boom = require('@hapi/boom')
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const Pack = require('../package')
const resources = require('./api/resource');

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config({
    path: require('path').join(__dirname, '..', `${process.env.NODE_ENV}.env`)
  });
}

const port = process.env.PORT || '3000';

const server = Hapi.server({
  port,
  host: '0.0.0.0',
  routes: {
    validate: {
      failAction: async (request, h, err) => {
        if (process.env.NODE_ENV === 'production') {
          // In prod, log a limited error message and throw the default Bad Request error.
          console.error('ValidationError:', err.message);
          throw Boom.badRequest(`Invalid request payload input`);
        } else {
          // During development, log and respond with the full error.
          console.error(err);
          throw err;
        }
      }
    }
  }
})

const addAPIs = async () => {
  await server.register([
    resources
  ])
}

// add swagger
const addSwagger = async () => {

  const swaggerOptions = {
    info: {
      title: 'Pager API Documentation',
      version: Pack.version,
    },
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);
}
const init = async () => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Pager api is up and running.'
    }
  })
  server.route({
    method: '*',
    path: '/{any*}',
    handler: (request, h) => {
      return Boom.notFound('That path doesn\'t exist!')
    }
  })
  await addAPIs()
  await addSwagger()
  await server.start()
  console.log('Server up on %s', server.info.uri)
}

/*
** The following complements DEP0018 by forcing uncaught promise rejections to crash the app.
** This can also be done viw mcollina's 'make-promises-safe' module.
*/
process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})
/*
** Setup is complete. Execute the server init() command.
*/
init()
