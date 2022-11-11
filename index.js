import server from './src/index';

const PORT = process.env.PORT || 5000;

const app = server({});

const start = async () => {
    try {
        await app.listen({ port: PORT, host: '0.0.0.0' })
    } catch (err) {
        app.log.error(err);
        process.exit(1)
    }
}

start();