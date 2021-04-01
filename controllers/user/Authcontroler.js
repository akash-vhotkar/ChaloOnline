const Registration = require('../../model/registration');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
                            id: IsuserExist.id
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
            console.log('req come');
            console.log(req.body);
            const { name, email, number, password, refferBy } = req.body;

            if (!name || !email || !number || !password) {
                return res.status(400).json({ errors: [{ message: "All fields required", status: false }] });
            } else if (number.length < 10 || number.length >= 11) {
                return res.status(422).json({ errors: [{ message: "Enter The valid Number", status: false }] });
            }
            try {
                const IsuserExist = await Registration.findOne({ id: number });
                const IsuserExist2 = await Registration.findOne({ email });
                if (IsuserExist2) {
                    return res.status(422).json({ errors: [{ message: "Email Allready exist", status: false }] });
                }
                if (IsuserExist) {
                    return res.status(422).json({ errors: [{ message: "Number Allready exist", status: false }] });
                }
                else {
                    const hashpass = await bcryptjs.hash(password, 12);
                    const newUser = new Registration({
                        name, email, number, id: number, password: hashpass, refferBy
                    })
                    console.log(newUser);
                    const newUserRegister = await newUser.save();
                    if (newUserRegister) {
                        return res.status(200).json({ message: "registration successfully", status: true });
                    } else {
                        return res.status(500).json({ errors: [{ message: "registration fail", status: false }] });
                    }
                }
            } catch (error) {
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
        }
    };
}

module.exports = Authcontroller;