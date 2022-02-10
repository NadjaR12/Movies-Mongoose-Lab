const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

// Iteration#10 Listing all Movies
router.get('/movies/', (req, res, next) => {
    Movie.find()
        .then(moviesFromDb => {
            console.log(moviesFromDb) 
            res.render('movies/index', {allMovies: moviesFromDb})
    })
})

// Iteration #8 Adding a new movie
router.get('/movies/new', (req, res, next) => {
    Celebrity.find()
    .then(celebritiesFromDb => {
        res.render('movies/new', {celebritiesFromDb})
    })
    .catch(err => next(err))
})

// Iteration#10 Show Details-Page
router.get('/movies/:id', (req, res, next) => { 
    const id = req.params.id
    Movie.findById(id)
         .populate('cast')
         .then(movieById => {
             console.log(movieById)
             res.render('movies/show', {movieDetails: movieById})
    })
        .catch(err => next(err))
})

// Iteration #11 Editing a movie
router.get('/movies/:id/edit', (req, res, next) => {
    const id = req.params.id
    Movie.findById(id)
         .then(movieToBeEdited => {
             res.render('movies/edit', {details: movieToBeEdited})
         })
         .catch(err => next(err))
})


// Iteration #8 + #9 Posting the new movie to the Movies List
router.post('/movies/', (req, res, next) => {
const { title, genre, plot, cast } = req.body;
console.log(cast)
    Movie.create({ title, genre, plot, cast })
         .then(newMovie => {
             console.log(newMovie)
             res.redirect('/movies/')
    })
         .catch(err => next(err))
})

//Iteration #11 Update edited Movie
router.post('/movies/:id/edit', (req, res, next) => {
    const id = req.params.id
    const {title, genre, plot} = req.body
    Movie.findByIdAndUpdate(id, {title, genre, plot})
        .then(res.redirect('/movies/'))
        .catch(err => next(err))
})

// Deleting a Movie
router.post('/movies/:id/delete', (req, res, next) => {
    const id = req.params.id
    Movie.findByIdAndRemove(id)
         .then(res.redirect('/movies/'))
         .catch(err => next(err))
})


module.exports = router;