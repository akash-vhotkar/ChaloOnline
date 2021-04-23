const mongoose = require('mongoose');
module.exports = mongoose.model('paymentdata', {
    userid: {
        type: String,
        required: true
    },
    Paymentid: {
        type: String,
        required: true
    },
    entity: {
        type: String,
        required: false
    },
    amount: {
        type: String,
        required: false
    },
    currency: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    invoice_id: {
        type: String,
        required: true,
        default: null
    },
    international: {
        type: Boolean,
        required: true,
        default: null
    },
    method: {
        type: String,
        required: true,
        default: null
    },
    amount_refunded: {
        type: Number,
        required: true,
        default: 0
    },
    refund_status: {
        type: String,
        required: true,
        default: null
    },
    captured: {
        type: Boolean,
        required: true,
        default: null
    },
    description: {
        type: String,
        required: true,
        default: null
    },
    card_id: {
        type: String,
        required: true,
        default: null
    },
    bank: {
        type: String,
        required: true,
        default: null
    },
    vpa: {
        type: String,
        required: true,
        default: null
    },
    email: {
        type: String,
        required: true,
        default: null
    },
    "notes": [],
    "fee": 1,
    "tax": 0,
    "error_code": null,
    "error_description": null,
    "error_source": null,
    "error_reason": null,
    "acquirer_data": {
        "rrn": "032540100810"
    },
    "created_at": 1605871409
})
