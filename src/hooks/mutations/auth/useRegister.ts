import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '~/context/ToastProvider';
import { IRegisterPayload } from '~/interfaces/auth';
import { authServices } from '~/services/auth.service';

export const useRegister = () => {
    const toast = useToast();
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ['REGISTER'],
        mutationFn: (body: IRegisterPayload) => authServices.register(body),
        onSuccess: (data) => {
            toast('success', data.message);
            navigate('/auth/login');
        },
    });
};
