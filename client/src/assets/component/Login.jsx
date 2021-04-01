import React, { useState, useEffect } from "react";
import Loginillustration from "../image/login.png";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { postLogin } from '../../store/actionMethods/AuthMethods';


const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { loginErrors, user } = useSelector(state => state.AuthReducer);

    const [data, setData] = useState(
        {
            email: "",
            password: ""
        }
    );

    useEffect(() => {
        if (loginErrors.length > 0) {
            loginErrors.map(err => {
                toast.error(err.message)
            })
        }
        if (user) {
            history.push("/dashboard")
        }
    }, [loginErrors])

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
        dispatch(postLogin(data));
    }
    return (
        <>
            <Helmet>
                <title>Login - Chalo Online</title>
                <meta name="description" content="Welcome to forgotpassword page" />
            </Helmet>
            <Toaster position="top-right" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />

            <div className="container-fluid" id="login-page">
                <div className="row">
                    <div className="col-md-6 p-0">
                        <img src={Loginillustration} className="img-fluid" alt="illustration" />
                    </div>
                    <div className="col-md-6 p-5">
                        <h1>User Login</h1><br />
                        <p>Welcome back</p>
                        <form onSubmit={formSubmit}>
                            <div className="form-group">
                                <label className="sr-only" htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" name="email" value={data.email} onChange={InputEvent} required id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Address" />
                            </div>
                            <div className="form-group my-4">
                                <label className="sr-only" htmlFor="InputPassword">Password</label>
                                <input type="password" className="form-control" name="password" value={data.password} onChange={InputEvent} required id="InputPassword" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn-login">Continue <ChevronRightIcon /></button>
                        </form>
                        <div className="text-center">
                            <NavLink to="/forgotpass" className="links">forgot password?</NavLink><br />
                            <NavLink to="/registration" className="links">Not registered yet?</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;