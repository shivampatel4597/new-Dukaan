
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  favorites: [],
  coupons:[{code:"FLAT50", discount:50/100}, {code:"FLAT20", discount:20/100}, {code:"FLAT10", discount:10/100}],
  discount:"",
  searchTerm: ""
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    setSearchTerm: (state, action) => 
      { state.searchTerm = action.payload },
    addToCart: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    addToFavorites: (state, action) => {
      const favorite = state.favorites.find(item => item.id === action.payload.id);
      if (!favorite) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(item => item.id !== action.payload.id);
    },
    discountCoupons : (state, action) =>{
      const getDiscount = state.coupons.find(coup => coup.code === action.payload.code)
    if(getDiscount){
      state.discount = getDiscount.discount
      console.log( state.discount)
    }
    else{
      console.log("not get anything")
    }
    }
  },
});

export const {setSearchTerm, addToCart, removeFromCart, updateQuantity, addToFavorites, removeFromFavorites, discountCoupons } = cartSlice.actions;

export default cartSlice.reducer;
