// src/components/Home.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, addToFavorites, removeFromFavorites, searchTerm } from '../features/cart/cartSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CircularProgress, Typography } from '@mui/material';
import Hoc from './Hoc';

class Filteredprodcut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      keywords: ['title', 'description', 'category'],
      searchWord: "",
     
      isLoading: null,
    };
  }

  componentDidMount() {
    this.callApi();
  this.searching()


  }

  searching = ()=>{
    const {params}  = this.props.router;
 this.setState({searchWord:params.query}, ()=>{
    console.log(this.state.searchWord)
 })
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
    
    }
  };

  filteredItem = () => this.state.arr.filter(item => this.state.keywords.some(key => item[key].toLowerCase().includes(this.state.searchWord.toLowerCase())))


  render() {
    const { arr, value } = this.state;
    const { favorites, searchTerm } = this.props;

    return (

      <div className='relative px-40 h-full w-full'>

      



        <div className=' py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center '>
          {this.filteredItem().length === 0 ? <Typography >
            No items matched your search
          </Typography> : this.filteredItem().map((item) => (
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

export default connect(mapStateToProps, mapDispatchToProps)(Hoc(Filteredprodcut));
