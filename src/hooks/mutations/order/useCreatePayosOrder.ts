import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ICreatePayosOrderPayload } from '~/interfaces/order';
import { orderService } from '~/services/order.service';

const useCreatePayosOrder = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ['create-payos-order'],
        mutationFn: (orderData: ICreatePayosOrderPayload) => orderService.createPayosOrder(orderData),
        onSuccess(data) {
            const { paymentMethod, checkoutUrl } = data;

            if (paymentMethod && paymentMethod == 'payos' && checkoutUrl) {
                window.location.replace(checkoutUrl);
            }
        },
        onError(error) {
            console.log(error);
        },
    });
};

export default useCreatePayosOrder;
