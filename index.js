const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
} = require('graphql');

const app = express()

const authors = [
    { id: 1, name: 'J. K. Rowling' },
    { id: 2, name: 'J. R. R. Tolkien' },
    { id: 3, name: 'Brent Weeks' }
]

const books = [
    { id: 1, name: "Harry Potter and the Chamber of Secrets", authorId: 1 },
    { id: 2, name: "Harry Potter and the Prisoner of Azkaban", authorId: 1 },
    { id: 3, name: "Harry Potter and the Goblet of Fire", authorId: 1 },
    { id: 4, name: "Fellowship of the Ring", authorId: 2 },
    { id: 5, name: "The Two Towers", authorId: 2 },
    { id: 6, name: "The Return of the King", authorId: 2 },
    { id: 7, name: "The Way of the Shadows", authorId: 3 },
    { id: 8, name: "Beyond the Shadows", authorId: 3 }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: "This respresents a book written by an author",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        // authorId: { type: new GraphQLNonNull(GraphQLInt) },
        author: {
            type: AuthorType,
            resolve: (book) => {
                return authors.find(author => author.id === book.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: "This represents an author of a book",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        books: {
            type: new GraphQLList(BookType),
            description: "List of Authors Books",
            resolve: (author) => {
                console.log(author)
                return books.filter(book => book.authorId === author.id)
            }
        }
    }),
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: "Root Query",
    fields: () => ({
        book: {
            type: (BookType),
            description: 'A Single Book',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => books.find(book => book.id === args.id)
        },
        books: {
            type: new GraphQLList(BookType),
            description: 'List of All Books',
            resolve: () => books
        },
        author: {
            type: (AuthorType),
            description: 'A Single Book',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => authors.find(author => author.id === args.id)
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: 'List of All Authors',
            resolve: () => authors
        }
    })
})

const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        addBook: {
            type: BookType,
            description: "Adding a Book",
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const book = { id: books.length + 1, name: args.name, authorid: args.authorId }
                const author = authors.find(author => (author.id === args.authorId))
                if (!author) throw ('Author not found')
                books.push(book)
                return book
            }
        },
        addAuthor: {
            type: AuthorType,
            description: "Adding an Author",
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const author = { id: books.length + 1, name: args.name, authorid: args.authorId }
                const exists = authors.find(author => (author.name === args.name))
                if (exists) throw ("Author already exists")
                authors.push(author)
                return author
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}))

app.listen(5000, () => console.log("Listening...")) 