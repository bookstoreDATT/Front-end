import { useQuery } from '@tanstack/react-query';
import { reviewService } from '~/services/review.service';

const useGetAllReviewStar = (productId: string) => {
    return useQuery({
        queryKey: ['allStars', productId],
        queryFn: () => reviewService.getAllRatingStars(productId),
        enabled: !!productId,
    });
};

export default useGetAllReviewStar;
