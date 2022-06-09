const mongoose = require('mongoose')
const Review = require('./review')
const Schema = mongoose.Schema
/*
A Mongoose schema defines the structure of the document, default values, validators, etc., whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.
*/
const CampgroundSchema = new Schema({
    title:String,
    image:String,
    price:Number,
    description: String,
    location:String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
})

CampgroundSchema.post('findOneAndDelete', async function(doc){ // it's quite a bit confusing middleware. I don't know why it shows up here, hmmm...
    if(doc) {
        await Review.deleteMany({ 
            // we are going to delete all the reviews where their id field is in our document that was just deleted in its reviews array
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema)