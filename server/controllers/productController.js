const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const asyncError = require("../middleWare/asyncError");
const ApiFeatures = require("../utils/apifeatures")
//creating product -- ADMIN
exports.createProduct = asyncError(async (req, res, next)=>{

    req.body.user = req.user.id
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})


//see all Products -- ALL
exports.getAllProducts = asyncError(async (req, res, next) => {

    // return (next(new ErrorHandler("error is there", 500)));
    const resultPerPage = 8;
    
    const apifeatures = new ApiFeatures(Product.find(), req.query)
    .search().filter().pageination(resultPerPage);
    const products = await apifeatures.query;
    const productCount = await Product.countDocuments({});
    res.status(200).json({
        success: true,
        products,
        productCount,
    })
})


//Update Product -- ADMIN
exports.updateProduct = asyncError(async(req, res, next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found", 500))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
})

//Delete Product

exports.deleteProduct = asyncError(async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found", 404))
    }

    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"product Deleted"
    })
})

//Product Details
exports.getProductDetails = asyncError(async(req, res, next) =>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found", 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})

//Product Reviews
exports.productReviews = asyncError( async(req, res, next) => {
    const {rating, comment, productID} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productID);

    const isReviewed = product.reviews.find((rev)=> rev.user.toString() === req.user._id.toString())

    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating = rating,
                rev.comment = comment;
            }
        })
        product.numOfReviews = product.reviews.length
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let sm=0;
    product.reviews.forEach((rev)=>sm+=rev.rating);
    product.ratings = sm/product.reviews.length;

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success: true
    })
})

// All Reviews of Product
exports.getAllReviews = asyncError( async(req, res, next) => {
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("product not found", 404))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })

})


// Delete Review
exports.deleteReview = asyncError( async(req, res, next) => {
    const product = await Product.findById(req.query.productID);

    if(!product){
        return next(new ErrorHandler("product not found", 404))
    }
    // console.log(product);
    const reviews = product.reviews.filter((rev)=>
        rev._id.toString() !== req.query.id.toString()
    )

    let sm=0;
    reviews.forEach((rev)=>sm+=rev.rating);
    const ratings = sm/reviews.length;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productID, {reviews, ratings, numOfReviews},{
        new: true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success: true,

    })

})