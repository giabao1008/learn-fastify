import fastify from 'fastify';
import itemsRouter from './routers/items'
import animalsRouter from './routers/animals'
import dbConnector from './common/database-connector'
import userRouters from './routers/user'
import fastifySwagger from '@fastify/swagger';
import fastifyUI from '@fastify/swagger-ui';


const build = ({ options }) => {
    const app = fastify({ logger: true, ...options });

    app.register(dbConnector)
    // register others routers
    app.register(itemsRouter);
    app.register(userRouters);

    // app.register(animalsRouter);
    app.register(fastifySwagger, {
        swagger: {
            info: {
                title: 'Test swagger',
                description: 'Testing the Fastify swagger API',
                version: '0.1.0'
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            },
            host: 'localhost',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                { name: 'user', description: 'User related end-points' },
                { name: 'code', description: 'Code related end-points' }
            ],
            definitions: {
                User: {
                    type: 'object',
                    required: ['id', 'email'],
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        email: { type: 'string', format: 'email' }
                    }
                }
            },
            securityDefinitions: {
                apiKey: {
                    type: 'apiKey',
                    name: 'apiKey',
                    in: 'header'
                }
            }
        }
    })

    app.register(fastifyUI, {
        routePrefix: '/docs',
        initOAuth: {},
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
        uiHooks: {
            onRequest: function (request, reply, next) { next() },
            preHandler: function (request, reply, next) { next() }
        },
        staticCSP: true,
        transformStaticCSP: (header) => header
    });

    app.get('/', async (req, res) => {
        res.code(200).send({
            hello: 'Hello world',
        });
    });


    return app;
};

export default build;
