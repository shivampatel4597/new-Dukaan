import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { discountCoupons, removeFromCart, updateQuantity } from '../features/cart/cartSlice';
import { Link , Navigate, useNavigate} from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.items);
  const discount = useSelector((state) => state.cart.discount);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * 80 * item.quantity, 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [couponCode, setCouponCode] = useState('');
  const [couponSection, setCouponSection] = useState(false);
  const [coupText, setCoupText] = useState(false);

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleApplyCoupon = () => {
    dispatch(discountCoupons({ code: couponCode }));
    setCouponSection(false);
    setCoupText(true);
  };

  return (
    <div className='w-full flex flex-col md:flex-row items-start md:px-20'>

      {cartItems.length > 0 ? (
        <>
          {/* Cart Items Section */}
          <div className='w-full md:w-2/3 h-[60vh] md:h-[75vh] flex flex-col overflow-y-scroll pr-4'>

            {cartItems.map((item) => (
              <div key={item.id} className='w-full flex flex-col sm:flex-row border mb-6 p-4 bg-white shadow'>

                {/* Item Image */}
                <div className='w-20 flex-shrink-0'>
                  <img className='w-full' src={item.images ? item.images[0] : ''} alt={item.title} />
                </div>

                {/* Item Info */}
                <div className='flex-1 ml-4'>
                  <h1 className='text-md font-semibold'>{item.title}</h1>
                  <p className='text-lg mt-2'>Price: Rs {Math.floor(item.price * 80)}</p>
                  <p className='text-sm text-gray-600 mt-1'>{item.shippingInformation}</p>

                  {/* Quantity + Remove */}
                  <div className='flex items-center gap-6 mt-4'>
                    <div>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className='text-black'
                      >
                        <RemoveCircleIcon fontSize='large' />
                      </button>
                      <span className='px-4'>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className='text-black'
                      >
                        <AddCircleIcon fontSize='large' color='primary' />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className='text-sm px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition'
                    >
                      Remove
                    </button>
                  </div>
                </div>

              </div>
            ))}

          </div>

          {/* Price Details Section */}
          <div className='w-full md:w-1/3 border bg-white p-6 shadow mt-6 md:mt-0'>

            <h1 className='text-lg text-gray-700 mb-4'>PRICE DETAILS</h1>
            <hr className='mb-4' />

            <div className='flex justify-between mb-2'>
              <p>Price ({totalItems} items)</p>
              <span>Rs {Math.floor(totalPrice)}</span>
            </div>

            {/* Coupon Section */}
            <div
              onClick={() => setCouponSection(true)}
              className='mt-4 mb-2 bg-red-500 px-4 py-2 text-white text-center font-bold rounded cursor-pointer'
            >
              {couponSection ? (
                <div className='flex flex-col'>
                  <input
                    className='py-1 px-2 text-black bg-white rounded mb-2'
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className='bg-blue-500 text-white py-1 px-4 rounded'
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <p>{coupText ? 'Coupon Applied' : 'Apply coupon code'}</p>
              )}
            </div>

            <hr className='mb-4' />
            <div className='flex justify-between text-xl font-semibold mb-4'>
              <p>Total Amount</p>
              <span>Rs {Math.floor(totalPrice - totalPrice * discount)}</span>
            </div>

            <Link to='/checkout'>
              <button className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition'>
                Checkout
              </button>
            </Link>

          </div>
        </>
      ) : (
        <div className='w-full flex items-center justify-center h-[70vh] bg-gray-50'>
          <div className='flex flex-col items-center bg-gray-300 justify-center border border-gray-300 rounded-lg p-10 shadow-md'>
            {/* You can add an icon or image here */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-16 w-16 text-gray-400 mb-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 3h18v18H3V3zm3 8h12M9 16h6'
              />
            </svg>

            <h2 className='text-2xl font-semibold text-gray-700 mb-2'>Your cart is empty</h2>
            <p className='text-gray-500 text-center italic'>Looks like you haven’t added any items yet.</p>
            <Link to='/'>
              <button
                className='mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition focus:outline-none'
             onClick={()=> navigate('/')}
             >
                Start Shopping
              </button>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};

export default Cart;
