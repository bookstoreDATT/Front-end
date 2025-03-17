import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '~/context/ToastProvider';
import { ICategoryBody } from '~/interfaces/category';
import { categoryService } from '~/services/category.service';

const useCreateCategory = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const toast = useToast();
    return useMutation({
        mutationFn: (body: ICategoryBody) => categoryService.createCategory(body),
        onSuccess() {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey.includes('CATEGORY'),
            });
            toast('success', 'Tạo danh mục thành công');
            navigate('/admin/categories/list');
        },
    });
};

export default useCreateCategory;
