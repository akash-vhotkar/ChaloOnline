const mongoose = require('mongoose')
module.exports = mongoose.model("payoutdetails", {
    account_number: {
        type: String,
        required: true
    },
    fund_account_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number
    },
    currency: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    purpose: {

        type: String,
        required: false
    },
    queue_if_low_balance: true,
    reference_id: {
        type: String,
        required: true
    },
    narration: {
        type: String,
        required: false
    },
    notes: {
        note_key: String
    }
})