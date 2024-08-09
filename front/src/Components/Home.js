// src/components/Home.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import img1 from "./images/img1.jpg"
import img2 from "./images/img2.jpg"
import img3 from "./images/img3.jpg"

import { addToCart, addToFavorites, removeFromFavorites, searchTerm } from '../features/cart/cartSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CircularProgress, Typography } from '@mui/material';
import Hoc from './Hoc';
import Carousal from './Carousal';



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      keywords: ['title', 'description', 'category'],
      images: "",
      value: "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/e1c77383c5405c7c.jpg?q=20",
      sliderImg: [
       img1, img2, img3,
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
    // const { navigate } = this.props.router;
    // navigate('/cart');
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
    const { arr, sliderImg } = this.state;
    const { favorites } = this.props;

    return (

      <div className='relative min-h-[100vh] w-full lg:px-[3rem]'>
       
        {/* <section>
          <div className='px-5 py-5 mt-4 w-full h-auto bg-slate-300 hover:cursor-pointer'>
            <img className='w-full rounded-md' src={value} alt="Slider" />
          </div>
        </section> */}
 
<Carousal sliderImg={sliderImg}/>


        <div className=' py-8 mt-5 grid grid-cols- md:grid-cols-2 lg:grid-cols-3 gap-7 place-items-center bg-blue-400 '>
          { arr.map((item) => (
            <div key={item.id} className='bg-slate-200 flex flex-col items-center justify-center w-60 h-60 px-5 border-2 rounded-lg border-gray shadow-2xl hover:cursor-pointer'>
              <button
                onClick={() => this.toggleFavorite(item)}
                className='w-full text-start text-slate-400'
              >
                <FavoriteIcon color={favorites.some(fav => fav.id === item.id) ? 'error' : 'inherit'} />
              </button>
              <img
                onClick={() => this.Viewpage(item.id)}
                className='w-full h-[40%]  hover:scale-[1.1] hover:translate-x-1 hover:translate-y-1'
                src={item.thumbnail}
                alt={item.title}
              />
              <p className='italic'>{item.title.slice(0,16 )}</p>
              <p className='font-bold'>Rs {Math.round(item.price * 80)}</p>
              <button
                onClick={() => this.handleAddToCart(item)}
                className='w-[80%] text-sm py-1 my-2  rounded text-white font-bold  bg-red-500  '
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
