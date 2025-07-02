
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import $ from 'jquery';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Services from './components/Services';

import Rail from './components/Rail';

import Transfer from './components/Transfer';
import React, { Suspense, lazy } from 'react';
import ScrollToTop from './components/ScrollToTop';

const About = lazy(() => import('./components/About'));
const Package = lazy(() => import('./components/Package'));
const Contact = lazy(() => import('./components/Contact'));
function App() {
  

  return (
    <>
      <BrowserRouter>
      <Header />
      <ScrollToTop />
     <Suspense fallback={<div>Loading...</div>}>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/package" element={<Package />} />
        <Route path="/rail" element={<Rail />} />
      
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/contact" element={<Contact />} />
        
        
      </Routes>
     </Suspense>
     
     <Footer/>
    </BrowserRouter>


    </>
  )
}

export default App
