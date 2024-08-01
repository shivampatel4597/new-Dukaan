import React, { Component } from 'react';
import { connect } from 'react-redux';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: '',
        email: '',
        address: '',
        phone: '',
      },
    };
  }

  handleChange = (e) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Process form data, e.g., submit to backend or handle further actions
    console.log(this.state.formData);
  };

  render() {
    const { cartItems, totalPrice, totalItems, discount } = this.props;
    const { formData } = this.state;

    return (
      <div className="flex flex-col items-center mt-8">
        <div className="w-[60%] border-2 bg-white">
          <h1 className="text-start text-lg text-gray-500 px-10 py-4">PRICE DETAILS products</h1>
          <hr />
          <div className="mt-6 px-10 flex items-center justify-between">
            <p className="text-lg font-md">Discounted Price ({totalItems} items)</p>
            <span className="text-lg font-md">Rs {Math.floor((totalPrice * 80) - (totalPrice * 80 * discount))}</span>
          </div>
        
          <div className="mt-6 mb-6 px-10 flex items-center justify-between">
            <p className="text-lg font-md">Delivery charges</p>
            <span className="text-lg font-md">Rs 50</span>
          </div>
          <hr />
          <div className="mt-6 mb-6 px-10 flex items-center justify-between">
            <p className="text-2xl font-md">Total Amount</p>
            <span className="text-2xl font-md">Rs {Math.floor((totalPrice * 80) - (totalPrice * 80 * discount) + 50)}</span>
          </div>
        </div>

        <div className="w-[50%] mt-8">
          <form onSubmit={this.handleSubmit} className="border-2 bg-white p-8">
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={this.handleChange}
              placeholder="Name"
              className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={this.handleChange}
              placeholder="Email"
              className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={this.handleChange}
              placeholder="Address"
              className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={this.handleChange}
              placeholder="Phone"
              className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const cartItems = state.cart.items;
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const discount = state.cart.discount;

  return {
    cartItems,
    totalPrice,
    totalItems,
    discount
  };
};

export default connect(mapStateToProps)(Checkout);
