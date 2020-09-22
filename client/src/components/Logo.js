import React from 'react';
import logo from "../logo.png";
import {Link} from "react-router-dom";

export default function Logo (props) {

    return (
        <Link to="/">
            <img src={logo} alt="SpaceX Logo" style={{ width: 300, display: 'block', margin:'auto'}}/>
        </Link>
    );
}
