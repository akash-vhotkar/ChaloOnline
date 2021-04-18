const tree = require('../../model/tree');
const registrationModel = require('../../model/registration');


const Reffercontroller = () => {
    return {
        async addtotree(req, res) {
            console.log("req come");
            const { objectid, id, refferby, name, email } = req;
            try {
                const user = await registrationModel.find({ id: id });
                const refferbyuser = await registrationModel.find({ id: refferby });
                const treereffrbydata = await tree.find({ sponserid: refferby });
                const checkisuserexist = await tree.find({ objectid });
                if (checkisuserexist) {
                    return res.status(422).json({ errors: [{ message: "User Account is allready exixt", status: false }] });
                }
                

                const newactivate = new tree({
                    objectid,
                    userid: id,
                    refferbyid: refferby,
                    name: name,
                    email: email
                });



            } catch (error) {
                return res.status(500).json({ errors: [{ message: "Something went wrong", status: false, errs: error }] });
            }
        }
    }
}
module.exports = Reffercontroller;