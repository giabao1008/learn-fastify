import fastify from "fastify";
import database from "../plugin/database.js";

const build = (otps = {}) => {
    const app = fastify(otps);

    // register plugin database
    app.register(database);

    app.get('/', async (req, res) => {
        res.code(200).send({
            hello: 'Hello world',
        });
    });

    return app;
};

export default build