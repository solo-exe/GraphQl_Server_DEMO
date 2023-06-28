const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/acme?retryWrites=true&w=majority `
const local = 'mongodb://localhost:27017'
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the database ')
}).catch((err) => {
    console.log(`Error connecting to the database: `, err);
})

module.exports = mongoose
