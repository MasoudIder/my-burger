import React, {Component} from "react";
import Aux from "../../../Hoc/AUX/Aux";
import Backdrop from "../Backdrop/Backdrop";
import './Modal.css'

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.show!==nextProps.show||this.props.children!==nextProps.children){
            return true
        }else {
            return false
        }
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className='Modal'
                     style={{
                         transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                         opacity: this.props.show ? '1' : '0'
                     }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;