import { Params } from 'react-router-dom';
import { PaginateResponse } from '~/interfaces/api';
import { ICategory } from '~/interfaces/category';
import { ITag } from '~/interfaces/tag';
import instance from '~/utils/api/axiosInstance';

export const tagService = {
    async getAllTags(params: Params) {
        const { data } = await instance.get<PaginateResponse<ITag[]>>('/tags/all', {
            params,
        });
        return data;
    },
};
