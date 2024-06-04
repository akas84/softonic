'use strict'

import { Config } from "./config"
import { ApplicationInMemoryRepo } from "./repository/ApplicationInMemoryRepo"
import { ApplicationInMemorySingletonRepo } from "./repository/ApplicationInMemorySingletonRepo"
import { DEFAULT_PRODUCT_JSON } from "../src/constants"

const fastify = require('fastify')

//Load the repo for the first time and keep it in memory
//const repo = ApplicationInMemorySingletonRepo.instance(new ApplicationInMemoryRepo(DEFAULT_PRODUCT_JSON))

function build(opts={}) {
  const app = fastify(opts)
  app.get('/', async function (request: any, reply: any) {
    return { hello: 'world' }
  })

  return app
}


module.exports = build