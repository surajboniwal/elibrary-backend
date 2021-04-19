const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        max: 500,
        required:true
    },
    author: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    cover: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Book', bookSchema)