'use strict'

const server = require('./app')({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty'
    }
  },
  pluginTimeout: 2000000,
})

console.log("AAAAAAAAAAAAAAA");

server.register(require('./repository/dbplugin'))
//server.register(require('./routes'))


server.listen({ port: 3000 }, (err: any, address: any) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})