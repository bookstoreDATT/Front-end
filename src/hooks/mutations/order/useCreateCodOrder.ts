import { useMutation } from '@tanstack/react-query';
import { IOrderCreatePayload } from '~/interfaces/order';
import { orderService } from '~/services/order.service';
import { useNavigate } from 'react-router-dom';

const useCreateCodOrder = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ['create-order'],
        mutationFn: (orderData: IOrderCreatePayload) => orderService.createOrder(orderData),
        onSuccess() {
            navigate('/order-success', { replace: true });
        },
        onError(error) {
            console.log(error);
        },
    });
};

export default useCreateCodOrder;
