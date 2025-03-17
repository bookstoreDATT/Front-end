import { Params } from 'react-router-dom';
import { PaginateResponse } from '~/interfaces/api';
import { ITag, ITagBody } from '~/interfaces/tag';
import instance from '~/utils/api/axiosInstance';

export const tagService = {
    async getAllTags(params: Params) {
        const { data } = await instance.get<PaginateResponse<ITag[]>>('/tags/all', {
            params,
        });
        return data;
    },
    async getDetailTag(id: string) {
        const { data } = await instance.get<ITag>(`/tags/${id}`);
        return data;
    },
    async createTag(body: ITagBody) {
        const { data } = await instance.post(`/tags/create`, body);
        return data;
    },
    async updateTag(id: string, body: ITagBody) {
        const { data } = await instance.patch(`/tags/${id}`, body);
        return data;
    },
};
