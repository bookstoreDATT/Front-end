import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICart } from '~/interfaces/cart';

const initialState: ICart = {
    open: false,
    items: [],
    quantityInCart: 0,
};

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        openCart: (state) => {
            state.open = true;
        },
        setQuantityInCart: (state, action: PayloadAction<number>) => {
            state.quantityInCart = action.payload;
        },
        closeCart: (state) => {
            state.open = false;
        },
        setCart: (state, action: PayloadAction<ICart['items']>) => {
            state.items = action.payload;
        },
    },
});

export const { closeCart, setQuantityInCart, openCart, setCart } = cartSlice.actions;

export default cartSlice;
