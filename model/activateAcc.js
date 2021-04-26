let mongoose = require('mongoose');

const activateaccSchema = mongoose.Schema({
    objid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'registration'
    },
    id:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    razorpay_payment_id:{
        type:String,
        required:true,
        trim:true
    }
},{timestamp:true})

const modal = mongoose.model('activateacc',activateaccSchema);
module.exports = modal;