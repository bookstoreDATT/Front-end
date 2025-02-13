import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '~/context/ToastProvider';
import { ILoginPayload } from '~/interfaces/auth';
import { authServices } from '~/services/auth.service';
import { login } from '~/store/slice/authSlice';
import { useAppDispatch } from '~/store/store';

export const useLogin = () => {
    const toast = useToast();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ['LOGIN'],
        mutationFn: (body: ILoginPayload) => authServices.login(body),
        onSuccess: (data) => {
            toast('success', data.message);
            const user = {
                userName: data.data.userName,
                role: data.data.role,
                _id: data.data._id,
                email: data.data.email,
            };
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('accessToken', data.data.accessToken as string);
            navigate('/');
            dispatch(login(user));
        },
    });
};
