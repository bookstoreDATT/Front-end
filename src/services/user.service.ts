import { IServerResponse } from '~/interfaces/api';
import { IUser } from '~/interfaces/auth';
import instance from '~/utils/api/axiosInstance';

export const userServices = {
    async updateProfile(body: FormData) {
        const data = await instance.patch<FormData, IServerResponse<IUser>>('/user/update', body);
        return data;
    },
};
