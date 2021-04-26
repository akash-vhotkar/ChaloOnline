import React,{useEffect} from "react";
import Navbar from "./Navbar";
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import axios from "../../config/axios";
import { useHistory } from "react-router";

const style = {
    acctivareform: {
        width: "58%",
        margin: "auto",
        background: "lightcyan",
    }
}

const Activateacc = () => {
    const { user } = useSelector(state => state.AuthReducer);
    const history = useHistory();

    useEffect(async () => {
        const {data} = await axios.post("/isprofilecomplete");
        if(data.status){
            history.push("/paynow");
        }
    }, [])

    const acctivateAccount = async ()=>{
        try {
            const {data} = await axios.post("/getUserInfo",{id:user._id});
            toast.success(data.message)
            history.push('/paynow');
        } catch (error) {
            const { data: { errors } } = error.response;
            toast.error(errors[0].message);
        }
    }

    const activateform = (e) => {
        e.preventDefault();
        acctivateAccount();
    }

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
                    <form onSubmit={activateform}>
                            <div className="form-group px-3">
                            <label>Enter your name <span className="star">*</span></label>
                            <input type="text" name="name" value={user.name} className="form-control" placeholder="Enter your name" required readOnly />
                        </div>
                        <div className="form-group px-3 py-1">
                            <input type="submit" className="form-control p-2 bg-primary text-white" id="exampleInputPassword1" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Activateacc;