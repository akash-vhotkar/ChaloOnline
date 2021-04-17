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
        //// refferal id
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refferBy: {
        // meri
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
    },
    isPaymentdone: {
        type: Boolean,
        default: false
    }
})