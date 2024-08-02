// src/components/Home.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, addToFavorites, removeFromFavorites, searchTerm } from '../features/cart/cartSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CircularProgress, Typography } from '@mui/material';
import Hoc from './Hoc';
import SwipeableTextMobileStepper from './Carousal';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      keywords: ['title', 'description', 'category'],
      images: "",
      value: "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/e1c77383c5405c7c.jpg?q=20",
      sliderImg: [
        "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/77e402bbfdae0e68.jpg?q=20",
        "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/9384b37a848c5e60.jpg?q=20",
        "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/bf42fbdd3d37c8c3.jpg?q=20",
        "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/e1c77383c5405c7c.jpg?q=20",
      ],
      isLoading: null,
    };
  }

  componentDidMount() {
    this.callApi();
    // this.callSlider();
  }

  callApi = () => {
    this.setState({ isLoading: true })
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {

        this.setState({ arr: data.products });
        this.setState({ isLoading: false })

      })
      .catch((error) => {
        console.error("error is", error);
      });
  };

  // callSlider = () => {
  //   let i = 0;
  //   setInterval(() => {
  //     if (i < this.state.sliderImg.length) {
  //       this.setState({ value: this.state.sliderImg[i] });
  //       i++;
  //     } else {
  //       i = 0;
  //     }
  //   }, 4000);
  // };

  handleAddToCart = (product) => {
    this.props.addToCart(product);
    const { navigate } = this.props.router;
    navigate('/cart');
  };

  Viewpage = (itemId) => {
    const { navigate } = this.props.router;
    navigate(`/singleproduct/${itemId}`);
  };

  toggleFavorite = (product) => {
    if (this.props.favorites.some(fav => fav.id === product.id)) {
      this.props.removeFromFavorites({ id: product.id });
    } else {
      this.props.addToFavorites(product);
      const { navigate } = this.props.router;
      // navigate('/favourite')
    }
  };

 

  render() {
    const { arr, value } = this.state;
    const { favorites } = this.props;

    return (

      <div className='relative h-full w-full px-[3rem]'>
       
        {/* <section>
          <div className='px-5 py-5 mt-4 w-full h-auto bg-slate-300 hover:cursor-pointer'>
            <img className='w-full rounded-md' src={value} alt="Slider" />
          </div>
        </section> */}
        <SwipeableTextMobileStepper/>



        <div className=' py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center '>
          { arr.map((item) => (
            <div key={item.id} className='flex flex-col items-center justify-center w-80 h-80 px-5 border-2 rounded-lg border-gray shadow-2xl hover:cursor-pointer'>
              <button
                onClick={() => this.toggleFavorite(item)}
                className='w-full text-start'
              >
                <FavoriteIcon color={favorites.some(fav => fav.id === item.id) ? 'error' : 'inherit'} />
              </button>
              <img
                onClick={() => this.Viewpage(item.id)}
                className='w-full h-[60%]  hover:scale-[1.1] hover:translate-x-1 hover:translate-y-1'
                src={item.thumbnail}
                alt={item.title}
              />
              <p>{item.title}</p>
              <p className='font-bold'>Rs {Math.round(item.price * 80)}</p>
              <button
                onClick={() => this.handleAddToCart(item)}
                className='w-[80%] py-1 my-2 border-2 rounded text-black border-black '
              >
                ADD TO CART
              </button>
            </div>
          ))}
        </div>

        {this.state.isLoading ?

          <CircularProgress sx={{ color: 'white', margin: '20px', position: 'absolute', top: '50%', left: '45%', transform: 'translate(-50%, -50%)' }} size={60} />
          : ''
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  favorites: state.cart.favorites,
  searchTerm: state.cart.searchTerm
});

const mapDispatchToProps = { addToCart, addToFavorites, removeFromFavorites };

export default connect(mapStateToProps, mapDispatchToProps)(Hoc(Home));
