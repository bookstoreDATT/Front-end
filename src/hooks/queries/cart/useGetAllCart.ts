import { useQuery } from '@tanstack/react-query';
import { cartService } from '~/services/cart.service';
import { useTypedSelector } from '~/store/store';

const useGetAllCart = () => {
    const user = useTypedSelector((state) => state.auth.user);
    return useQuery({
        queryKey: ['cart'],
        queryFn: () => cartService.getAllCartByUser(),
        enabled: !!user,
    });
};

export default useGetAllCart;
