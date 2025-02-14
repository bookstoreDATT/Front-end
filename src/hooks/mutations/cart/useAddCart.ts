import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from '~/context/ToastProvider';
import { ICartData } from '~/interfaces/cart';
import { cartService } from '~/services/cart.service';
import { openCart, setCart } from '~/store/slice/cartSlice';
import { useTypedSelector } from '~/store/store';

const useAddCart = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const queryClient = useQueryClient();
    const user = useTypedSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const checkIsLogged = () => {
        navigate('/auth/login');
        toast('info', 'Bạn cần đăng nhập trước');

        return Promise.reject();
    };

    return useMutation({
        // mutationKey: ['cart'],
        mutationFn: (body: ICartData) => (user ? cartService.addToCart(body) : checkIsLogged()),
        onSuccess: (data) => {
            // const cartItems = data.data.items;

            dispatch(openCart());

            queryClient.invalidateQueries({ queryKey: ['cart'] });

            // console.log(data);

            // dispatch(setCart(cartItems));
        },
        onError(error) {
            console.log(error);
        },
    });
};

export default useAddCart;
