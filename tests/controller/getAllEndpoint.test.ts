const tap = require('tap')
const buildFastify = require('../../src/app')


tap.test('GET `/` route', (t: any) => {

    t.plan(4)

    const fastify = buildFastify()
    t.teardown(() => fastify.close())

    fastify.inject({
        method: 'GET',
        url: '/apps/all'
    }, (error: any, response: any) => {
        t.error(error)
        t.equal(response.statusCode, 200)
        t.equal(response.headers["content-type"], "application/json; charset=utf-8")
    })


})

