import axios from "axios";
import { ALL_PROD_FAIL, ALL_PROD_REQUEST, ALL_PROD_SUCCESS,
         PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
         ClearErrors } from "../constants/productConstants";


export const getProduct = (keyword="") => async (dispatch) =>{
    try {
        dispatch({
            type: ALL_PROD_REQUEST,
        })

        const {data} = await axios.get(`/api/v1/products?keyword=${keyword}`);
        console.log(data);
        dispatch({
            type: ALL_PROD_SUCCESS,
            payload: data,
        })
        
    } catch (err) {
        dispatch({
            type: ALL_PROD_FAIL,
            payload: err.response.data.message,
        })
    }
}


export const getProductDetails = (id) => async (dispatch) =>{
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST,
        })

        const {data} = await axios.get(`/api/v1/product/${id}`);
        // console.log("data " + data);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
          });
        
    } catch (err) {
        // console.log(err);
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: err.response.data.message,
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({type: ClearErrors})
}