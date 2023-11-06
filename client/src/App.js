import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import Header from "./components/layout/Header/Header.js"
import Footer from "./components/layout/Header/Footer.js"
import Home from "./components/Home/Home"
import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Products/Products.js';
import LoginSignup from './components/LoginSignup.js';
import Profile from "./components/Profile/Profile.js"
import axios from 'axios';
import WebFont from "webfontloader";
import "./App.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Routes, Route, Switch} from "react-router-dom";
import store from "./store";
import {loadUser} from "./actions/userActions";
import {useSelector} from 'react-redux';
import UserMenu from "./components/layout/UserMenu.js"
import UpdateProfile from "./components/Profile/UpdateProfile.js"
import UpdatePassword from "./components/Profile/UpdatePassword.js"
import Cart from './components/Cart/Cart.js';
import Shipping from './components/Cart/Shipping.js';
import ConfirmOrder from './components/Cart/ConfirmOrder.js';
import Payment from './components/Cart/Payment.js';
import Success from './components/Cart/Success.js';
import MyOrders from './components/Orders/MyOrders.js';
import OrderDetails from './components/Orders/OrderDetails.js';
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"

function App() {
  const {isAuthenticated, user} = useSelector(state=>state.user);
  const [stripekey, setstripekey] = useState("")

  async function getStripeKey (){
    const {data} = await axios.get("/api/v1/stripekey")
    setstripekey(data.stripeKey)
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka",  'Victor Mono', 'monospace'],
      },
    });

    store.dispatch(loadUser());
    getStripeKey()
  }, []);
  return (
    <>
    
    <Router>
      {isAuthenticated && <UserMenu user = {user}/>}
      <Header />
      <Elements stripe = {loadStripe(stripekey)}>
      <Routes>
        
        <Route path="/" element = {<Home/>}/>
        <Route path="/product/:id" element = {<ProductDetails/>}/>
        <Route path="/products" element = {<Products/>}/>
        <Route exact path="/cart" element = {<Cart/>}/>
        <Route exact path="/login" element = {<LoginSignup/>}/>
        <Route path="/products/:keyword" element = {<Products/>}/>
        {isAuthenticated && <Route path="/profile" element = {<Profile/>}/>}
        {isAuthenticated && <Route path="/profile/update" element = {<UpdateProfile/>}/>}
        {isAuthenticated && <Route path="/profile/changepassword" element = {<UpdatePassword/>}/>}
        {isAuthenticated && <Route path="/shipping" element = {<Shipping/>}/>}
        {isAuthenticated && <Route path="/order/confirm" element = {<ConfirmOrder/>}/>}
        {isAuthenticated && <Route path="/order/success" element = {<Success/>}/>}
        {isAuthenticated && <Route path="/orders" element = {<MyOrders/>}/>}
        {isAuthenticated && <Route path="/order/:id" element = {<OrderDetails/>}/>}
        
        
        { isAuthenticated && <Route path="/order/payment" element = {<Payment/>}/>}
        


      
      </Routes>
      </Elements>
      <Footer />
    </Router>


    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
