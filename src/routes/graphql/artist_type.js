const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull, GraphQL
} = require('graphql');
const PaintingType = require('./painting_type')

// const artist 
exports.ArtistType = new GraphQLObjectType({
    name: 'Painting',
    description: 'This represents a painting.',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        techniques: { type: GraphQLString },
        paintings: {
            type: new GraphQLList(PaintingType),
            resolve: (artist) => {
                // get artist
            }
        }
    })
})