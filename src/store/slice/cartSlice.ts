import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICart } from '~/interfaces/cart';

const initialState: ICart = {
    open: false,
    items: [],
};

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        openCart: (state) => {
            state.open = true;
        },
        closeCart: (state) => {
            state.open = false;
        },
        setCart: (state, action: PayloadAction<ICart['items']>) => {
            state.items = action.payload;
        },
    },
});

export const { closeCart, openCart, setCart } = cartSlice.actions;

export default cartSlice;
