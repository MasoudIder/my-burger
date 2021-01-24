import React, {Component} from "react";
import {connect} from 'react-redux'
import Aux from '../../Hoc/AUX/Aux'
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-order'
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../Hoc/WithErrorHandler/WithErrorHandler";
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component {

    state = {
        purchasing_click: false
    }

    updatePurchasable(ingredient) {

        const sum = Object.keys(ingredient).map(
            (key) => {
                return ingredient[key]
            }).reduce((sum, el) => {
            return el + sum
        }, 0);

        return sum > 0
    }

    componentDidMount() {
        this.props.onInitIngredient()
    }

    /*
        componentDidMount() {
            console.log(this.props)
             axios.get('/ingredient')
                 .then(response => {
                     this.setState({ingredients: response.data})
                 }).catch(error => {
                 this.setState({error: true})
             })
    }

            addIngredientHandler = (type) => {
                const oldCount = this.state.ingredients[type];
                const updatedCount = oldCount + 1;
                const updatedIngredient = {...this.state.ingredients}
                updatedIngredient[type] = updatedCount;
                const priceAddition = INGREDIENT_PRICE[type];
                const oldPrice = this.state.totalPrice;
                const newPrice = oldPrice + priceAddition;
                this.setState({
                    ingredients: updatedIngredient,
                    totalPrice: newPrice
                })
                this.updatePurchasable(updatedIngredient)
            }

            removeIngredientHandler = (type) => {
                const oldCount = this.state.ingredients[type];
                if (oldCount > 0) {
                    const updatedCount = oldCount - 1;
                    const updatedIngredient = {...this.state.ingredients}
                    updatedIngredient[type] = updatedCount;
                    const priceDeduction = INGREDIENT_PRICE[type];
                    const oldPrice = this.state.totalPrice;
                    const newPrice = oldPrice - priceDeduction;
                    this.setState({
                        ingredients: updatedIngredient,
                        totalPrice: newPrice
                    })
                    this.updatePurchasable(updatedIngredient);
                }
            }
            */

    purchasingCancelHandler = () => {
        this.setState({
            purchasing_click: false
        })
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({
                purchasing_click: true
            })
        } else {
            this.props.onSetRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchasingContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }


    render() {
        const disabledInfo = {...this.props.ings}
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients cant be loaded!</p> : <Spinner/>;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    < BuildControls
                        ingredientAdd={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchasable(this.props.ings)}
                        isAuth={this.props.isAuthenticated}
                        ordered={this.purchaseHandler}
                    />
                </Aux>);
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                close={this.purchasingCancelHandler}
                continue={this.purchasingContinueHandler}
                price={this.props.price}/>
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing_click}
                    modalClosed={this.purchasingCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProp = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredient: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProp, mapDispatchToProp)(WithErrorHandler(BurgerBuilder, axios));