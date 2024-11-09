import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};

export default class Fragrances extends Component {
constructor(props){
  super(props)
  
}
  render() {
    const { products, Viewpage, handleAddToCart, toggleFavorite, favorites } = this.props; // Destructure props
     console.log(products);
    return (
      <div className='sm:w-[92%] p-2 mt-3 mx-auto flex flex-col border-2 border-gray-200 bg-white'>
        <h1 className='text-left my-3 text-md font-bold'>Fragrances Products</h1>
        <Carousel responsive={responsive}>
          {products && products.filter(item => item.category.toLowerCase().includes('fragrances')).map((item) => (
            <div
              key={item.id}
              className='bg-white flex flex-col items-center justify-center mx-2 w-30 h-55 sm:w-60 sm:h-60 px-5 border-2 rounded-lg border-gray shadow-2xl hover:cursor-pointer'
            >
              <button
                onClick={() => toggleFavorite(item)}
                className='w-full text-start text-slate-400'
              >
                {/* Uncomment and import FavoriteIcon if needed */}
                <FavoriteIcon color={favorites && favorites.some(fav => fav.id === item.id) ? 'error' : 'inherit'} />
              </button>
              <img
                onClick={() => Viewpage(item.id)}
                className='w-full h-[40%] hover:scale-[1.1] hover:translate-x-1 hover:translate-y-1'
                src={item.thumbnail}
                alt={item.title}
              />
              <p className='italic'>{item.title.slice(0, 16)}</p>
              <p className='font-bold'>Rs {Math.round(item.price * 80)}</p>
              <button
                onClick={() => handleAddToCart(item)}
                className='w-[80%] text-sm py-1 my-2 rounded text-white font-bold bg-red-500'
              >
                ADD CART
              </button>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}
