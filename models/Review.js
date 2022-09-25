const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    review: {
        require: true,
        type: String,
    }
}, {timestamps: true})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review;