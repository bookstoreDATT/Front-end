import { productService } from '~/services/product.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '~/context/ToastProvider';

const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const toast = useToast();

    return useMutation({
        mutationFn: ({ data, id }: { data: FormData; id: string }) => productService.updateProduct(data, id),
        onSuccess: () => {
            queryClient.refetchQueries({
                predicate: (query) => query.queryKey.includes('PRODUCTS'),
            });
            toast('success', 'Cập nhật sản phẩm thành công!');
            navigate('/admin/products');
        },
        onError: (error: any) => {
            toast(error.response.data.message, 'error');
        },
    });
};

export default useUpdateProduct;
