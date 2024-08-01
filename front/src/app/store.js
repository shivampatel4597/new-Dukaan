import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice'; // Ensure the path is correct

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
