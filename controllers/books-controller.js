const router = require('express').Router()
const db = require('../models')

//seed data
router.get('/seed', (req, res) => {
    console.log("seeds begin")
    db.Books.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "author": "Emerson Thorne",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
    },
    {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "author": "Seraphina Hartwell",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
    },
    {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "author": "Augustus Blackwood",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
    },
    {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "author": "Cordelia Moonbeam",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
    }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
        .then(res.redirect('/books'))

})

//POST Create
router.post('/', (req, res) => {
    //does some basic input checks for the book
    //if no image provided, assign to undefined -- mongo will fill it in
    if (!req.body.imageURL) {
        req.body.imageURL = "https://media.istockphoto.com/id/157482029/photo/stack-of-books.jpg?s=1024x1024&w=is&k=20&c=iQdICOnz_UmfAiFuY3d3LQe1B9cYHI3UwjTPNKBOlow="
    }
    //if input is not empty, but also not a valid url, assign to undefined -- mongo will fill it in
    else if (!req.body.imageURL.startsWith("http") || !req.body.imageURL.startsWith("https")) {
        req.body.imageURL = undefined
    }
    //adds the new book to the models array using Mongoose! 
    db.Books.create(req.body)
    //redirects us to books page
    res.status(200).redirect('/books')

})

//gets books using our new sexy syntax for await and async
router.get('/', async (req, res) => {
    //goes into Mongo
    const foundBooks = await db.Books.find()
    //return pure JSON
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(foundBooks);
})

//SHOW
router.get('/:id', async (req, res) => {
    const foundBook = await db.Books.findById(req.params.id)
    //Send the JSON object as the response
    res.setHeader('Content-Type', 'application/json');
    res.status(303).send(foundBook)
})

//EDIT Put
router.put('/:id', async (req, res) => {
    const editedBook = await db.Books.findByIdAndUpdate(req.params.id, req.body, { new: true })
    //Send the JSON object as the response
    res.setHeader('Content-Type', 'application/json');
    res.status(303).send(editedBook);
})

//DELETE
router.delete('/:id', async (req, res) => {
    //uses the Mongoose native functions to find and destroy
    const deletedBook = await db.Books.findByIdAndDelete(req.params.id)
    console.log('Deleting ' + deletedBook.title)
    //sends status and redirects to books
    res.status(303).json({
        message: 'Resource Deleted'
    }).redirect('/books')
})

//ERROR
router.get('/books/*', (req, res) => {
    //for some reason, I am getting this pathing OFTEN in my console logs
    console.log("router *")
    res.status(404).json({
        message: 'Page Not Found'
    })
})

//sends our exports
module.exports = router
