import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '~/context/ToastProvider';
import { userServices } from '~/services/user.service';
import { useTypedSelector } from '~/store/store';

export const useUpdateProfile = () => {
    const userId = useTypedSelector((state) => state.auth.user?._id);
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationKey: ['UPDATEPROFILE'],
        mutationFn: (body: FormData) => userServices.updateProfile(body),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['PROFILE', userId],
            });
            toast('success', data.message);
        },
    });
};
