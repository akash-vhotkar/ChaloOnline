const mongoose = require('mongoose');

const treeSchema = mongoose.Schema({
    uobjectid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registration',
    },
    id: {
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
},{timestamp:true});

const mod = mongoose.model('tree',treeSchema);

module.exports = mod;
