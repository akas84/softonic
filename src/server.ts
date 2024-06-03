'use strict'

const server = require('./app')({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty'
    }
  }
})

server.listen({ port: 3000 }, (err: any, address: any) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})