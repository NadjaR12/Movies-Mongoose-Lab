const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

// Iteration #2: Listing Our Celebrities
router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then(celebritiesFromDB => {
            console.log(celebritiesFromDB)
        res.render('celebrities/index', {allCelebrities: celebritiesFromDB})
        })
        .catch(err => next(err))
});

// Iteration #4 - GET - Add new Celebrity
// needs to be placed infront of router.get("celebrities/:id")
//why??
router.get("/celebrities/new", (req, res, next) => {
        res.render('celebrities/new')
})



// Iteration #3: The Celebrity Details Page
router.get("/celebrities/:id", (req, res, next) => {
    const id = req.params.id
    Celebrity.findById(id)
        .then(celebrityById => {
        res.render('celebrities/show', {details: celebrityById})
    })
        .catch(err => next(err))
})

// Iteration #6: Editing Celibrities
router.get("/celebrities/:id/edit", (req, res, next) => {
    const id = req.params.id
    Celebrity.findById(id)
             .then(celebrityToBeEdited => {
            res.render('celebrities/edit', {details: celebrityToBeEdited})
    })
             .catch(err => next(err))
})

// Iteration #4 - POST - new Celebrity
 router.post("/celebrities", (req, res, next) => {
     const { name, occupation, catchPhrase } = req.body
    Celebrity.create({name, occupation, catchPhrase})
             .then(newCelebrity => {
                console.log(newCelebrity)
             res.redirect('/celebrities')
             })
             .catch(err => next(err))
 })

 // Iteration #5 - POST - Deleting Celebrities
router.post("/celebrities/:id/delete", (req, res, next) => {
    const id = req.params.id
    Celebrity.findByIdAndRemove(id)
             .then(res.redirect('/celebrities'))
             .catch(err => next(err))
})

 // Iteration #6 - POST - update Celebrities
 router.post("/celebrities/:id/edit", (req, res, next) => { 
    const id = req.params.id
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
             .then(res.redirect('/celebrities'))
             .catch(err => next(err))
 })


module.exports = router;