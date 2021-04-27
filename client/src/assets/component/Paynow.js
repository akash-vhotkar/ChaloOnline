import React, { useEffect,useState } from "react";
import Navbar from "./Navbar";
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import LockIcon from '@material-ui/icons/Lock';
import { REG_FEE } from "../../config/Env";
import { getUserByIdData } from "../../store/actionMethods/AuthMethods";
import axios from "../../config/axios";
import { BASE_URL } from "../../config/Baseurl";
import Transationonsuccess from "./Transationonsuccess";

const style = {
    acctivareform: {
        width: "58%",
        margin: "auto",
        background: "lightcyan",
    }
}

export default function Paynow() {
    const [isPayment, setisPayment] = useState(null);
    
    const { user } = useSelector(state => state.AuthReducer);
    const history = useHistory();
    const dispatch = useDispatch();

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;

            script.onload = () => {
                resolve(true);
            }
            script.onerror = () => {
                resolve(false);
            }
            document.body.appendChild(script);
        });
    }



    const displayRozorPay = async () => {
        const resp = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!resp) {
            alert("Faliled to load")
            return;
        }

        try {
            const {data} = await axios.post('/getpayment');
            var options = {
                amount: data.amount.toString(),
                currency: data.currency,
                name: "Chalo Online Registration Fee",
                description: "Registration Fee first Time",
                image: "https://cdn.logo.com/hotlink-ok/logo-social-sq.png",
                order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                handler: async function (response) {
                    const {data} = await axios.post('/verifypayment',response);
                    toast.success(data.message)
                    dispatch(getUserByIdData({id:user._id}));
                    setisPayment(JSON.parse(data.paymentdata))
                },
                prefil: {
                    name: `${user.name}`,
                    email: `${user.email}`,
                    contact: `${user.phone}`
                }
            };
    
            var paymenyObj = new window.Razorpay(options);
            paymenyObj.open();
        } catch (error) {
            <Redirect to="/paynow" />
            const { data: { errors } } = error.response;
            toast.error(errors[0].message);
        }
        
    }

    useEffect(async () => {
        const {data} = await axios.post("/isprofilecomplete",{id:user._id});
        if(!data.status){
            history.push("/activateacc");
        }
    }, [])


    return (
        <>
            {
                isPayment == null ? (
                    <>
                    <Helmet>
                        <title>Pay now - Chalo Online</title>
                        <meta name="description" content="Welcome to forgotpassword page" />
                    </Helmet>
                    <Toaster position="top-right" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />

                    <Navbar />
                    <div className="container px-5 mt-5">
                        <div style={style.acctivareform}>
                            <div className="card">
                                <img src="/images/pay.jpg" className="card-img-top" alt="payim" />
                                <div className="card-body">
                                    <h5 className="card-title text-center">Chalo online registration Portal</h5>
                                    <h3 className="card-text text-center">Registraton Fee {REG_FEE} Rs</h3>
                                    <a href="#" onClick={displayRozorPay} className="btn btn-block btn-primary"><LockIcon /> Pay Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                ) : <Transationonsuccess tdata={isPayment} />
            }
        </>
    )
}
