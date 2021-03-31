import React, { useState, useEffect } from "react";
import Regisillustration from "../image/regis.png";
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink, useHistory, useParams } from "react-router-dom";
import { BASE_URL, config } from '../../config/Baseurl';
import axios from 'axios';


const Registration = () => {
    let query = useParams();
    const history = useHistory();

    const [data, setData] = useState(
        {
            name: "",
            email: "",
            password: "",
            number: ""
        }
    );

    const registerUser = async (d) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/register`, d, config);
            console.log(data);
            toast.success(data.message)
        } catch (error) {
            const { data: { errors } } = error.response;
            toast.error(errors[0].message);
        }
    }

    const [refferId, setrefferId] = useState(null);
    const [refferalname, setrefferalname] = useState(null)

    const InputEvent = (event) => {
        const { name, value } = event.target;
        setData((preVal) => {
            return {
                ...preVal,
                [name]: value
            };
        })
    }

    useEffect(() => {
        if (query.refferid) {
            setrefferId(query.refferid);
        }
    }, [])

    useEffect(() => {
        if (refferId) {
            const fetchname = async () => {
                try {
                    const { data } = await axios.post(`${BASE_URL}/getUserinfoByrefferid`, { refferBy: query.refferid }, config);
                    console.log(data);
                    setrefferalname(data.username);
                } catch (error) {
                    const { data: { errors } } = error.response;
                    toast.error(errors[0].message);
                    history.push('/registration');
                    setrefferId(null);
                }
            }
            fetchname();
        }

    }, [refferId])

    const formSubmit = (e) => {
        e.preventDefault();
        const make = {
            ...data,
            "refferBy": refferId,
        }
        registerUser(make);
    }
    return (
        <>
            <Helmet>
                <title>Registration page Chalo Online</title>
                <meta name="description" content="Welcome to registration page" />
            </Helmet>
            <Toaster position="top-right" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />
            <div className="container-fluid" id="registration-page">
                <div className="row">
                    <div className="col-md-6 p-0">
                        <img src={Regisillustration} className="img-fluid" alt="illustration" />
                    </div>
                    <div className="col-md-6 p-5">
                        <h1>User Registration</h1><br />
                        <p>Welcome back</p>
                        <form onSubmit={formSubmit}>
                            <div className="form-group my-4">
                                <label className="sr-only" htmlFor="exampleInputEmail1">Enter name</label>
                                <input type="text" className="form-control" name="name" value={data.name} onChange={InputEvent} id="name" aria-describedby="emailHelp" placeholder="Email name" />
                            </div>
                            <div className="form-group my-4">
                                <label className="sr-only" htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" name="email" value={data.email} onChange={InputEvent} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Address" />
                            </div>
                            <div className="form-group my-4">
                                <label className="sr-only" htmlFor="InputPassword">Password</label>
                                <input type="password" className="form-control" name="password" value={data.password} onChange={InputEvent} id="InputPassword" placeholder="Password" />
                            </div>
                            <div className="form-group my-4">
                                <label className="sr-only" htmlFor="InputNumber">Mobile Number</label>
                                <input type="text" className="form-control" name="number" value={data.number} onChange={InputEvent} id="InputNumber" placeholder="Mobile No." />
                            </div>
                            {
                                refferId ? (<>  <div className="form-group my-4">
                                    <label className="sr-only" htmlFor="InputNumber">Reffer id</label>
                                    <input type="text" className="form-control" name="number" value={refferId} id="refferid" placeholder="Reffer id." readOnly />
                                </div>
                                    <div className="form-group my-4">
                                        <label className="sr-only" htmlFor="InputNumber">Refferal name</label>
                                        <input type="text" className="form-control" readOnly name="number" value={refferalname} id="refferal name" placeholder="Refferal name." />
                                    </div></>) : ""
                            }
                            <button type="submit" className="btn-login">Continue <ChevronRightIcon /></button>
                        </form>
                        <div className="text-center">
                            <NavLink to="/login" className="links">Login Now</NavLink><br />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Registration;