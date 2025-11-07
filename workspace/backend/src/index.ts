import fastify from 'fastify'
import { greetFromShared } from '@workspace/shared/test'

const server = fastify()

server.get('/healthcheck', async (request, reply) => {
    return greetFromShared("Hello from Fastify!")
})

const port = parseInt(process.env.APP_PORT || '5000', 10)

server.listen({ port, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})