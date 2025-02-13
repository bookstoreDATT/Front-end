import { useMutation } from '@tanstack/react-query';
import { IPayloadResetPassword } from '~/interfaces/auth';
import { authServices } from '~/services/auth.service';
import { useTypedSelector } from '~/store/store';

export const useResetPassword = () => {
    const userId = useTypedSelector((state) => state.auth.user?._id);
    return useMutation({
        mutationKey: ['CHANGEPASSWORD', userId],
        mutationFn: (body: IPayloadResetPassword) => authServices.changePassword(body),
    });
};
