const { GraphQLSchema } = require('graphql')
// const RootQuery = require
// const RootMutation = require

exports.schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})