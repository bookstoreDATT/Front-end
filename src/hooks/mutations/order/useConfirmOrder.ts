import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '~/utils/api/axiosInstance';

export const useConfirmOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderId: string) =>
            instance({
                method: 'PATCH',
                url: '/order/confirm',
                data: { orderId },
            }),
        onSuccess() {
            queryClient.resetQueries({
                predicate: (query) => query.queryKey.includes('orders'),
            });
        },
    });
};
