import React, { useState, useEffect } from "react";
import Loginillustration from "../image/login.png";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL, config } from '../../config/Baseurl';
import axios from 'axios';

export default function Forgotpasschange() {
    let query = useParams();


    const [data, setdata] = useState({
        'newpass': "",
        'cnewpass': ""
    })
    const [Link, setLink] = useState(null);

    useEffect(() => {
        setLink(query.link)
    }, [])

    const InputEvent = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    }

    const genratePass = async (d) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/forgotpass`, d, config);
            console.log(data);
            toast.success(data.msg);
        } catch (error) {
            console.log(error.response);
            const { data: { errors } } = error.response;
            toast.error(errors[0].message);
        }
    }

    const formSubmit = (e) => {
        e.preventDefault();
        const da = {
            ...data,
            code: Link
        };
        genratePass(da);
    }
    return (
        <div>
            <>
                <Helmet>
                    <title>Forgot password Chalo Online</title>
                    <meta name="description" content="Welcome to forgotpassword page" />
                </Helmet>
                <Toaster position="top-right" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />

                <div className="container-fluid" id="login-page">
                    <div className="row">
                        <div className="col-md-6 p-0">
                            <img src={Loginillustration} className="img-fluid" alt="illustration" />
                        </div>
                        <div className="col-md-6 p-5">
                            <h1>Forgot password</h1><br />
                            <p>Welcome Chalo online recovery portal</p>
                            <form onSubmit={formSubmit}>
                                <div className="form-group">
                                    <input type="password" className="form-control" name="newpass" value={data.newpass} onChange={InputEvent} required id="newpass" placeholder="Enter New password" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="cnewpass" value={data.cnewpass} onChange={InputEvent} required placeholder="Confirm New Password" />
                                </div>
                                <button type="submit" className="btn-login">Continue <ChevronRightIcon /></button>
                            </form>
                            <div className="text-center">
                                <NavLink to="/login" className="links">forgot password?</NavLink><br />
                                <NavLink to="/registration" className="links">Not registered yet?</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}
