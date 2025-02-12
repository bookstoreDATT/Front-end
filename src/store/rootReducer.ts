import { combineReducers } from '@reduxjs/toolkit';
import filterSlice from './slice/filterSlice';

const rootReducer = combineReducers({
    filter: filterSlice.reducer,
});

export default rootReducer;
