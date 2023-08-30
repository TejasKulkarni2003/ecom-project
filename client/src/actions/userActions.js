import {USER_LOGIN_REQUEST, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS,
    USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST,
    LOAD_SUCCESS, LOAD_FAIL, LOAD_REQUEST,
    LOGOUT_SUCCESS, LOGOUT_FAIL,
    ClearErrors} from "../constants/userConstants"
import axios from "axios";

export const login = (email, password) => async (dispatch) =>{
    try {
        dispatch({type: USER_LOGIN_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}};

        const {data} = await axios.post(
            '/api/v1/loginuser',
            {email, password},
            config
        )

        dispatch({type: USER_LOGIN_SUCCESS, payload: data.user});

    } catch (error) {
        dispatch({type: USER_LOGIN_FAIL, payload: error.response.data.message})
    }
}

export const register = (userData) => async (dispatch) =>{
    try {
        dispatch({type: USER_REGISTER_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}};

        const {data} = await axios.post(
            '/api/v1/register',
            userData,
            config
        )

        dispatch({type: USER_REGISTER_SUCCESS, payload: data.user});

    } catch (error) {
        dispatch({type: USER_REGISTER_FAIL, payload: error.response.data.message})
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({type: LOAD_REQUEST});

        const {data} = await axios.get(
            '/api/v1/profile'
        )

        dispatch({type: LOAD_SUCCESS, payload: data.user});

    } catch (error) {
        dispatch({type: LOAD_FAIL, payload: error.response.data.message})
    }
}

export const logout = () => async(dispatch) => {
    try {
        await axios.get('api/v1/logout')
        dispatch({type: LOGOUT_SUCCESS})

    } catch (error) {
        dispatch({type: LOGOUT_FAIL, payload: error.response.data.message})
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({type: ClearErrors})
}