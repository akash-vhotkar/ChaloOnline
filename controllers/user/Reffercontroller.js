const tree = require('../../model/tree');
const registrationModel = require('../../model/registration');

const passswordgenerator = require('generate-password');

var cron = require('node-cron');
// "*/10 * * * * *" for 10 seconds
// '0 0 */12 * * *' for 12 hourse
cron.schedule("*/10 * * * * *", () => {
    console.log("every 10 seconds ");

}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});


const Reffercontroller = () => {
    return {
        async addtotree(req, res, sponsorid, id, name, email) {

            let password = passswordgenerator.generate({
                length: 10,
                numbers: true,
                uppercase: false,
                lowercase: false
            });


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
                                                    refferbyid: sponsorid
                                                }
                                                tree.create(cretefinalnodedata).then(allnodedata => {
                                                    res.status(200).json({ err: 0, msg: "node created successfully" })
                                                }).catch(err => {
                                                    if (err) console.log(err);;
                                                })

                                            }).catch(err => {
                                                if (err)
                                                    console.log(err);

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
                                                    refferbyid: sponsorid
                                                }
                                                tree.create(cretefinalnodedata).then(allnodedata => {
                                                    res.status(200).json({ err: 0, msg: "node created successfully" })
                                                }).catch(err => {
                                                    if (err) console.log(err);;
                                                })






                                            }).catch(err => {
                                                if (err)
                                                    console.log(err);

                                            })







                                        }

                                    }).catch(err => {
                                        if (err) console.log(err);
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
                                        refferbyid: sponsorid
                                    }
                                    tree.create(createrightchild).then(allnodedata => {
                                        res.status(200).json({ err: 0, msg: "node created sucsessfully" })
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
                                id: id
                            }
                            tree.create(createleftchild).then(allnodesdata => {
                                res.status(200).json({ err: 0, msg: "node created successfully" })
                            }).catch(err => {

                                if (err) {
                                    console.log(err);
                                    res.status(500).json({ err: 1, msg: "Internal server error" })
                                }
                            })

                        }

                    }).catch(err => {
                        if (err) console.log(err);
                        res.status(500).json({ err: 1, msg: "Internal server error" });
                    })
                } else {

                    res.status(500).json({ err: 1, msg: "Invalid Sponsorid" });
                }



            }).catch(err => {
                if (err) console.log(err);
            })


        },
        addrootnode(req, res) {
            const admin = {
                path: ["6105263500"],
                email: "admin$",
                name: "companyname",
                level: 1,
                id: "6105263500",
                index: 1
            }
            tree.create(admin).then(alldata => {
                res.send('creted')
            }).catch(err => {
                if (err) console.log(err);
            })

        }
    }
}
module.exports = Reffercontroller;