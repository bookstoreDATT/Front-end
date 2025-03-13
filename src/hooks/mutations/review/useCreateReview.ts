import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '~/context/ToastProvider';
import { ICreateReviewPayload } from '~/interfaces/review';
import { reviewService } from '~/services/review.service';

const useCreateReview = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationKey: ['createReview'],
        mutationFn: (body: ICreateReviewPayload) => reviewService.createReview(body),
        onSuccess() {
            toast('success', 'Đánh giá thành công');
            queryClient.invalidateQueries({
                queryKey: ['my-orders'],
            });
        },
        onError(error) {
            toast('error', error.message);
        },
    });
};

export default useCreateReview;
