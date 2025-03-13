import { PaginateResponse, Params } from '~/interfaces/api';
import { IOrder, IOrderCreatePayload, IOrderResponse, IPayosOderResponse } from '~/interfaces/order';
import instance from '~/utils/api/axiosInstance';

export const orderService = {
    async createOrder(orderData: IOrderCreatePayload) {
        const { data } = await instance.post<IOrderResponse>('/order/create', orderData);
        return data;
    },
    async createPayosOrder(orderData: IOrderCreatePayload) {
        const { data } = await instance.post<IPayosOderResponse>('/payos/create', orderData);
        return data;
    },
    async getMyOrders(params: Params) {
        const { data } = await instance.get<PaginateResponse<IOrder[]>>(`order`, {
            params,
        });
        return data;
    },
    async getDetailOrder(id: string) {
        const { data } = await instance.get<IOrder>(`order/${id}`);
        return data;
    },
    async updateOrderPaymentStatus(orderCode: number) {
        const { data } = await instance.patch<null>(`/payos/update/${orderCode}`);
        return data;
    },
};
