import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const purchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios.defaults.headers.get['token'] = token
        axios.post('/order', orderData)
            .then(response => {
                dispatch(purchaseSuccess(response.data, orderData))
            })
            .catch(error => {
                dispatch(purchaseFail(error))
            });
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}


export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}


export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}


export const fetchOrders = (token) => {
    return (dispatch) => {
        dispatch(fetchOrdersStart())
        axios.defaults.headers.get['token'] = 'T123456789'
        axios.get('/orders')
            .then(res => {
                dispatch(fetchOrdersSuccess(res.data))
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err))
            })
    }
}
