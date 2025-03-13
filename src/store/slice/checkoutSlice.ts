import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrderCreatePayload } from '~/interfaces/order';

const initialState: {
    checkoutInfor: IOrderCreatePayload;
} = {
    checkoutInfor: {
        customerInfo: {
            email: '',
            name: '',
            phone: '',
        },
        items: [],
        shippingAddress: '',
        totalPrice: 0,
        description: '',
        paymentMethod: 'cash',
    },
};

const checkoutInfo = createSlice({
    name: 'checkoutInfoSlice',
    initialState,
    reducers: {
        setCheckoutInfo: (state, action: PayloadAction<IOrderCreatePayload>) => {
            state.checkoutInfor = action.payload;
        },
    },
});
export const { setCheckoutInfo } = checkoutInfo.actions;
export default checkoutInfo;
