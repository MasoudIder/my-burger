import React from "react";
import LogoImg from '../../assests/images/logo.png'
import './Logo.css'

const Logo = props => (
    <div className='Logo'>
        <img src={LogoImg} alt="MyBurger"/>
    </div>
)

export default Logo