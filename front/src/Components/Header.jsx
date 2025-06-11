import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "./images/dukaan.png";
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../features/cart/cartSlice';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';

const Header = ({ cartQuantity, favoritesQuantity }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); // State for menu visibility

  const filterProducts = () => {
    navigate(`/filterPro/${input}`);
    setInput("");
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && input !== '') {
      filterProducts();
    }
  };

  return (
    <nav className='sticky top-0 z-40 w-full py-2 px-6 flex items-center justify-between bg-[#222222]'>
      <div className='text-sm border-t-8 border-l-8'>
        <img className='w-14' src={logo} alt="Dukaan Logo" />
      </div>
      <Box sx={{ flexGrow: 1, maxWidth: '500px', ml: 4, mr: 4 }}>
        <TextField
          placeholder="Search for Products, Brands and More"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleSearch}
          fullWidth
          sx={{
            '& .MuiInputBase-root': {
              height: '35px',
              outline: 'none',
              background:"white"
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={input !== '' ? filterProducts : null}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <ul className='hidden md:flex items-center space-x-4'>
        <li>
          <button onClick={() => navigate('/')} className='px-4 py-1 rounded-full font-bold text-black bg-white'>
            Home
          </button>
        </li>
        <li className='relative'>
          <button onClick={() => navigate('/favourite')} className='px-4 py-1 rounded-full font-bold text-black bg-white'>
            <FavoriteIcon  /> Wishlist
            {favoritesQuantity > 0 && (
              <span className='absolute top-0 right-0 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs'>
                {favoritesQuantity}
              </span>
            )}
          </button>
        </li>
        <li className='relative'>
          <button onClick={() => navigate('/cart')} className='px-4 py-1 rounded-full font-bold text-black bg-white'>
            <ShoppingCartIcon /> Cart
            {cartQuantity > 0 && (
              <span className='absolute top-0 right-0 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs'>
                {cartQuantity}
              </span>
            )}
          </button>
        </li>
        <li>
          <button onClick={()=> navigate('/login')} className='px-4 py-1 rounded-full font-bold text-white bg-blue-500'>Login</button>
        </li>
           <li>
          <button onClick={()=> navigate('/signup')} className='px-4 py-1 rounded-full font-bold text-white bg-blue-500'>SignUp</button>
        </li>
      </ul>
      <div className='md:hidden'>
        <button onClick={() => setMenuOpen(!menuOpen)} className='text-white'>
          <MenuOpenIcon fontSize="large"  />
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className='fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50'>
          <button onClick={() => setMenuOpen(false)} className='w-full px-3 py-2 text-white text-lg font-bold   bg-blue-500 '>Close <CloseIcon fontSize='medium'/></button>
          <ul className='flex flex-col p-4 space-y-4'>
            <li className='relative'>
              <button onClick={() => navigate('/')} className='w-full text-left px-4 py-2 rounded-full font-bold text-white bg-black  '>
                Home
              </button>
            </li>
            <li className='relative'>
              <button onClick={() => navigate('/favourite')} className='w-full text-left px-4 py-2 rounded-full font-bold text-white bg-black'>
                <FavoriteIcon /> Wishlist
                {favoritesQuantity > 0 && (
                  <span className='absolute top-0 right-0 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs'>
                    {favoritesQuantity}
                  </span>
                )}
              </button>
            </li>
            <li className='relative'>
              <button onClick={() => navigate('/cart')} className='w-full text-left px-4 py-2 rounded-full font-bold text-white bg-black'>
                <ShoppingCartIcon /> Cart
                {cartQuantity > 0 && (
                  <span className='absolute top-0 right-0 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs'>
                    {cartQuantity}
                  </span>
                )}
              </button>
            </li>
            <li>
              <button className='w-full  mt-8  py-2 rounded-full font-bold text-white bg-red-500 text-center'>Login</button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  cartQuantity: state.cart.items.reduce((total, item) => total + item.quantity, 0),
  favoritesQuantity: state.cart.favorites.length,
});

export default connect(mapStateToProps)(Header);
