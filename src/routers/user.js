
const userRouters = async (fastify, options, done) => {
    fastify.get('/user', function (req, reply) {
        fastify.pg.query(
            'SELECT * FROM users ',
            function onResult(err, result) {
                reply.send(err || result)
            }
        )
    })

    fastify.get('/user/:id', function (req, reply) {
        fastify.pg.query(
            'SELECT * FROM users WHERE id=$1', [req.params.id],
            function onResult(err, result) {
                reply.send(err || result)
            }
        )
    })

    fastify.post('/user/:username', (req, reply) => {
        // will return a promise, fastify will send the result automatically
        return fastify.pg.transact(async client => {
            // will resolve to an id, or reject with an error
            const id = await client.query('INSERT INTO users(username) VALUES($1) RETURNING id', [req.params.username])

            // potentially do something with id

            return id
        })
    })
}

export default userRouters