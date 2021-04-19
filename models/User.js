const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    isPhoneVerified: {
        type: Boolean,
        default: false,
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true })

// userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)