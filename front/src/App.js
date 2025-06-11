import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './Components/Home';
import About from './Components/About';
import Products from './Components/Products';
import Contact from './Components/Contact'; // Corrected import
import SingleProduct from './Components/SingleProduct';
import Cart from './Components/Cart';
import Favourites from './Components/Favourites';
import Checkout from './Components/Checkout';
import Filteredproduct from './Components/Filteredproduct';
import Singup_page from './pages/Singup_page';
import Error from './Components/Error';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import Login_page from './pages/Login_page';
import Protectedroutes from './Components/Protectedroutes';

function App() {
  const[isLoading, setIsLoading] = useState(true)
  setTimeout(()=>{
setIsLoading(false)
  },3000)
  return (
<>


    {isLoading ?

      <CircularProgress sx={{ color: 'primary', margin: '20px', position: 'absolute', top: '50%', left: '45%', transform: 'translate(-50%, -50%)' }} size={60} />
      :  <div className="App h-full">
      <Header />

<Routes>
  <Route path="/signup" element={<Singup_page />} />
        <Route path='/login' element={<Login_page/>}/>



          <Route element={<Protectedroutes/>}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="filterPro/:query" element={<Filteredproduct />} />
        <Route path="/favourite" element={<Favourites />} />
        <Route path="/checkout" element={<Checkout />} />
      
        <Route path="*" element={<Error />} />
      </Route>

      
</Routes>

    

      <Footer />
    </div>
    }
    </>
   
  );
}

export default App;
