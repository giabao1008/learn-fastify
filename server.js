import server from './src/index.js'

const PORT = process.env.PORT || 5000;
// log

const app = server({
    logger: true,
});

// ================ Bootstrap
const start = async () => {
    try {
        await app.listen({ port: PORT })
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}
start()
