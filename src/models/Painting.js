const db = require('./db')

const Schema = db.Schema

const Painting = new Schema({
    name: String,
    url: String,
    techniques: [String]
})

module.exports = db.model('Painting', Painting)