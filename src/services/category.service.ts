import { PaginateResponse, Params } from '~/interfaces/api';
import { ICategory, ICategoryBody } from '~/interfaces/category';
import instance from '~/utils/api/axiosInstance';

export const categoryService = {
    async getAllCategory(params: Params) {
        const { data } = await instance.get<PaginateResponse<ICategory[]>>('/categories/all', {
            params,
        });
        return data;
    },
    async getDetailCategory(id: string) {
        const { data } = await instance.get<ICategory>(`/categories/${id}`);
        return data;
    },
    async createCategory(body: ICategoryBody) {
        const { data } = await instance.post(`/categories/create`, body);
        return data;
    },
    async updateCategory(id: string, body: ICategoryBody) {
        const { data } = await instance.patch(`/categories/${id}`, body);
        return data;
    },
};
