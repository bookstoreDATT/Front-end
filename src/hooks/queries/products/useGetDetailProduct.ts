import { useQuery } from '@tanstack/react-query';
import { productService } from '~/services/product.service';

export const useGetDetailProduct = (id: string) => {
    return useQuery({
        queryKey: ['PRODUCT', id],
        queryFn: () => productService.getDetailProduct(id),
    });
};
