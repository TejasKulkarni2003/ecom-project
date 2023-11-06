import React, {useEffect, useState} from 'react';
import './ProductDetails.css';
import {useSelector, useDispatch} from 'react-redux'
import { getProductDetails } from '../../actions/productActions';
import {useParams} from 'react-router-dom'
import { Box, Image, Heading, Stack, HStack, Button, Input } from '@chakra-ui/react'
import {Carousel} from 'react-responsive-carousel'
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import {addToCart} from "../../actions/cartActions"
import { toast } from 'react-toastify';

const ProductDetails = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
      );
    // console.log(/);
    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id])

    const options = {
        edit: false,
        color: "grey",
        activeColor: "tomato",
        value: product.ratings,
        isHalf: true,
        size: window.innerWidth<600? 15 : 20,
    }

    const [quantity, setQuantity] = useState(1);
     const increaseQuantity = () => {
      if(product.Stock <= quantity){
        return;
      }
      setQuantity(quantity+1);
     }

     const decreaseQuantity = () => {
      if(quantity <= 1){
        return;
      }
      setQuantity(quantity-1);
     }

     const addToCartHandler = () => {
      dispatch(addToCart(id, quantity));
      toast.success("Item Added To Cart", {
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

  return (
    <>
    {loading? (<div className='loader'></div>):(
        <>
        <Stack direction={['column', 'row']} className='product_stack'>
        <Box>
            <Carousel className='carouselImages' showThumbs={false} showIndicators={false} showArrows={false} showStatus={false}>
                {product.images &&
                    product.images.map((item, i) => (
                        <img
                        className="CarouselImage"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                        />
                    ))}

            </Carousel>
        </Box>
        <Box className='productDetailsBox'>
            <Heading >{product.name}</Heading>
            <h4>{`Product- #${id}`}</h4>
            <h1>{`$${product.price}`}</h1>
            <Box>
                <ReactStars {...options}/> <span style={{lineHeight: '0px'}}>{product.numOfReviews} Reviews</span>
            </Box>
            <HStack >
                <HStack padding= {'0.5rem 0 0.2rem 0'} gap={'0'} alignItems={'center'}>
                <Button borderRadius={'0.8rem 0 0 0.8rem'} fontSize= "1.2rem" onClick={decreaseQuantity}>-</Button>
                <Input readOnly value={quantity} type='number' w={'4rem'} borderRadius={'0'} textAlign={'center'}></Input>
                <Button borderRadius={'0 0.8rem 0.8rem 0'} fontSize= "1.2rem" onClick={increaseQuantity}>+</Button>
                </HStack>
                <Button fontSize= "0.7rem" padding="0.1rem 1rem" backgroundColor={'#635dc0'} disabled={product.Stock < 1 ? true: false} onClick={addToCartHandler}>Add to Cart</Button>
            </HStack> 
            <p style={{lineHeight:'2rem', fontWeight: '800', borderBottom:'1px solid', borderTop:'1px solid', textAlign: 'center', margin:'0.8rem 0'}}>
                Status:
                <b className={product.Stock < 1 ? "redColor" : "greenColor"} style={{fontWeight: '900'}} >
                {product.Stock < 1 ? " OutOfStock" : " InStock"}
                </b>
            </p>
            
            <p >{`Description : ${product.description}`}</p>
            <Button fontSize= "0.7rem" padding="0.1rem 1rem" backgroundColor={'#635dc0'} top={'1rem'} >Submit Reviews</Button>
        </Box>
        
        </Stack>

        {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
    )}
        
    </>
  )
}

export default ProductDetails