const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull, GraphQL
} = require('graphql');
const ArtistType = require('./artist_type')

// const painting = 3 // get artist here

exports.PaintingType = new GraphQLObjectType({
    name: 'Painting',
    description: 'This represents a painting.',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) },
        techniques: { type: GraphQLString },
        artist: {
            type: ArtistType,
            resolve: (artist) => {
                // get artist paintings
            }
        }
    })
})