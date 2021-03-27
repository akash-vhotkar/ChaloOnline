let mongoose = require('mongoose');

module.exports = mongoose.model('registration', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})