import React from "react";
import './CheckOutSummary.css'
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const CheckOutSummary = (props) => {

    return (
        <div className="CheckOutSummary">
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button
                btnType="Danger"
                click={props.checkOutCancelled}>Cancel</Button>
            <Button
                btnType="Success"
                click={props.checkOutContinued}>Continue</Button>
        </div>
    )

}

export default CheckOutSummary;