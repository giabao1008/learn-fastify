import fastifyPlugin from 'fastify-plugin';
import fastifyMongo from '@fastify/mongodb';
import fg from '@fastify/postgres'
/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test_database';
const POSGRES_URI = process.env.POSGRES_URI || 'postgres://postgres:w24eVar%40312@172.104.45.161/w2';


async function dbConnector(fastify, options) {
    // fastify.register(fastifyMongo, {
    //     url: MONGO_URI
    // })
    fastify.register(fg, {
        connectionString: POSGRES_URI
    })
}

export default fastifyPlugin(dbConnector);

