import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '~/services/order.service';
('~/services/order.service');

export default function useFinishOrderClient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['FINISH_ORDER'],
        mutationFn: (id: string) => orderService.finishOrder(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-orders'] });
            queryClient.resetQueries({
                predicate: (query) => query.queryKey.includes('my-orders'),
            });
        },
    });
}
