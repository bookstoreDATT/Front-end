import { useMutation } from '@tanstack/react-query';
import { orderService } from '~/services/order.service';

const useUpdateOrderPayment = () => {
    return useMutation({
        mutationKey: ['create-order'],
        mutationFn: (orderCode: number) => orderService.updateOrderPaymentStatus(orderCode),
        onError(error) {
            console.log(error);
        },
    });
};

export default useUpdateOrderPayment;
