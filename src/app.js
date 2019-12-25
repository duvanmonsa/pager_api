'use strict'

const Hapi = require('hapi')
const Boom = require('@hapi/boom')

const resources = require('./api/resource');

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config({
    path: require('path').join(__dirname, '..', `${process.env.NODE_ENV}.env`)
  });
}

const port = process.env.PORT || '3000';

const server = Hapi.server({
  port,
  host: 'localhost'
})

const addAPIs = async () => {
  await server.register([
    resources
  ])
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
