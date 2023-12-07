const express = require("express");
require('dotenv').config()
const app = express();
const methodOverride = require('method-override')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.json())
const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//if we navigate to /places we render our file from ./controllers/places
const booksController = require('./controllers/books-controller.js')
//uses the controller on the /books path
app.use('/books', booksController)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});