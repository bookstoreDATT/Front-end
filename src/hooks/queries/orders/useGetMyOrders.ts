import { useQuery } from '@tanstack/react-query';
import { Params } from '~/interfaces/api';
import { orderService } from '~/services/order.service';

export const useGetMyOrders = (params: Params) => {
    return useQuery({
        queryKey: ['my-orders', ...Object.values(params)],
        queryFn: () => orderService.getMyOrders(params),
    });
};
