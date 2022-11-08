import fastifyPlugin from 'fastify-plugin';
import pgPromise from 'pg-promise';
import applyMigration from './helper/migration'


const database = async (fastify, options, next) => {
    const dbConnection = pgPromise(process.env.POSTGRE_URI);

    fastify.decorate('db', dbConnection)

    fastify.log.info('Migration ready to run');

    const migrationCount = await applyMigration();

    fastify.log.info(`Migration applied count:  ${migrationCount}}`);
    next();
}

// export default db;
// module.exports = fastifyPlugin(database)
export default fastifyPlugin(database)