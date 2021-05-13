const mongoose = require('mongoose')

const lendingContract = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    book_id:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ], 
    status: {
        type: Boolean,
        default: false
    }
},{ timestamps: true })

module.exports = mongoose.model('LendingContract', lendingContract)