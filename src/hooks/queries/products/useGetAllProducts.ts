import { useQuery } from '@tanstack/react-query';
import { productService } from '~/services/product.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useGetAllProducts = (params?: any) => {
    return useQuery({
        queryKey: ['PRODUCTS', ...Object.values(params), ...Object.keys(params)],
        queryFn: () => {
            return productService.getAllProducts(params);
        },
    });
};
