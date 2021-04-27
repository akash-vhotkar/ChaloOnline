let mongoose = require('mongoose');

const regSchema = mongoose.Schema({
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
},{timestamps:true});

const mod = mongoose.model('registration',regSchema);
module.exports = mod;