const tree = require('../../model/tree')
const cron = require('node-cron');

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
        // if does not activate but refer other users
        async getamount(id, sponsorid) {
            try {
                const ans = [];
                const childdata = await tree.findOne({ id: id });
                const { parentlevel, parentindex } = childdata.Parentposition;
                const { path } = await tree.findOne({ level: parentlevel, index: parentindex });
                await path.forEach(async (id) => {
                    const parent = await tree.findOne({ id: id });
                    const parentlevel = parent.level;
                    const parentindex = parent.index;
                    const difference = parseInt(parentlevel) - parseInt(childdata.childlevel);
                    const totalchilds = Math.pow(2, difference);
                    const minindexnode = await tree.findOne({ level: childdata.childlevel, path: id }).sort({ index: 1 }).limit(1);
                    const maxindex = minindexnode[0].index + totalchilds;
                    const pointindex = minindexnode[0].index + parseInt(totalchilds / 2);
                    const leftcount = await find({ path: id, index: { $lte: pointindex } }).count();
                    const rightcount = await tree.find({ path: id, index: { $gt: maxindex }, index: { $lt: pointindex } }).count();
                    if (leftcount == 1 && rightcount == 1) {
                        ans.push({ id: id, amount: 1200 })
                    }
                    else if ((leftcount == 2 && rightcount == 1) || (leftcount == 1 && rightcount == 2)) {
                        ans.push({ id: id, amount: 1500 });
                    }
                    else if ((leftcount == 3 && rightcount == 2) || (leftcount == 2 && rightcount == 3)) {
                        ans.push({ id: id, amount: 1500 })
                    }
                })
                console.log(" the ans is ", ans);
                return ans;
            } catch (err) {
                console.log(err);
                return "something is wrong "
            }

        }
        ,
        async activationpayment(id, sponsorlevel, sponsorindex) {
            try {
                let ans = [];

                const maxchild = await tree.findOne({ path: id }).sort({ level: -1 }).limit(1);
                const maxlevel = parseInt(maxchild.level);
                const user = await tree.findOne({ id: id });
                const totallevel = parseInt(maxlevel) - parseInt(user.level);
                let count = 0;
                for (let i = parseInt(user.level) + 1; i <= maxlevel; i++) {
                    count++;
                    const maxnodes = Math.pow(2, count);
                    const lowestindexnode = await tree.findOne({ path: id }).sort({ index: 1 }).limit(1);
                    const min = parseInt(lowestindexnode.index);
                    const max = parseInt(lowestindexnode.index) + parseInt(maxnodes);
                    const point = (min + max) / 2;
                    const leftcount = await tree.find({ path: id, level: i, index: { $gte: min }, index: { $lte: point } }).count();
                    const rightcount = await tree.find({ path: id, level: i, index: { $gt: point }, index: { lte: max } }).count();
                    if (count == 1 && leftcount == 1 && rightcount == 1) {
                        ans.push({ id: id, amount: 1200 })
                    }
                    else if (count == 2 && ((leftcount == 2 && rightcount == 1) || (leftcount == 1 && rightcount == 2))) ans.push({ id: id, amount: 1200 });
                    else if ((leftcount == 3 && rightcount == 2) || (leftcount == 2 && rightcount == 3)) ans.push({ id: id, amount: 1500 })



                }
                return ans;
            }
            catch (err) {
                if (err) console.log(err);
                return "somethong is wrong "
            }

        }

    }
}

module.exports = Payementcontroller;