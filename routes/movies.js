const Movie = require("../models/Movie.model");

const router = require("express").Router();

router.get('/movies/', (req, res, next) => {
    Movie.find()
       .populate('cast')
        .then(moviesFromDb => {
            console.log(moviesFromDb) 
            res.render('index', {moviesFromDb})
        })
})

router.get('/movies/new', (req, res, next) => {
// get data from database Celebrities and pass them to the view
    Movie.find()
    .then(movie => {
        console.log(movie)
        res.render('movies/new', {movie})
    })
    .catch(err => next(err))
})

router.post('/movies/', (req, res, next) => {
const { title, genre, plot} = req.body;
const cast = req.Movie.model.cast
console.log(cast)
    Movie.create({ title, genre, plot, cast: cast})
         .then(newMovie => {
             console.log(newMovie)
             res.redirect('/movies/')
            })
         .catch(err => next(err))
})


module.exports = router;