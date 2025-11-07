import fastify from 'fastify';
const server = fastify();
server.get('/ping', async (request, reply) => {
    return 'pong\n';
});
const port = parseInt(process.env.APP_PORT || '5000', 10);
server.listen({ port, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
//# sourceMappingURL=index.js.map