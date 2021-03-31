import React from "react";
import Toggler from "./Toggler";
import { NavLink } from 'react-router-dom'; 
import Logo from "../image/logo.png";

const Navbar = () => {
    return(
        <React.Fragment>
            <nav className="navbar rainy-ashville-gradient px-4">
                <NavLink className="navbar-brand" to="/dashboard">
                    <img src={Logo} alt="Logo" className="img-fluid" />
                </NavLink>
                <Toggler />
            </nav>
        </React.Fragment>
    );
}

export default Navbar;