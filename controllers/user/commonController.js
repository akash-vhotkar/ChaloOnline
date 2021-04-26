const shortid = require('shortid');
const Razorpay = require('razorpay');
const { create_UUID, addtransaction } = require('./function');
const crypto = require('crypto');
const request = require('request');
const {activateuserAcc} = require('../user/function');

const commonController = () => {
    return {
        async getPayment(req, res) {
            let amount = 300 * 100;
            const razorpay = new Razorpay({
                key_id: process.env.ROZOR_PAY_KEY,
                key_secret: process.env.ROZOR_KEY_SECRET
            });

            const payment_capture = 1;

            const receipt = "CO" + shortid.generate() + "@id#" + create_UUID();

            let currency = "INR";

            const option = { amount, currency, receipt, payment_capture };
            try {
                const resp = await razorpay.orders.create(option);
                if (resp) {
                    return res.status(200).json(resp)
                } else {
                    return res.status(500).json({ errors: [{ message: "Try Again some error While paymen", status: false }] });
                }
            } catch (error) {
                return res.status(500).json({ errors: [{ message: "Try Again some error While paymen", status: false }] });
            }
        },
        
        async verifypayment(req, res) {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
            if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
                return res.status(500).json({ errors: [{ message: "All field are rquuired", status: false }] });
            }

            try {
                const b = razorpay_order_id + "|" + razorpay_payment_id;

                let expectedsign = crypto
                    .createHmac("sha256", `${process.env.ROZOR_KEY_SECRET}`)
                    .update(b.toString())
                    .digest("hex");

                if (expectedsign === razorpay_signature) {
                    let url = `https://${process.env.ROZOR_PAY_KEY}:${process.env.ROZOR_KEY_SECRET}@api.razorpay.com/v1/payments/${razorpay_payment_id}`;
                    request.get(url, async (error, response, body) => {
                        if(error){
                            return res.status(500).json({ errors: [{ message: "Data Not fetched", status: false }] });
                        }
                        if(body){
                            // console.log(body);
                            await addtransaction(req.user._id,"payin",body);
                            let status = await activateuserAcc(req.user._id,razorpay_payment_id);
                            if(status){
                                return res.status(200).json({ message: "Account Activated", status: true,paymentdata:body })
                            }
                        }
                    })
                } else {
                    return res.status(500).json({ errors: [{ message: "payment Error Accure transsaction suspected contact us", status: false }] });
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = commonController;
