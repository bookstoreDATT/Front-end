import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { ICartData } from '~/interfaces/cart';
import { cartService } from '~/services/cart.service';
import { openCart, setCart } from '~/store/slice/cartSlice';

const useAddCart = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    return useMutation({
        // mutationKey: ['cart'],
        mutationFn: (body: ICartData) => cartService.addToCart(body),
        onSuccess: (data) => {
            // const cartItems = data.data.items;

            dispatch(openCart());

            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ['cart'] });
            }, 0);

            // console.log(data);

            // dispatch(setCart(cartItems));
        },
        onError(error) {
            console.log(error);
        },
    });
};

export default useAddCart;
