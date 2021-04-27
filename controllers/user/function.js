const registrationModel = require('../../model/registration');
const tree = require('../../model/tree');
const activateaccModal = require('../../model/activateAcc');
const transactionModal = require('../../model/rozortransaction');

const addtotree = async (req,res,sponsorid, id, name, email,objid)=>{
   
    tree.findOne({ id: sponsorid }).then(sponsordata => { //get sponsordata first
        if (sponsordata) {
            const sponsorpath = sponsordata.path;

            const sponsorposition = {//sponsror position
                sponsorlevel: sponsordata.level,
                sponsorindex: sponsordata.index
            }

            const sponsorleftchild = {  // sponsorleftchild
                level: parseInt(sponsorposition.sponsorlevel) + 1,
                index: (sponsorposition.sponsorindex * 2 - 1)
            }
            const sponsorrightchild = { //sponsorrightchild 
                level: parseInt(sponsorposition.sponsorlevel) + 1,
                index: (sponsorposition.sponsorindex * 2)
            }


            tree.findOne({ level: sponsorleftchild.level, index: sponsorleftchild.index }).then((leftchilddata) => { //chckhe weather left exist in database

                if (leftchilddata) {  // if left child is exist
                    tree.findOne({ level: sponsorrightchild.level, index: sponsorrightchild.index }).then(rightchilddata => {
                        if (rightchilddata) { // if their is right child

                            // position full at the sponsor left and right
                            tree.find({ path: sponsorid }).sort({ level: -1 }).limit(1).then(childestnode_data => {
                                const childestnode = {
                                    childlevel: childestnode_data[0].level
                                }
                                if (parseInt(sponsorposition.sponsorindex) % 2 != 0) {
                                    tree.find({ level: childestnode.childlevel, path: sponsorid }).sort({ index: 1 }).limit(1).then((maxlevelminindex) => {
                                        const newnodeparentposition = {
                                            parentlevel: maxlevelminindex[0].level,
                                            parentindex: maxlevelminindex[0].index
                                        }

                                        const newnodeposition = {
                                            level: parseInt(maxlevelminindex[0].level) + 1,
                                            index: (maxlevelminindex[0].index * 2) - 1
                                        }
                                        const pathoftheparent = maxlevelminindex[0].path;
                                        pathoftheparent.push(id);
                                        const cretefinalnodedata = {
                                            name: name,
                                            email: email,
                                            level: newnodeposition.level,
                                            index: newnodeposition.index,
                                            path: pathoftheparent,
                                            Parentposition: newnodeparentposition,
                                            id: id,
                                            refferbyid: sponsorid,
                                            uobjectid:objid
                                        }
                                        tree.create(cretefinalnodedata).then(allnodedata => {
                                            // res.status(200).json({ err: 0, msg: "node created successfully" })
                                            return true;
                                        }).catch(err => {
                                            if (err) console.log(err);
                                            return false;
                                        })

                                    }).catch(err => {
                                        if (err)
                                            console.log(err);
                                            return false;

                                    })
                                }
                                else {
                                    // hndeling right position of the tree


                                    tree.find({ level: childestnode.childlevel }).sort({ index: -1 }).limit(1).then((maxlevelmaxindex) => {

                                        const newnodeparentposition = {
                                            parentlevel: maxlevelmaxindex[0].level,
                                            parentindex: maxlevelmaxindex[0].index
                                        }

                                        const newnodeposition = {
                                            level: parseInt(maxlevelmaxindex[0].level) + 1,
                                            index: (maxlevelmaxindex[0].index * 2)
                                        }
                                        const pathoftheparent = maxlevelmaxindex[0].path;
                                        pathoftheparent.push(id);
                                        const cretefinalnodedata = {
                                            name: name,
                                            email: email,
                                            level: newnodeposition.level,
                                            index: newnodeposition.index,
                                            path: pathoftheparent,
                                            Parentposition: newnodeparentposition,
                                            id: id,
                                            refferbyid: sponsorid,
                                            uobjectid:objid
                                        }
                                        tree.create(cretefinalnodedata).then(allnodedata => {
                                            // res.status(200).json({ err: 0, msg: "node created successfully" })
                                            return true;
                                        }).catch(err => {
                                            if (err) console.log(err);
                                            return false;
                                        })






                                    }).catch(err => {
                                        if (err)
                                            console.log(err);
                                            return false;

                                    })

                                }

                            }).catch(err => {
                                if (err) console.log(err);
                                return false;
                            })

                        }
                        else {  // no right child
                            sponsorpath.push(id);

                            const createrightchild = {
                                name: name,
                                email: email,
                                level: sponsorrightchild.level,
                                index: sponsorrightchild.index,
                                path: sponsorpath,
                                Parentposition: {
                                    parentlevel: sponsordata.level,
                                    parentindex: sponsordata.index
                                },
                                id: id,
                                refferbyid: sponsorid,
                                uobjectid:objid
                            }
                            tree.create(createrightchild).then(allnodedata => {
                                // res.status(200).json({ err: 0, msg: "node created sucsessfully" })
                                return true;
                            }).catch(err => {
                                if (err) console.log(err);
                            })


                        }

                    }).catch(err => {
                        if (err) console.log(err);
                    })
                }
                else {  // left positition is empty
                    sponsorpath.push(id)
                    const createleftchild = {
                        name: name,
                        email: email,
                        level: sponsorleftchild.level,
                        index: sponsorleftchild.index,
                        Parentposition: {
                            parentlevel: sponsordata.level,
                            parentindex: sponsordata.index
                        },
                        path: sponsorpath,
                        refferbyid: sponsorid,
                        id: id,
                        uobjectid:objid
                    }
                    tree.create(createleftchild).then(allnodesdata => {
                        // res.status(200).json({ err: 0, msg: "node created successfully" })
                        return true;
                    }).catch(err => {

                        if (err) {
                            console.log(err);
                            // res.status(500).json({ err: 1, msg: "Internal server error" })
                            return false;
                        }
                    })

                }

            }).catch(err => {
                if (err) console.log(err);
                // res.status(500).json({ err: 1, msg: "Internal server error" });
                return false;
            })
        } else {

            // res.status(500).json({ err: 1, msg: "Invalid Sponsorid" });
            return false;

        }



    }).catch(err => {
        if (err) console.log(err);
        return false;
    })
}


function create_UUID(){
    var dt = new Date().getTime();
    let uuid = Math.floor(dt);
    return uuid;
}

const getUserInfoById = async (id) => {
    try {
        const uData = await registrationModel.findById(id);
        return uData;
    } catch (error) {
        return false;
    }
}

const getUserDataByrefferid = async (rid) => {
    try {
        const uData = await registrationModel.findOne({id:rid});
        return uData;
    } catch (error) {
        return false;
    }
}

const activateuserAcc = async (id,paymentid)=> {
    if (!id || !paymentid) {
        return res.status(422).json({ errors: [{ message: "All Field required", status: false }] });
    }
    try {
        const isactivated = await activateaccModal.findOne({ objid: id });
        if (isactivated) {
            return false;
        }
        const udata = await getUserInfoById(id);
        if (udata) {
            const newActivateacc = new activateaccModal({
                objid: udata._id,
                id: udata.id,
                email: udata.email,
                razorpay_payment_id: paymentid
            });
            await registrationModel.findByIdAndUpdate(id, { isPaymentdone: true });
            await newActivateacc.save();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

const addtransaction = async (uid,paymentType,tranobj)=>{
    // tranobj = JSON.parse(tranobj);
    let dd = JSON.parse(tranobj)
    dd.amount = (dd.amount / 100);
    try {
        const udata = await registrationModel.findById(uid);
        if(udata){
            const newTrans = new transactionModal({
                "uobjid":udata._id,
                "uemail":udata.email,
                "refferid":udata.id,
                "paymentType":paymentType,
                ...dd
            });
            await newTrans.save();
            return true;
        }
        // const newtransaction = k
    } catch (error) {
        return false;
    }
}

module.exports = {addtotree,create_UUID,getUserInfoById,getUserDataByrefferid,activateuserAcc,addtransaction};