import React from "react";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';
import ShareIcon from '@material-ui/icons/Share';
import { useSelector } from 'react-redux';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { DOMAIN } from '../../config/Env';

const styles = {
    link: {
        color: 'Black',
        textDecoration: 'none',
        cursor: "pointer"
    },
    link2: {
        color: 'black',
        textDecoration: 'none',
        position: 'absolute',
        left: '86%',
        top: '54px',
        cursor: "pointer"
    }
};


const FreeLink = () => {

    const { user } = useSelector(state => state.AuthReducer);

    const copylink = () => {
        var copyText = document.getElementById("url");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        toast.success("text Copied")
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Refferal Link - Chaloonline</title>
                <meta name="description" content="Refferal link Chaloonline" />
            </Helmet>
            <Toaster position="top-right" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />
            <Navbar />
            <h1 className="page-heading">Send FreeLink</h1>
            <div className="col-md-6 p-5">
                <div className="form-group d-flex">
                    <input type="text" className="form-control mr-2" value={`${DOMAIN}/registration/${user.id}`} name="url" required id="url" placeholder="Share Link" readOnly />
                    <span onClick={copylink}><FileCopyIcon style={styles.link2} /></span>
                    <ShareIcon style={styles.link} />
                </div>

            </div>
        </React.Fragment>
    );
}

export default FreeLink;