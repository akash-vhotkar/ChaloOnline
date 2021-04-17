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
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    paths: [],
    parentPos: [
        {
            pso: {
                type: String
            }
        }
    ]
})


