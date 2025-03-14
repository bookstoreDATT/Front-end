import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '~/utils/api/axiosInstance';

export const useDeliveredOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (orderId: string) => {
            const response = await instance({
                method: 'PATCH',
                url: 'order/deliver',
                data: { orderId },
            });

            return response?.data?.data;
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
};
