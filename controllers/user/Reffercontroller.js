const tree = require('../../model/tree');
const registrationModel = require('../../model/registration');
const passswordgenerator = require('generate-password');
const { addtotree } = require('./function');

const Reffercontroller = () => {
    return {
        async addtreecall(req, res) {
            const { sponsorid, id, name, email, uobjectid } = req.body;
            if (!sponsorid || !id || !name || !email || !uobjectid) {
                return res.status(400).json({ errors: [{ message: "All fields required", status: false }] });
            } else {
                addtotree(req, res, sponsorid, id, name, email, uobjectid);
            }
        },

        async addAdmin(req, res) {
            const admin = {
                objectid: "606d964b48f0b94fb8dbc5db",
                path: ["C099735487"],
                email: "admin@gmail.com",
                name: "companyname",
                level: 1,
                id: "C099735487",
                index: 1
            }
            tree.create(admin).then(alldata => {
                return res.status(200).send('Admin Added into tree');
            }).catch(err => {
                return res.status(400).send('Err', err);
            })
        }
    }
}

module.exports = Reffercontroller;