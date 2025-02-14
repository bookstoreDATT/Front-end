import { combineReducers } from '@reduxjs/toolkit';
import filterSlice from './slice/filterSlice';
import authReducer from './slice/authSlice';
import cartSlice from './slice/cartSlice';

const rootReducer = combineReducers({
    filter: filterSlice.reducer,
    auth: authReducer,
    cart: cartSlice.reducer,
});

export default rootReducer;
