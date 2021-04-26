const { getUserInfoById, getUserDataByrefferid } = require("./function");
const profileModal = require('../../model/profile');
const activateaccModal = require('../../model/activateAcc');
const registerModal = require('../../model/registration');

const activateAccController = () => {
    return {
        async getFullUserInfo(req, res) {
            const { id } = req.body;
            if (!id) {
                return res.status(422).json({ errors: [{ message: "All Field required", status: false }] });
            }
            try {
                const isprofileexist = await profileModal.findOne({ obid: id });
                if (isprofileexist) {
                    return res.status(422).json({ errors: [{ message: "Profile exist update it Now", status: false }] });
                } else {
                    const udata = await getUserInfoById(id);
                    if (udata) {
                        const refferaldata = await getUserDataByrefferid(udata.refferBy);
                        const newprofile = new profileModal({
                            obid: udata._id,
                            id: udata.id,
                            name: udata.name,
                            mobile: udata.number,
                            email: udata.email,
                            refferbyName: refferaldata.name,
                            refferbyId: refferaldata.id
                        });
                        await newprofile.save();
                        return res.status(200).json({ message: "Profile Done pay now", status: true });
                    } else {
                        return res.status(422).json({ errors: [{ message: "Try Again", status: false }] });
                    }
                }
            } catch (error) {
                return res.status(500).json({ errors: [{ message: "Something went wrong", status: false, errs: error }] });
            }
        },
        async isprofilecomplete(req, res) {
            try {
                // console.log(req.id);
                // console.log(req.user);
                const userpro = await profileModal.findOne({ obid: req.user._id });
                // console.log(userpro);
                if (userpro) {
                    return res.json({ status: true });
                } else {
                    return res.json({ status: false });
                }
            } catch (error) {
                return res.status(500).json({ errors: [{ message: "Something went wrong", status: false, errs: error }] });
            }
        },
    }
}


module.exports = activateAccController;