// src/components/Favourites.js
import React from 'react';
import { connect } from 'react-redux';
import { removeFromFavorites } from '../features/cart/cartSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Favourites = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="container h-[75vh] mx-auto p-5">
      <h1 className="text-3xl font-bold mb-10">Favourites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {favorites.map(item => (
          <div
            key={item.id}
            className="favorite-item p-5 border rounded-lg shadow-lg flex flex-col items-center bg-white transform transition-transform hover:scale-105"
          >
            <img src={item.thumbnail} alt={item.title} className="w-full  h-[12rem] mb-4" />
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-lg font-bold text-gray-700 mb-4">Rs {Math.round(item.price * 80)}</p>
            <button
              onClick={() => removeFromFavorites({ id: item.id })}
              className="w-full py-2 bg-red-500 text-white rounded-md flex items-center justify-center hover:bg-red-600"
            >
              <FavoriteIcon className="mr-2" /> Remove from Favorites
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
