// src/redux/slices/yourSlice.js
import { createSlice } from '@reduxjs/toolkit';

const yourSlice = createSlice({
  name: 'yourSliceName', // Give a name to your slice
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = yourSlice.actions;
export default yourSlice.reducer;
