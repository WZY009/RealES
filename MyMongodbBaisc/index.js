// Step1 make a successful connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp') // Pay attention to the pos of movieApp
    .then(()=>{
        console.log("Oh, you succeed!")
    })
    .catch(err=>{
        console.log(err)
    });

// Step2 make a schema
const movieSchema = new mongoose.Schema({
    title:String,
    year:Number,
    score:Number,
    rating:String
})

// Step2 make a model
const Movie = mongoose.model('Movie', movieSchema)

// insert a movie
// // make a new movie
// const amadeus = new Movie({
//     title: "Amadeus",
//     year: 1955,
//     score :9.2,
//     rating : 'R'
// })

// insert many
// Movie.insertMany([
//     {title: "Amadeus", year: 1989, score :9.2, rating : 'R'},
//     {title: "ToyPlayer", year: 1953, score :9, rating : 'R'},
//     {title: "Titanick", year: 1982, score :7.2, rating : 'R'},
//     {title: "Tom&Jerry", year: 1995, score :6.2, rating : 'R'},
//     {title: "TheBiggestCat", year: 1921, score :8.2, rating : 'R'}
// ])
//     .then((data)=>{
//         console.log("Successful!")
//         console.log(data)
//     })
        
// find a movie
