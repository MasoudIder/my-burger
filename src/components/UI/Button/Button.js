import React from "react";
import './Button.css'

const Button = props => (
    <button
        disabled={props.disabled}
        className={props.btnType + ' Button'}
        onClick={props.click}
    >
        {props.children}
    </button>
);

export default Button;