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
    // {
    //     "path": ["C099735487", "C062510628", "C064038587", "C039178637"],
    //     "name": "aravind",
    //     "email": "aravind@gmail.com",
    //     "level": "4",
    //     "index": "1",
    //     "Parentposition": {
    //         "parentlevel": "3",
    //         "parentindex": "1"
    //     },
    //     "id": "C039178637",
    //     "refferbyid": "C099735487",
    //     "uobjectid": {
    //         "$oid": "60866d741b37345fe83e38f6"
    //     },
    //     "__v": 0
    // }

const Payementcontroller = () => {
    return {// thise is function if user is activated account and refer the other user
        // if does not activate but refer other users
        async getamount(id, sponsorid) {
            try {
                const ans = [];
                const childdata = await tree.findOne({ id: id });
                const { parentlevel, parentindex } = childdata.Parentposition;

                const parentdata = await tree.findOne({ level: parentlevel, index: parentindex });
                const path = parentdata.path;
                const ogparent =  parentdata.id;
                console.log(path);
                
                await path.forEach(async function(id){
                    try{
                    const parentbenifited = await tree.findOne({id: id , paidlevels:{$elemMatch: {level: childdata.level}}});
                   
                    if( parentbenifited == null ){
                    console.log(parentbenifited);
                    const parent = await tree.findOne({ id: id });
                    const parentlevel = parseInt(parent.level);
                    const parentindex = parseInt(parent.index);
                    console.log("parenlevel ",parentlevel,"  ", parentindex)
                    
                    const difference =   parseInt(childdata.level)-parentlevel;
                    const totalchilds = Math.pow(2, difference);
                    const minindexnode = await tree.findOne({ level: childdata.level, path: id }).sort({ index: 1 }).limit(1);
                    if(Object.keys(minindexnode).length != 0){
                         
                    const maxindex = parseInt( minindexnode.index) + totalchilds-1;
                    const pointindex = parseInt( minindexnode.index) + parseInt(totalchilds / 2)-1;
                    console.log(" parent level ", parent.level, " parent index ", parent.index, " minindex of the paretnt ", minindexnode.index," max index of ", maxindex," point index is ",pointindex);
                    const leftcount = await tree.find({ path: id, index: { $lte: pointindex, $gte: minindexnode.index },level: childdata.level }).count();
                    const rightcount = await tree.find({ path: id, index: { $gt: maxindex }, index: { $gt: pointindex },level: childdata.level }).count();
                    console.log(leftcount , "  right count ", rightcount," parent id ",parent.id);
                    

                    if (  difference ==1&&leftcount >= 1 && rightcount >= 1 ) {

                       const updateparent = await tree.findOneAndUpdate({id: id}, {
                           $push: { paidlevels: {id:childdata.id, amount:1200, level: childdata.level}}
                       },{new:true});
                        ans.push({ id: id, amount: 1200 })
                    }
                    else if ( (difference ==2) &&((leftcount >= 2 && rightcount >= 1) || (leftcount >= 1 && rightcount >= 2) )) {

                        const updateparent = await tree.findOneAndUpdate({id: id}, {
                            $push: { paidlevels: {id: childdata.id, amount:1500, level: childdata.level}}},{new:true});
                        
                        ans.push({ id: id, amount: 1500 });
                    }
                    else if ((difference >2) && ((leftcount >= 3 && rightcount >= 2) || (leftcount >= 2 && rightcount >= 3))) {

                        const updateparent = await tree.findOneAndUpdate({id: id}, {
                            $push: { paidlevels: {id: childdata.id, amount:1500, level: childdata.level}}},{new:true});
                        
                        ans.push({ id: id, amount: 1500 })
                    }
                    
                    if(id ==ogparent){
                        console.log("thise is last benifited ", ans);
                        return ans;
                    }
                }
            }
            else{
                if(id ==ogparent){
                    
                    return ans;
                }
            }
        }
        catch(err){
            if(err) console.log(err);
        }
                })
             
                
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