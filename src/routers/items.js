
const itemsRouter = async (fastify, options, done) => {
    fastify.get('/items', (request, reply) => {
        reply.code(200).send([{ id: 1, name: 'test' }])
    })

    // id with param - get single item by id
    fastify.get('/items/:id', (request, reply) => {
        const { id } = request.params;
        reply.code(200).send(`you finding item with id ${id}`)
    })
    done();

}

export default itemsRouter