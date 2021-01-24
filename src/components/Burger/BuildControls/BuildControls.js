import React from "react";
import './BuildControls.css'
import BuildControl from "./BuilControl/BuildControl";

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const BuildControls = (props) => (
    <div>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(
            (ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.ingredientAdd(ctrl.type)}
                    removed={() => props.ingredientRemove(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}/>
            ))
        )}
        <button className='OrderButton'
                disabled={!props.purchasable}
                onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'Login'}</button>
    </div>
)

export default BuildControls;