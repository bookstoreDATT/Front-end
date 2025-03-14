import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '~/utils/api/axiosInstance';

export const useShippingOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (orderId: string) => {
            const response = await instance({
                method: 'PATCH',
                url: 'order/shipping',
                data: { orderId },
            });

            return response?.data?.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['orders'],
            });
        },
    });
};
