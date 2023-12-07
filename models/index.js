/*

*/

require('dotenv').config()
const mongoose = require('mongoose')

//connect mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//exporting the data from our neighbor file /books
module.exports.Books = require('./books')

