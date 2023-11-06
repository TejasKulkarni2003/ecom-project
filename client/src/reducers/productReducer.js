import {ALL_PROD_FAIL, ALL_PROD_REQUEST, ALL_PROD_SUCCESS,
         PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
         NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_RESET, NEW_REVIEW_FAIL,
         ClearErrors} from '../constants/productConstants';


         
export const productReducer = (state={products: []}, action)=>{
    switch (action.type) {
        case ALL_PROD_SUCCESS:
            return{
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProducts: action.payload.filteredProducts,
            };
        case ALL_PROD_REQUEST:
            return{
                loading: true,
                products: [],
            };
        case ALL_PROD_FAIL:
            return{
                loading: false,
                error: action.payload,
            };
        case ClearErrors:
            return{
                ...state,
                error: null,
            };    
        default:
            return state;
    }
}



export const productDetailsReducer = (state={product: {}}, action)=>{
    switch (action.type) {
        
        case PRODUCT_DETAILS_REQUEST:
            return{
                loading: true,
                ...state,
            };
        case PRODUCT_DETAILS_SUCCESS:
                return{
                    loading: false,
                    product: action.payload,
                };
        case PRODUCT_DETAILS_FAIL:
            return{
                loading: false,
                error: action.payload,
            };
        case ClearErrors:
            return{
                ...state,
                error: null,
            };    
        default:
            return state;
    }
}
export const newReviewReducer = (state={}, action)=>{
        switch (action.type) {
            
            case NEW_REVIEW_REQUEST:
                return{
                    loading: true,
                    ...state,
                };
            case NEW_REVIEW_SUCCESS:
                    return{
                        loading: false,
                        success: action.payload,
                    };
            case NEW_REVIEW_RESET:
                return{
                    ...state,
                    success: false,
                };
            case NEW_REVIEW_FAIL:
                return{
                    ...state,
                    loading: false,
                    error: action.payload,
                };
            case ClearErrors:
                return{
                    ...state,
                    error: null,
                };    
            default:
                return state;
        }
    
}