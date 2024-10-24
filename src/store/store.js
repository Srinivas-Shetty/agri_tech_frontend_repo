// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import yourReducer from './slices/yourSlice'; // replace this with your actual slice

const store = configureStore({
  reducer: {
    yourReducerName: yourReducer, // replace with your slice's name
  },
});

export default store;
