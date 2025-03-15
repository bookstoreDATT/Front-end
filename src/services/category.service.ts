import { PaginateResponse, Params } from '~/interfaces/api';
import { ICategory } from '~/interfaces/category';
import instance from '~/utils/api/axiosInstance';

export const categoryService = {
    async getAllCategory(params: Params) {
        const { data } = await instance.get<PaginateResponse<ICategory[]>>('/categories/all', {
            params,
        });
        return data;
    },
};
