const Hapi = require('hapi');
require('dotenv').config();
const db = require('./src2/models/db')
const Painting = require('./src2/models/Painting')

const init = async () => {
    // Init Server and Connnection
    const server = new Hapi.Server({
        port: 3000,
        host: 'localhost'
    });

    // Home Route
    server.route({
        method: 'GET',
        path: '/',
        handler: (req, res) => {
            console.log(req);
            return ('HELLO WORLD')
        }
    });

    server.route({
        method: 'GET',
        path: '/api/v1/paintings',
        handler: (req, res) => {
            return Painting.find()
        }
    });

    server.route({
        method: 'POST',
        path: '/api/v1/paintings',
        handler: (req, res) => {
            const { name, url, techniques } = req.payload
            const painting = new Painting({
                name, url, techniques
            })
            painting.save()
            return Painting.find()
        }
    });

    await server.start()
    console.log(`Server started at: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    if (err) throw err
    process.exit(1);
});

init();


