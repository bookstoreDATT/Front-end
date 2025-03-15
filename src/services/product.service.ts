import { PaginateResponse, Params } from '~/interfaces/api';
import { IProduct, ProductData } from '~/interfaces/product';
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
    async getAllForAdmin(params?: Params) {
        const res = await instance.get<PaginateResponse<IProduct[]>>(`/products/all`, { params });
        return res.data;
    },
    async hideProduct(id: string) {
        const res = await instance.delete<null>(`products/${id}`);
        return res.data;
    },
    async createProduct(data: FormData) {
        const res = await instance.post<null>(`products/create`, data);
        return res.data;
    },
    async updateProduct(data: FormData, id: string) {
        const res = await instance.patch<null>(`products/${id}`, data);
        return res.data;
    },
};
