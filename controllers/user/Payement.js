const tree = require('../../model/tree')
const cron = require('node-cron');
const payment = require('../../model/payment');
// max level shold we paid 
//  what is maxmount should use get
// max level upto user get benifit
var task = cron.schedule('10 * * * * *', (id) => {
    console.log("crone job fired after 10 s ", id);
},
    {
        scheduled: false,
        timezone: "Asia/Mumbai"
    });

const Payementcontroller = () => {
    return {// thise is function if user is activated account and refer the other user
        async paymentfunc(id, req, res) {
            try {
                const paymentdata = await payment.findOne({ id: id });
                if (paymentdata && paymentdata.status === true) {

                }
                else {
                    res.status(401).json({ err: 1, message: "Please Activate your account" })

                }



            }
            catch (err) {
                if (err) {
                    console.log(err);
                    return false
                }
            }
        },
        async getpayableamount(req, res, id, childlevel, childindex, sponsorid) {
            try {
                const paid = true;
                const { path } = await tree.findOne({ id: id, level: childlevel, index: childindex });
                path.forEach(async (id) => {
                    let sponsor = await tree.findOne({ id: id });
                    let sponsrolevel = sponsor.level;
                    let actstatus = sponsor.activationstatus;
                    if (actstatus === true) {
                        let differenece = parseInt(childlevel) - parseInt(sponsrolevel);
                        const totalchild = await tree.find({ path: id, level: childlevel }).count();
                        if (differenece == 1 && totalchild == 2 && paid == true) {
                            // amount paid  is 1200



                        }
                        else if (differenece == 2 && totalchild == 3 && paid == true) {
                            // amount paid should be 1200

                        }
                        else {
                            // amount paid should be 1500



                        }
                    }





                });

            }
            catch (err) {
                if (err) console.log(err);
                return res.status(500).json({ err: 1, message: "Internal server error" })
            }


        },// if does not activate but refer other users
        async activationpayment(id, sponsorlevel, sponsorindex) {
            const maxlevelchild = await tree.find({ path: id }).sort({ level: -1 }).limit(1);
            const maxlevel = maxlevelchild.level;
            for (let i = parseInt(sponsorlevel) + 1; i <= maxlevel; i++) {
                const difference = i - parseInt(sponsorlevel);
                const totalcount = await tree.find({ path: id, level: i });

                if (difference == 1 && totalcount == 2) {
                    // we pay the 1200 throught crone job
                }
                else if (difference == 2 && totalcount == 3) {
                    // we paid  1500 throght crone job
                }
                else {
                    // we pay 1500 fthrought crone job


                }



            }

        }

    }
}

module.exports = Payementcontroller;