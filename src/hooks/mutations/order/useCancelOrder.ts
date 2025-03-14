import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '~/utils/api/axiosInstance';

const useCancelOrder = (orderId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (reason: string) =>
            instance({
                url: '/order/cancel',
                method: 'PATCH',
                data: { orderId, description: reason },
            }),
        onSuccess: () => {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.some((element) => ['my-orders', 'PRODUCTS'].includes(element as string)),
            });
        },
    });
};

export default useCancelOrder;
