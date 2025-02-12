import { PaginateResponse, Params } from '~/interfaces/api';
import { IProduct } from '~/interfaces/product';
import instance from '~/utils/api/axiosInstance';

export const productService = {
    async getAllProducts(params?: Params) {
        const { data } = await instance.get<PaginateResponse<IProduct[]>>('/products/all', { params });
        return data;
    },
};
