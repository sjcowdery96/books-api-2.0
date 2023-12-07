/*
Added Author to the Schema
*/

const mongoose = require('mongoose')
require('dotenv').config()

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, default: 'The reality- bending adventures of a clandestine service agency in the year 2166' },
    author: { type: String, required: true },
    year: { type: Number, default: 2023 },
    quantity: { type: Number, default: 10 },
    imageURL: { type: String, default: 'https://media.istockphoto.com/id/157482029/photo/stack-of-books.jpg?s=1024x1024&w=is&k=20&c=iQdICOnz_UmfAiFuY3d3LQe1B9cYHI3UwjTPNKBOlow=' }

}, { toJSON: { virtuals: true } })

bookSchema.methods.showData = function () {
    return `${this.title} was written by ${this.author} in ${this.published_date}. We have ${this.quantity} left in stock`
}

//exports Book
module.exports = mongoose.model('Book', bookSchema)
