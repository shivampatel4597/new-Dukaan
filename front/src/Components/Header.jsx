import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../features/cart/cartSlice';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Header = ({ cartQuantity, favoritesQuantity }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const filterProducts = () => {
    navigate(`/filterPro/${input}`);
    setInput("")
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && input !== '') {
      filterProducts();
    }
  };

  return (
    <nav className='sticky top-0 z-40 w-full py-3 px-6 flex items-center justify-between bg-gray-200'>
      <div className='text-xl lg:text-3xl font-bold italic'>Apni Dukaan</div>
      <Box sx={{ flexGrow: 1, maxWidth: '500px', ml: 4 , mr:4}}>
        <TextField
          placeholder="Search for Products, Brands and More"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleSearch}
          fullWidth
          sx={{
            '& .MuiInputBase-root': {
              height: '40px',
              outline: 'none',
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
          <button onClick={() => navigate('/')} className='px-4 py-1 rounded-full font-bold text-white bg-blue-500'>
            Home
          </button>
        </li>
        <li className='relative'>
          <button onClick={() => navigate('/favourite')} className='px-4 py-1 rounded-full font-bold text-white bg-blue-500'>
            Favourite
            {favoritesQuantity > 0 && (
              <span className='absolute top-0 right-0 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs'>
                {favoritesQuantity}
              </span>
            )}
          </button>
        </li>
        <li className='relative'>
          <button onClick={() => navigate('/cart')} className='px-4 py-1 rounded-full font-bold text-white bg-blue-500'>
            Cart
            {cartQuantity > 0 && (
              <span className='absolute top-0 right-0 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs'>
                {cartQuantity}
              </span>
            )}
          </button>
        </li>
        <li>
          <button className='px-4 py-1 rounded-full font-bold text-white bg-blue-500'>Login</button>
        </li>
      </ul>
      <div className='md:hidden'>
        <button className='px-4 py-1 rounded-full font-bold text-white bg-blue-500'>
          Menu
        </button>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  cartQuantity: state.cart.items.reduce((total, item) => total + item.quantity, 0),
  favoritesQuantity: state.cart.favorites.length,
});

export default connect(mapStateToProps)(Header);
