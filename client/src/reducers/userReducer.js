import {USER_LOGIN_REQUEST, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS,
    USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST,
    LOAD_SUCCESS, LOAD_FAIL, LOAD_REQUEST,
    LOGOUT_SUCCESS, LOGOUT_FAIL,
    ClearErrors} from "../constants/userConstants"

export const userReducer = (state = {user: {}}, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
        case LOAD_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };

        case USER_LOGIN_SUCCESS:
        case LOAD_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case USER_REGISTER_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case USER_LOGIN_FAIL:
        case USER_REGISTER_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };

        case LOAD_FAIL:
            return{
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            }
        case LOGOUT_SUCCESS:
            return{
                loading: false,
                isAuthenticated: false,
                user:null,
            }
        case LOGOUT_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }

        case ClearErrors:
            return{
                ...state,
                error: null,
            };
        default:
            return state;
    }
}