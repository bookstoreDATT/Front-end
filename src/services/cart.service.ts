import { PaginateResponse } from '~/interfaces/api';
import { ICartData, ICartResponse } from '~/interfaces/cart';
import instance from '~/utils/api/axiosInstance';

export const cartService = {
    async getAllCartByUser() {
        const { data } = await instance.get<ICartResponse>('/cart/all');
        return data;
    },
    async addToCart(cartItem: ICartData) {
        const { data } = await instance.post<PaginateResponse<ICartResponse>>('/cart', cartItem);
        return data;
    },
    async updateCartQuantity(itemData: { productId: string; quantity: number }) {
        const { data } = await instance.post<PaginateResponse<ICartResponse>>('/cart/update', itemData);
        return data;
    },
    async removeCartItem(itemData: { productId: string }) {
        const { data } = await instance.post<PaginateResponse<null>>('/cart/remove', itemData);
        return data;
    },
};
