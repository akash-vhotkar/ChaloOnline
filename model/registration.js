let mongoose = require('mongoose');

module.exports = mongoose.model('registration', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: Number,
        required: true,
        unique: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refferBy: {
        type: String,
        default: null
    },
    Isactive: {
        type: Boolean,
        default: true
    },
    forgotPassword: {
        type: String,
        default: null
    },
    otp: {
        type: String,
        default: null
    }
})