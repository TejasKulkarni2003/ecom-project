import React, { useEffect } from 'react';
import "./Products.css";
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, getProduct } from '../../actions/productActions.js';
// import Loader from "../Loader/Loader";
import Product from "../Home/Product";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useParams} from "react-router-dom";

const Products = () => {
    const dispatch = useDispatch();
    const {products, loading, error, productsCount} = useSelector((state)=>state.products)

    const {keyword} = useParams(); 
    console.log(keyword);

    useEffect(() => {
        if(error){
            return toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        dispatch(getProduct(keyword))
    }, [dispatch, error, keyword])



  return (
    <>
        {loading ? (<div className='loader'></div>) : (
            <>
                <h2 className='productHeading'>Product Heading</h2>
                <div className='container'>
                    {products  &&  products.map((item)=>
                        <Product key={item._id} product={item} />
                    )}
                </div>
            </>
        )}
    </>
  )
}

export default Products