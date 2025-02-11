import { useQuery } from '@tanstack/react-query';
import { productService } from '~/services/product.service';

export const useGetAllProducts = () => {
    return useQuery({
        queryKey: ['PRODUCTS'],
        queryFn: async () => {
            return await productService.getAllProducts();
        },
    });
};
