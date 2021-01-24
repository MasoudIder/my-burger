import * as actionType from './actionTypes'
import axios from '../../axios-order'

export const addIngredient = (name) => {
    return {
        type: actionType.ADD_INGREDIENTS,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionType.REMOVE_INGREDIENTS,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionType.SET_INGREDIENT,
        ingredients: ingredients
    }
}

export const fetchIngredientFailed=()=>{
    return{
        type:actionType.FETCH_INGREDIENT_FAILED
    }
}

export const initIngredients = () => {
    return (dispatch) => {
        axios.get('/ingredient')
            .then(response => {
                let ingredient={
                    salad:response.data.salad,
                    bacon:response.data.bacon,
                    cheese: response.data.cheese,
                    meat: response.data.meat
                }
                dispatch(setIngredients(ingredient))
            }).catch(error => {
                dispatch(fetchIngredientFailed())
        })
    }
}

