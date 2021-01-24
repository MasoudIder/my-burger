import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import './SideDrawer.css'
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../Hoc/AUX/Aux";

const SideDrawer = (props) => {

    let cssClass = 'SideDrawer Close';
    if (props.open) {
        cssClass = 'SideDrawer Open';
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={cssClass} onClick={props.closed}>
                <div className='LogoS'>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer;