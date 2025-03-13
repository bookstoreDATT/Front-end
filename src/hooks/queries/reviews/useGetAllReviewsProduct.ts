import { useQuery } from '@tanstack/react-query';
import { reviewService } from '~/services/review.service';
import { Params } from '~/interfaces/api';

const useGetAllReviewsProduct = (productId: string, params: Params) => {
    return useQuery({
        queryKey: ['reviews', productId, ...Object.values(params)],
        queryFn: () => reviewService.getAllReviewProduct(productId, params),
        enabled: !!productId,
    });
};

export default useGetAllReviewsProduct;
