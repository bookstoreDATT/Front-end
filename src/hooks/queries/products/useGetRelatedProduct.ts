import { useQuery } from '@tanstack/react-query';
import { productService } from '~/services/product.service';

export const useGetRelatedProduct = (id: string, cateId: string) => {
    return useQuery({
        queryKey: ['RELATED', id, cateId],
        queryFn: () => productService.getRelatedProduct(id, cateId),
    });
};
