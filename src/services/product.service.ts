import { PaginateResponse, Params } from '~/interfaces/api';
import { IProduct } from '~/interfaces/product';
import instance from '~/utils/api/axiosInstance';

export const productService = {
    async getAllProducts(params?: Params) {
        const { data } = await instance.get<PaginateResponse<IProduct[]>>('/products/all', { params });
        return data;
    },
    async getDetailProduct(id: string) {
        const { data } = await instance.get<IProduct>(`/products/${id}`);
        return data;
    },
    async getRelatedProduct(id: string, cateId: string) {
        const { data } = await instance.get<IProduct[]>(`/products/related/${id}?cateId=${cateId}`);
        return data;
    },
};
