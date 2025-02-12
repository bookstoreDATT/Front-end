import { PaginateResponse } from '~/interfaces/api';
import { ICategory } from '~/interfaces/category';
import instance from '~/utils/api/axiosInstance';

export const categoryService = {
    async getAllCategory() {
        const { data } = await instance.get<PaginateResponse<ICategory[]>>('/categories/all');
        return data;
    },
};
