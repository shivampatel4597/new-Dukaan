import { configureStore } from '@reduxjs/toolkit';
 
import cartReducer from '../features/cart/cartSlice'; // Ensure the path is correct
import authReducer from '../features/cart/authSlice'
const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth : authReducer
  },
});

export default store;
