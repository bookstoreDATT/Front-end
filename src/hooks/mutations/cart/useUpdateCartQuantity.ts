import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '~/services/cart.service';

const useUpdateCartQuantity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['cart'],
        mutationFn: (itemData: { productId: string; quantity: number }) => cartService.updateCartQuantity(itemData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onError(error) {
            console.log(error);
        },
    });
};

export default useUpdateCartQuantity;
