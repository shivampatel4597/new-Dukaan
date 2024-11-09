// src/components/SingleProduct.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import Hoc from './Hoc';

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { arr: "", index: "", i: 0 };
  }

  componentDidMount() {
    const { id } = this.props.router.params;
    this.callingApi(id);
  }

  callingApi = (id) => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network request problem");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ arr: data });
      })
      .catch((error) => {
        console.log("error is", error);
      });
  }

  handleAddToCart = () => {
    const { arr } = this.state;
    this.props.addToCart(arr);
    const { navigate } = this.props.router;
    navigate('/cart');
  }

  render() {
    const { arr } = this.state;

    return (
      <div className='w-full flex items-center justify-center bg-gray-100 p-2'>
        <div className='w-full lg:w-[80%] flex flex-col md:flex-row lg:flex-row items-center lg:items-start justify-center h-full bg-white p-4 lg:p-0'>
          <div className='w-full  lg:w-[35%] mb-4 lg:mb-0 '>
            <img src={arr.images ? arr.images[0] : ""} className='w-full mb-7 p-3 bg-green-300' alt={arr.title} />
            <div className='flex flex-col sm:flex-row justify-center'>
              <button
                onClick={this.handleAddToCart}
                className='w-full sm:w-48 h-14 text-xl py-1 mx-1 my-2 bg-yellow-500 text-white'
              >
                ADD TO CART
              </button>
              <button className='w-full sm:w-48 h-14 text-xl py-1 mx-1 my-2 bg-orange-500 text-white'>
                BUY NOW
              </button>
            </div>
          </div>
          <div className='w-full lg:w-[65%] px-3 lg:px-6 py-4'>
            <h1 className='text-lg lg:text-xl text-start'>{arr.title}</h1>
            <p className='text-red-500 text-md lg:text-lg text-start'>{arr.category}</p>
            <div className='mt-3 text-start w-full'>
              <span className='px-2 lg:px-3 mt-2 bg-green-400'>{arr.rating}</span>
              <p className='text-green-400 mt-2'>Special price</p>
              <span className='text-lg lg:text-2xl font-bold'>Rs {Math.round(arr.price * 80)}</span>
              <span className='px-4 lg:px-6 text-green-400'>{arr.discountPercentage}% off</span>
            </div>
            <div className='mt-4 lg:mt-6 flex flex-col items-start'>
              <h1 className='text-lg lg:text-2xl text-start'>Product Description</h1>
              <p className='mt-3 text-start w-full lg:w-[80%]'>{arr.description}</p>
              <p className='mt-3 text-gray-500 text-start text-md lg:text-lg w-full lg:w-[60%]'>Warranty {arr.warrantyInformation}</p>
              <p className='mt-3 text-md lg:text-xl text-start w-full lg:w-[60%]'>{arr.availabilityStatus}</p>
              <p className='mt-3 text-gray-600 text-start w-full lg:w-[60%]'>{arr.returnPolicy}</p>
            </div>
            {arr.dimensions && (
              <div className='mt-4 lg:mt-6 flex flex-col items-start'>
                <h1 className='text-lg lg:text-2xl text-start'>Specifications</h1>
                <p className='mt-3 text-md lg:text-lg text-gray-600 text-start w-full lg:w-[60%]'>Width: {arr.dimensions.width}</p>
                <p className='mt-3 text-md lg:text-lg text-gray-600 text-start w-full lg:w-[60%]'>Height: {arr.dimensions.height}</p>
                <p className='mt-3 text-md lg:text-lg text-gray-600 text-start w-full lg:w-[60%]'>Depth: {arr.dimensions.depth}</p>
              </div>
            )}
            <h1 className='mt-6 lg:mt-10 text-lg lg:text-2xl text-start'>Rating & Reviews</h1>
            {arr.reviews && arr.reviews.map((item, index) => (
              <div key={index} className='mt-2 flex flex-col items-start'>
                <p className='mt-3 text-md lg:text-lg text-green-500 text-start w-full lg:w-[60%]'>Rating: {item.rating}</p>
                <p className='mt-3 text-md lg:text-lg text-start w-full lg:w-[60%]'>Comment: {item.comment}</p>
                <p className='mt-3 text-md lg:text-lg text-gray-600 text-start w-full lg:w-[60%]'>Name: {item.reviewerName}</p>
                <p className='mt-3 text-md lg:text-lg text-gray-600 text-start w-full lg:w-[60%]'>Date: {item.date}</p>
                <p className='mt-3 text-md lg:text-lg text-gray-600 text-start w-full lg:w-[60%]'>Email: {item.reviewerEmail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = { addToCart };

export default connect(null, mapDispatchToProps)(Hoc(SingleProduct));
