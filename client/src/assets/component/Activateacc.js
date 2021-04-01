import React from "react";
import Navbar from "./Navbar";
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from "react-helmet";

const style = {
    acctivareform: {
        width: "58%",
        margin: "auto",
        background: "lightcyan",
    }
}

const Activateacc = () => {
    return (
        <React.Fragment>
            <Helmet>
                <title>Activate account - Chalo Online</title>
                <meta name="description" content="Welcome to forgotpassword page" />
            </Helmet>
            <Toaster position="top-right" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />

            <Navbar />
            <h1 className="page-heading">Activate acc</h1>
            <div className="container px-5">
                <div style={style.acctivareform}>
                    <div className="form-group px-3">
                        <label>Enter your name <span className="star">*</span></label>
                        <input type="text" name="adminname" className="form-control" placeholder="Enter your name" required />
                    </div>
                    <div className="form-group px-3 py-1">
                        <label>Enter your username <span className="star">*</span></label>
                        <input type="text" name="adminusername" className="form-control" placeholder="Enter Username" required />
                    </div>
                    <div className="form-group px-3 py-1">
                        <label>Enter your email <span className="star">*</span></label>
                        <input type="text" name="adminemail" className="form-control" placeholder="Enter your email" required />
                    </div>
                    <div className="form-group px-3 py-1">
                        <label>Eneter Your Password <span className="star">*</span></label>
                        <input type="password" className="form-control" name="password" id="exampleInputEmail1" placeholder="Enter Password" />
                    </div>
                    <div className="form-group px-3 py-1">
                        <label>Enter your confirm password <span className="star">*</span></label>
                        <input type="password" name="confirm_password" className="form-control" placeholder="Enter confirm password" required />
                    </div>
                    <div className="form-group px-3 py-1">
                        <input type="submit" className="form-control p-2 bg-primary text-white" id="exampleInputPassword1" value="Activate Account" />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Activateacc;