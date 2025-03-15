import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '~/context/ToastProvider';
import { productService } from '~/services/product.service';

const useCreateProduct = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const toast = useToast();
    return useMutation({
        mutationFn: (data: FormData) => productService.createProduct(data),
        onSuccess: () => {
            queryClient.refetchQueries({
                predicate: (query) => query.queryKey.includes('PRODUCTS'),
            });
            toast('success', 'Thêm mới sản phẩm thành công!');
            navigate('/admin/products');
        },
        onError: (error: any) => {
            toast('error', error.response.data.message);
        },
    });
};

export default useCreateProduct;
