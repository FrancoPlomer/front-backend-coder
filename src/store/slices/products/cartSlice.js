import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [{
      id: 1,
      title: "coca"
    }]
  },
  reducers: {
    increment: (state) => {
      state.products = []
    }
  }
});


export const { increment } = cartSlice.actions;
