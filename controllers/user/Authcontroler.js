const Registration = require('../../model/registration');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateUniqueId = require('generate-unique-id');
const {addtotree} = require('../../controllers/user/function');


const Authcontroller = () => {
    return {
        async login(req, res) {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ errors: [{ message: "All fields required", status: false }] });
            }
            try {
                const IsuserExist = await Registration.findOne({ email });
                if (IsuserExist) {
                    if (!IsuserExist.Isactive) {
                        return res.status(500).json({ errors: [{ message: "Your Account is not active", status: false }] });
                    }
                    const ispasswordvalid = await bcryptjs.compare(password, IsuserExist.password);
                    if (ispasswordvalid) {
                        const payload = {
                            _id: IsuserExist._id,
                            name: IsuserExist.name,
                            email: IsuserExist.email,
                            phone: IsuserExist.number,
                            id: IsuserExist.id,
                            isPaymentdone:IsuserExist.isPaymentdone
                        }
                        const token = await jwt.sign({ user: payload }, process.env.JWT_SECRET);
                        return res.status(200).json({ token: token, message: "Login Successfully", status: true })
                    } else {
                        return res.status(400).json({ errors: [{ message: "Invalid Email or password", status: false }] });
                    }

                } else {
                    return res.status(400).json({ errors: [{ message: "Invalid Email or password", status: false }] });
                }
            } catch (error) {
                return res.status(500).json({ errors: [{ message: "Something went wrong", status: false, errs: error }] });
            }
        },
        async register(req, res) {
            let { name, email, number, password, refferBy } = req.body;
            
            if(refferBy == null){
                refferBy = process.env.ADMIN_REFFERID;
            }

            let id = generateUniqueId({
                useLetters: false,
                length: 8
            });

            id = "C0" + id;

            if (!name || !email || !number || !password) {
                return res.status(400).json({ errors: [{ message: "All fields required", status: false }] });
            } else if (number.length < 10 || number.length >= 11) {
                return res.status(422).json({ errors: [{ message: "Enter The valid Number", status: false }] });
            }
            try {
                const IsuserExist = await Registration.findOne({ id: id });
                const IsuserExist2 = await Registration.findOne({ email });
                const IsuserExist3 = await Registration.findOne({ number });
                
                if (IsuserExist2) {
                    return res.status(422).json({ errors: [{ message: "Email Allready exist", status: false }] });
                }
                if (IsuserExist) {
                    return res.status(422).json({ errors: [{ message: "id Allready exist", status: false }] });
                }
                if(IsuserExist3){
                    return res.status(422).json({ errors: [{ message: "Number Allready exist", status: false }] });
                }

                else {
                    const hashpass = await bcryptjs.hash(password, 12);
                    const newUser = new Registration({
                        name, email, number, id: id, password: hashpass, refferBy
                    })
                    const newUserRegister = await newUser.save();
                    if (newUserRegister) {
                        // console.log(newUserRegister);
                        // add user to tree
                        const {_id,name,email,id,refferBy} = newUserRegister;
                        const respp = await addtotree(req,res,refferBy,id,name,email,_id);
                        // console.log(respp);
                        return res.status(200).json({ message: "registration successfully", status: true });
                    } else {
                        return res.status(500).json({ errors: [{ message: "registration fail", status: false }] });
                    }
                }
            } catch (error) {
                console.log(error);
                return res.status(500).json({ errors: [{ message: "Something went wrong", status: false, errs: error }] });
            }
        },
        async getUserinfoByrefferid(req, res) {
            const { refferBy } = req.body;
            if (!refferBy) {
                return res.status(400).json({ errors: [{ message: "Enter The valid Reffer id", status: false }] });
            } else if (refferBy.length < 10 || refferBy.length >= 11) {
                return res.status(422).json({ errors: [{ message: "refferBy Should be 10 digit", status: false }] });
            }
            try {
                const data = await Registration.findOne({ id: refferBy });
                if (data) {
                    return res.status(200).json({ username: data.name, message: "User Found", status: true })
                } else {
                    return res.status(400).json({ errors: [{ message: "Enter The valid Reffer id", status: false }] });
                }
            } catch (error) {
                return res.status(500).json({ errors: [{ message: "Something went wrong", status: false, errs: error }] });
            }
        },
        async changePassword(req, res) {
            const { id, oldpass, newpass, cnewpass } = req.body;
            // 606359616767be11dc39fe74
            if (!oldpass || !newpass || !cnewpass) {
                return res.status(400).json({ errors: [{ message: "All fields required", status: false }] });
            } else if (newpass != cnewpass) {
                return res.status(400).json({ errors: [{ message: "Confirm password not match", status: false }] });
            }
            try {
                const getuser = await Registration.findById(id);
                if (getuser) {
                    const isoldpasscorect = await bcryptjs.compare(oldpass, getuser.password);
                    if (isoldpasscorect) {
                        const hashpass = await bcryptjs.hash(newpass, 12);
                        const resp = await Registration.findByIdAndUpdate(id, { password: hashpass });
                        if (resp) {
                            res.status(200).json({ msg: "password updated Successfully" });
                        } else {
                            return res.status(400).json({ errors: [{ msg: "Something went wrong", status: false }] });
                        }
                    } else {
                        return res.status(400).json({ errors: [{ msg: "old password is wrong", status: false }] });
                    }
                }
            } catch (error) {
                return res.status(500).json({ errors: [{ message: "Something went wrong", status: false, errs: error }] });
            }
        },
        async SendEmail(req, res) {
            const { email, number } = req.body;
            if (!number || !email) {
                return res.status(400).json({ errors: [{ message: "All fields required", status: false }] });
            } else if (number.length < 10 || number.length >= 11) {
                return res.status(422).json({ errors: [{ message: "Enter The valid Number", status: false }] });
            }
            try {
                const usedata = await Registration.findOne({ email, number });
                if (usedata) {
                    let randomstring = jwt.sign(usedata.email, process.env.FORGOT_PASSWORD_SECRET);
                    // console.log(randomstring);
                    await Registration.findOneAndUpdate({ email, number }, { forgotPassword: randomstring });
                    /// code for send email

                    res.status(200).json({ msg: "Email Successfully Send To your Register email id " });



                } else {
                    return res.status(400).json({ errors: [{ message: "Email id or number not valid", status: false, errs: error }] });
                }
            } catch (error) {
                return res.status(500).json({ errors: [{ message: "Something went wrong", status: false, errs: error }] });
            }
        },
        async forgotpassword(req, res) {
            const { code, newpass, cnewpass } = req.body;
            if (!newpass || !cnewpass) {
                return res.status(400).json({ errors: [{ message: "All fields required", status: false }] });
            } else if (newpass != cnewpass) {
                return res.status(400).json({ errors: [{ message: "Confirm password not match", status: false }] });
            }
            try {
                const getuser = await Registration.findOne({ forgotPassword: code });
                if (getuser) {
                    let email = await jwt.verify(code, process.env.FORGOT_PASSWORD_SECRET);
                    if (getuser.email === email) {
                        const hashpass = await bcryptjs.hash(newpass, 12);
                        await Registration.findOneAndUpdate({ email }, { password: hashpass, forgotPassword: "null" });
                        return res.status(200).json({ msg: "Your password change", status: true });
                    } else {
                        return res.status(400).json({ errors: [{ message: "Email mismatch", status: false }] });
                    }
                } else {
                    return res.status(400).json({ errors: [{ message: "Incorrect token or expire", status: false }] });
                }
            } catch (error) {
                return res.status(500).json({ errors: [{ message: "Something went wrong", status: false, errs: error }] });
            }
        },
        async getuserbyid(req, res) {
            console.log(req.body);
            const { id } = req.body;
            try {
                const data = await Registration.findById(id).select("-password");
                const token = await jwt.sign({ user: data }, process.env.JWT_SECRET);
                return res.status(200).json({ token: token, message: "user found", status: true });
            } catch (error) {
                return res.status(500).json({ errors: [{ message: "Something went wrong", status: false, errs: error }] });
            }
        }
    };
}

module.exports = Authcontroller;