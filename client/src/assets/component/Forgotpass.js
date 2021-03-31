import React, { useState } from "react";
import Loginillustration from "../image/login.png";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL, config } from '../../config/Baseurl';
import axios from 'axios';


const Forgotpass = () => {

    const history = useHistory();

    const [data, setData] = useState(
        {
            email: "",
            number: ""
        }
    );

    const Sendresetlink = async (d) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/SendEmail`, d, config);
            toast.success(data.msg);
        } catch (error) {
            const { data: { errors } } = error.response;
            toast.error(errors[0].message);
        }
    }

    const InputEvent = (event) => {
        const { name, value } = event.target;

        setData((preVal) => {
            return {
                ...preVal,
                [name]: value
            };
        })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        Sendresetlink(data);
    }
    return (
        <>
            <Helmet>
                <title>Forgot password Chalo Online</title>
                <meta name="description" content="Welcome to registration page" />
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
                                <label className="sr-only" htmlFor="exampleInputEmail1">Enter register Email address</label>
                                <input type="email" className="form-control" name="email" value={data.email} onChange={InputEvent} required id="emila" aria-describedby="emailHelp" placeholder="Email Address" />
                            </div>
                            <div className="form-group">
                                <label className="sr-only" htmlFor="exampleInputEmail1">Enter register Number</label>
                                <input type="number" className="form-control" name="number" value={data.number} onChange={InputEvent} required id="number" aria-describedby="emailHelp" placeholder="Number" />
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
    );
}

export default Forgotpass;