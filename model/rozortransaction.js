const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    uobjid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registration'
    },
    uemail: {
        type: String,
        required: true
    },
    refferid: {
        type: String,
        required: true
    },
    paymentType:{
        type: String, 
        enum : ['payin', 'payout'], 
        required: true
    },
    id: {
        type: String,
    },
    entity: {
        type: String
    },
    amount: {
        type: Number
    },
    currency: {
        type: String,
    },
    status: {
        type: String,
    },
    order_id: {
        type: String
    },
    invoice_id: {
        type: String
    },
    international: {
        type: Boolean
    },
    method: {
        type: String
    },
    amount_refunded: {
        type: Number
    },
    refund_status: {
        type: String
    },
    captured: {
        type: Boolean
    },
    description: {
        type: String,
    },
    card_id: {
        type: String
    },
    bank: {
        type: String,
    },
    wallet: {
        type: String,
    },
    "vpa": {
        type: String,
    },
    email: {
        type: String
    },
    contact: {
        type: String,
    },
    notes: { type: Array },
    fee: { type: String },
    tax: {
        type: String,
    },
    error_code: {
        type: String,
    },
    error_description: {
        type: String,
    },
    error_source: {
        type: String,
    },
    error_step: {
        type: String,
    },
    error_reason: {
        type: String,
    },
    acquirer_data: {
        type:Object
    },
    created_at: {
        type:String,
    }

}, { timestamp: true });

const mod = mongoose.model('transaction', transactionSchema);
module.exports = mod;
