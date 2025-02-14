import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '~/context/ToastProvider';
import { cartService } from '~/services/cart.service';

const useRemoveCartItem = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationKey: ['cart'],
        mutationFn: (body: { productId: string }) => cartService.removeCartItem(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
};

export default useRemoveCartItem;
