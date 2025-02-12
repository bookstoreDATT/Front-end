import { IServerResponse } from '~/interfaces/api';
import { ILoginPayload, IRegisterPayload, IRegisterResponse, IUser } from '~/interfaces/auth';
import instance from '~/utils/api/axiosInstance';

export const authServices = {
    async register(body: IRegisterPayload) {
        const data = await instance.post<IRegisterPayload, IServerResponse<IRegisterResponse>>('/auth/register', body);
        return data;
    },
    async login(body: ILoginPayload) {
        const data = await instance.post<ILoginPayload, IServerResponse<IUser>>('/auth/login', body);
        return data;
    },
};
