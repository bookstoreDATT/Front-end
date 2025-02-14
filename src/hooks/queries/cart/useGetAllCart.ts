import { useQuery } from '@tanstack/react-query';
import { cartService } from '~/services/cart.service';
import { setQuantityInCart } from '~/store/slice/cartSlice';
import { useAppDispatch, useTypedSelector } from '~/store/store';

const useGetAllCart = () => {
    const user = useTypedSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const data = await cartService.getAllCartByUser();
            dispatch(setQuantityInCart(data.items.length));
            return data;
        },
        enabled: !!user,
    });
};

export default useGetAllCart;
