import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { cartService } from '~/services/cart.service';
import { setCart } from '~/store/slice/cartSlice';

const useUpdateCartQuantity = () => {
    const dispatch = useDispatch();

    return useMutation({
        mutationKey: ['cart'],
        mutationFn: (itemData: { productId: string; quantity: number }) => cartService.updateCartQuantity(itemData),
        onSuccess: (data) => {
            const cartItems = data.data.items;

            dispatch(setCart(cartItems));
        },
        onError(error) {
            console.log(error);
        },
    });
};

export default useUpdateCartQuantity;
