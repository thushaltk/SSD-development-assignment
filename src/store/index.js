import { configureStore } from '@reduxjs/toolkit'
import accessTokenReducer from '../slices/accessTokenSlice';

export const store = configureStore({
  reducer: {
    accessToken: accessTokenReducer
  },
});