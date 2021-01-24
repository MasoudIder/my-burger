import React, {Component} from "react";
import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import {Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import ContactData from "./ContactData/ContactData";

class CheckOut extends Component {
    /*
        state = {
            ingredients: {
                salad: 1,
                meat: 1,
                cheese: 1,
                bacon: 1
            },
            totalPrice: 0
        }
    /*
        componentDidMount() {

            const query = new URLSearchParams(this.props.location.search);
            let ingredients = {};
            let price = 0;
            for (let param of query.entries()) {
                if (param[0] === 'price') {
                    price = param[1];
                } else {
                    ingredients[param[0]] = +param[1];
                }
            }

            this.setState(
                {
                    ingredients: ingredients,
                    totalPrice: price
                }
            )
        }
    */

    checkOutCancelled = () => {
        this.props.history.goBack();
    }

    checkOutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to='/'/>
        if (this.props.ingredients) {
            const purchaseRedirect = this.props.purchased ? <Redirect to='/'/> : null
            summary =
                <div>
                    {purchaseRedirect}
                    <CheckOutSummary
                        ingredients={this.props.ingredients}
                        checkOutCancelled={this.checkOutCancelled}
                        checkOutContinued={this.checkOutContinued}/>
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}/>
                </div>
        }
        return summary;
    }

}

const mapStateToProp = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProp)(withRouter(CheckOut));