import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../auth/slice/slice';
import { fertilizerSlice } from '../productsDisplay/slice/slice';
import { getUserSlice } from '../user_account/slice/slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    fertilizer:fertilizerSlice.reducer,
    UserDetails:getUserSlice.reducer,
  },
});

export default store;
