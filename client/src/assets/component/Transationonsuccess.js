import React from 'react'
import { Helmet } from "react-helmet";
import { Link, Redirect } from 'react-router-dom';
import Navbar from './Navbar';

const style = {
    acctivareform: {
        width: "58%",
        margin: "auto",
        background: "lightcyan",
    },
    simg:{
        height:"350px"
    }
}

export default function Transationonsuccess(props) {
    return (
        <>
             {
                 props.tdata ? (
                    <>
                    <Helmet>
                        <title>Transaction success - Chalo Online</title>
                        <meta name="description" content="Welcome to Transaction success page" />
                    </Helmet>

                    <Navbar />
                    <div className="container px-5 mt-5">
                        <div style={style.acctivareform}>
                            <div className="card">
                                <img src="/images/success.gif" style={style.simg} className="card-img-top" alt="payim" />
                                <div className="card-body">
                                    <h5 className="card-title text-center">Welldone!! Now take ScreenShot of details</h5>
                                    <p>Email: {props.tdata.email}</p>
                                    <p>Amount: {(props.tdata.amount / 100)}</p>
                                    <p>Transaction id: {props.tdata.id}</p>                            
                                    <p>order id: {props.tdata.order_id}</p>
                                    <Link to="/"  className="btn btn-block btn-primary">Back to home</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                 ): <Redirect to="/dashboard" />
             }
        </>
    )
}
