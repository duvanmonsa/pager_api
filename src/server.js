'use strict'

const Hapi = require('@hapi/hapi')
const Boom = require('@hapi/boom')
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const Pack = require('../package')
const organizations = require('./api/organization');

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
    organizations
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

exports.init = async () => {

  await addAPIs()
  await addSwagger()
  await server.initialize();
  return server;
};

exports.start = async () => {
  await addAPIs()
  await addSwagger()
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

