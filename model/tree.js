const mongoose = require('mongoose');

module.exports = mongoose.model('tree', {
    objectid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registration',
    },
    userid: {
        type: String,
        required: true
    },
    refferbyid: {
        type: String,
        required: false
    },
    level: {
        type: String
    },
    index: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    path: {
        type: Array
    },
    Parentposition: {
        parentlevel: String,
        parentindex: String
    }
})


