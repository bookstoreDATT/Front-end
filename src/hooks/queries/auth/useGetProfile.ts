import { useQuery } from '@tanstack/react-query';
import { authServices } from '~/services/auth.service';
import { useTypedSelector } from '~/store/store';

export const useGetProfile = () => {
    const userId = useTypedSelector((state) => state.auth.user?._id);
    return useQuery({
        queryKey: ['PROFILE', userId],
        queryFn: () => authServices.getProfile(),
        enabled: !!userId,
    });
};
