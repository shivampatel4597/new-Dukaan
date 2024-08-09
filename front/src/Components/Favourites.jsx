// src/components/Favourites.js
import React from 'react';
import { connect } from 'react-redux';
import { removeFromFavorites } from '../features/cart/cartSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Favourites = ({ favorites, removeFromFavorites }) => {
  return (
    <div className='relative min-h-[75vh] w-full lg:px-[3rem] bg-yellow-50'>
      <h1 className='text-3xl font-bold mb-10 px-5 py-8'>Favourites</h1>
      <div className='py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 place-items-center'>
        {favorites.map(item => (
          <div
            key={item.id}
            className='bg-slate-200 flex flex-col items-center justify-center w-60 h-60 px-5 border-2 rounded-lg border-gray shadow-2xl hover:cursor-pointer'
          >
            <div className='w-full h-40 overflow-hidden  relative'>
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className='object-cover w-full h-full transition-transform transform hover:scale-105'
              />
            </div>
            <h2 className='text-sm font-semibold '>{item.title.slice(0,16 )}</h2>
            <p className='text-lg font-bold text-gray-700 '>Rs {Math.round(item.price * 80)}</p>
            <button
              onClick={() => removeFromFavorites({ id: item.id })}
              className='w-[80%] text-sm py-1  rounded text-white font-bold  bg-red-500  '
            >
              <FavoriteIcon className='mr-2 ' fontSize='small' /> Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  favorites: state.cart.favorites,
});

const mapDispatchToProps = { removeFromFavorites };

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
