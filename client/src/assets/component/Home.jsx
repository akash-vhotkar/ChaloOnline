import React, { useEffect } from "react";
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router";

const Home = () => {
    const { user } = useSelector(state => state.AuthReducer);
    const history = useHistory();
    useEffect(() => {
        if (user) {
            history.push('/dashboard')
        }
    }, [])
    return (
        <>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center align-items-center vh-100">
                    <div className="col-4">
                        <div className="card d-flex justify-content-center align-items-center">
                            <Button variant="contained" color="secondary">
                                <NavLink to="/login" className="text-white text-decoration-none">Login Page</NavLink>
                            </Button><br />
                            <Button variant="contained" color="secondary">
                                <NavLink to="/registration" className="text-white text-decoration-none">Registration Page</NavLink>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;