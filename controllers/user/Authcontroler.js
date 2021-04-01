const Registration = require('../../model/registration');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendgrid = require('sendgrid');
const Authcontroller = () => {
    return {
        async login(req, res) {
            const { number, password } = req.body;
            if (!number || !password) {
                return res.status(400).json({ errors: [{ message: "All fields required", status: false }] });
            } else if (number.length < 10 || number.length >= 11) {
                return res.status(422).json({ errors: [{ message: "Enter The valid Number", status: false }] });
            }
            try {
                const IsuserExist = await Registration.findOne({ id: number });
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
                        return res.status(400).json({ errors: [{ message: "Invalid Number or password", status: false }] });
                    }

                } else {
                    return res.status(400).json({ errors: [{ message: "Invalid Number or password", status: false }] });
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
                console.log(usedata);
                if (usedata) {
                    let randomstring = jwt.sign(usedata.email, process.env.FORGOT_PASSWORD_SECRET);
                    console.log(randomstring);
                    await Registration.findOneAndUpdate({ email, number }, { forgotPassword: randomstring });
                    /// code for send email
                    const sendgrkey = "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"
                    sendgrid.setApiKey(sendgrkey);
                    const message = {
                        to: email,
                        from: {
                            name: "hardcipher",
                            email: "akashvhotkar4@gmail.com"
                        },
                        subject: "Change password",
                        html: `HELLOW MAIL FROM NODE`

                    }
                    await sendgrid.send(message).then(responsed => {
                        res.status(200).json({ msg: "Email Successfully Send To your Register email id " });
                    }).catch(err => {
                        if (err) console.log(err);
                    })




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
                        const res = await Registration.findOneAndUpdate({ email }, { password: hashpass, forgotPassword: null });
                        console.log(resp);
                        if (res) {
                            res.status(200).json({ msg: "Your password chamge" });
                        } else {
                            return res.status(400).json({ errors: [{ message: "Something went wrong while udating password", status: false }] });
                        }
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