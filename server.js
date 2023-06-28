require('dotenv').config();
const Hapi = require('hapi');
const db = require('./src/models/db')
const Painting = require('./src/models/Painting')
const { ApolloServer } = require('apollo-server-hapi')
console.log(ApolloServer);

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


    await server.register({
        plugin: graphiqlHapi,
        options: {
            path: '/graphiql',
            graphiqlOptions: {
                endpointURL: 'graphql'
            },
            route: {
                cors: true
            }
        }
    })

    await server.register({
        plugin: graphqlHapi,
        options: {
            path: 'graphql',
            graphqlOptions: {
                schema
            },
            route: {
                cors: true
            }
        }
    })
    await server.start()
    console.log(`Server started at: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    if (err) throw err
    process.exit(1);
});

init();


