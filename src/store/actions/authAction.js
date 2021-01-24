import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: 'Masoud_Ider'
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(
            () => {
                dispatch(logout())
            }
            , expirationTime
        )
    }
}

export const auth = (email, password, isSignUp) => {

    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        }
        let url = '/auth';
        if (isSignUp) {
            url = '/sign-up'
        }
        axios.post(url, authData)
            .then(
                response => {
                    if (!response.data) {
                        dispatch(authFail("User Is NOT Valid"))
                    } else {
                        const expirationDate = new Date(new Date().getTime() + 3600000);
                        localStorage.setItem('token', response.data);
                        localStorage.setItem('expirationDate', expirationDate);

                        dispatch(authSuccess(response.data))
                        dispatch(checkAuthTimeout(3600000))
                    }
                }
            )
            .catch(
                error => dispatch(authFail(error))
            )
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            const expirationTime = new Date(localStorage.getItem('expirationDate'))
            if (expirationTime <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}