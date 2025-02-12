import { combineReducers } from '@reduxjs/toolkit';
import filterSlice from './slice/filterSlice';
import authReducer from './slice/authSlice';

const rootReducer = combineReducers({
    filter: filterSlice.reducer,
    auth: authReducer,
});

export default rootReducer;
