import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Shimmer_card from '../Shimmer_card';

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 2 }
};

const Beauty = ({ products, Viewpage, handleAddToCart, toggleFavorite, favorites }) => {
  // Check if products are loading
  const isLoading = !products || products.length === 0;

  // Create an array to render shimmer cards (how many placeholders you want)
  const shimmerCount = 4;
  const shimmerArray = Array(shimmerCount).fill(0);

  return (
    <div className="sm:w-[92%] p-2 mt-3 mx-auto flex flex-col border-2 border-gray-200 bg-white">
      <h1 className="text-left my-3 text-md font-bold">Beauty Products</h1>
      <Carousel responsive={responsive}>
        {isLoading
          ? shimmerArray.map((_, idx) => <Shimmer_card key={idx} />)
          : products
              .filter((item) => item.category.toLowerCase().includes('beauty'))
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-white flex flex-col items-center justify-center mx-2 w-30 h-55 sm:w-60 sm:h-60 px-5 border-2 rounded-lg border-gray shadow-2xl hover:cursor-pointer"
                >
                  <button onClick={() => toggleFavorite(item)} className="w-full text-start text-slate-400">
                    <FavoriteIcon
                      color={favorites && favorites.some((fav) => fav.id === item.id) ? 'error' : 'inherit'}
                    />
                  </button>
                  <img
                    onClick={() => Viewpage(item.id)}
                    className="w-full h-[40%] hover:scale-[1.1] hover:translate-x-1 hover:translate-y-1"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                  <p className="italic">{item.title.slice(0, 16)}</p>
                  <p className="font-bold">Rs {Math.round(item.price * 80)}</p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-[80%] text-sm py-1 my-2 rounded text-white font-bold bg-red-500"
                  >
                    ADD CART
                  </button>
                </div>
              ))}
      </Carousel>
    </div>
  );
};

export default Beauty;
