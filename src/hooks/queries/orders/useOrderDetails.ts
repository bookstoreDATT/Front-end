import { useQuery } from '@tanstack/react-query';
import { orderService } from '~/services/order.service';

export const useOrderDetails = (id: string) => {
    return useQuery({
        queryKey: ['my-orders', id],
        queryFn: () => orderService.getDetailOrder(id),
    });
};
