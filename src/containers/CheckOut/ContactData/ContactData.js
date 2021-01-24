import React, {Component} from "react";
import axios from './../../../axios-order'
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import './ContactData.css'
import {connect} from 'react-redux'
import WithErrorHandler from "../../../Hoc/WithErrorHandler/WithErrorHandler";
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
    state = {
        orderForm: {
            customer: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Phone'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 11
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fast', displayValue: 'Fast'},
                        {value: 'cheap', displayValue: 'Cheap'}
                    ]
                },
                validation: {},
                value: 'fast',
                valid: true
            }
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        //alert('Continue!')

        const formData = {};

        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ...this.props.ingredients,
            ...formData,
            price: this.props.price
        }

        this.props.onOrderBuild(order, this.props.token);
    }

    validationCheck(value, rules) {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid
    }

    inputChangeHandler = (event, inputId) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedElement = {
            ...updatedOrderForm[inputId]
        };

        updatedElement.value = event.target.value;
        updatedElement.valid = this.validationCheck(updatedElement.value, updatedElement.validation)
        updatedElement.touched = true;
        updatedOrderForm[inputId] = updatedElement;

        let formIsValid = true

        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState(
            {orderForm: updatedOrderForm, formIsValid: formIsValid}
        )
    }

    render() {

        let formElements = [];

        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(
                    element => (
                        <Input
                            key={element.id}
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            invalid={!element.config.valid}
                            shouldValidate={element.config.validation}
                            touched={element.config.touched}
                            changed={(event) => this.inputChangeHandler(event, element.id)}/>
                    )
                )}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner/>
        }

        return (
            <div className="ContactData">
                <h4>Enter Your Information:</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBuild: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));