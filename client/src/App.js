import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import Header from "./components/layout/Header/Header.js"
import Footer from "./components/layout/Header/Footer.js"
import Home from "./components/Home/Home"
import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Products/Products.js';
import LoginSignup from './components/LoginSignup.js';
import Profile from "./components/Profile/Profile.js"

import WebFont from "webfontloader";
import "./App.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import store from "./store";
import {loadUser} from "./actions/userActions";
import {useSelector} from 'react-redux';
import UserMenu from "./components/layout/UserMenu.js"

function App() {
  const {isAuthenticated, user} = useSelector(state=>state.user);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka",  'Victor Mono', 'monospace'],
      },
    });

    store.dispatch(loadUser());
  }, []);
  return (
    <>
    
    <Router>
      {isAuthenticated && <UserMenu user = {user}/>}
      <Header />
      
      <Routes>
        
        <Route path="/" element = {<Home/>}/>
        <Route path="/product/:id" element = {<ProductDetails/>}/>
        <Route path="/products" element = {<Products/>}/>
        <Route exact path="/login" element = {<LoginSignup/>}/>
        <Route path="/products/:keyword" element = {<Products/>}/>
        <Route path="/profile" element = {<Profile/>}/>


      
      </Routes>
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
