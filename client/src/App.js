import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import Header from "./components/layout/Header/Header.js"
import Footer from "./components/layout/Header/Footer.js"
import Home from "./components/Home/Home"
import WebFont from "webfontloader";
import "./App.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Products/Products.js';


function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka",  'Victor Mono', 'monospace'],
      },
    });
  }, []);
  return (
    <>
    <Router>
      <Header />
      <Routes>
      
        <Route path="/" element = {<Home/>}/>
        <Route path="/product/:id" element = {<ProductDetails/>}/>
        <Route path="/products" element = {<Products/>}/>
        <Route path="/products" element = {<Products/>}/>
        <Route path="/products/:keyword" element = {<Products/>}/>


      
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
