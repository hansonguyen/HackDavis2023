const mongoose = require('mongoose')

const Schema = mongoose.Schema

const petSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    numDays: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Pet', petSchema)