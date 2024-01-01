import React from "react";
import './Logo.css'; 
import photon from './photon.png';

const Logo = () => {

    return(
            <div className="logoDiv">
                <img src={photon} alt="logo" className="logo"/>
            </div>
    )
}

export default Logo;
