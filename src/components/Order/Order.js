import React from "react";
import './Order.css'

const Order=(props)=>{
    return(
        <div className="Order">
            <p>Ingredients : Salad({props.detail.salad}) , Bacon({props.detail.bacon}) , Cheese({props.detail.cheese}) , Meat({props.detail.meat})</p>
            <p>Price:<strong> {props.detail.price.toFixed(2)}$ </strong></p>
            <p>Customer : <strong>{props.detail.customer}</strong> </p>
        </div>
    )
}

export default Order;