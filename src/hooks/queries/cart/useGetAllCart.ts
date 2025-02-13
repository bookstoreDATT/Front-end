import { useQuery } from '@tanstack/react-query';
import { cartService } from '~/services/cart.service';

const useGetAllCart = () => {
    return useQuery({
        queryKey: ['cart'],
        queryFn: () => cartService.getAllCartByUser(),
    });
};

export default useGetAllCart;
