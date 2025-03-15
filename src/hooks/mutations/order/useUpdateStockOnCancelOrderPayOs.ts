import { useMutation } from '@tanstack/react-query';
import { orderService } from '~/services/order.service';

const useUpdateStockOnCancelOrderPayOs = () => {
    return useMutation({
        mutationKey: ['updateStockOnCancelOrderPayos'],
        mutationFn: (data: { orderId: string }) => orderService.updateStockOnCancelOrderPayosPayment(data),
    });
};

export default useUpdateStockOnCancelOrderPayOs;
