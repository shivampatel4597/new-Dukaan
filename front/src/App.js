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
import Registration from './Registration';
import Error from './Components/Error';
import Footer from './Components/Footer';
import Header from './Components/Header';

function App() {
  return (
    <div className="App h-full">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="filterPro/:query" element={<Filteredproduct />} />
        <Route path="/favourite" element={<Favourites />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/register" element={<Registration />} />
        <Route path="*" element={<Error />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
