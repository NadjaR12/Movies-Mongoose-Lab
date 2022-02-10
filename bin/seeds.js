const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/boilerplate")


const Celebrity = require('../models/Celebrity.model')


const celebrities = [
    {
    name: "Leonard Cohen",
    occupation: "Poet",
    catchPhrase: "Hallelujah"    
    },
    {
    name: "Julia Roberts",
    occupation: "Actress",
    catchPhrase:  "Notting Hill"
    },
    {
    name: "Coco Chanel",
    occupation: "Designer",
    catchPhrase: "No. 5"
    }
]

Celebrity.create(celebrities)
          .then(celebrities => {
              console.log('successfully added')
              mongoose.connection.close()
          })
          .catch(err => console.log(err))