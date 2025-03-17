import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '~/context/ToastProvider';
import { ICategoryBody } from '~/interfaces/category';
import { categoryService } from '~/services/category.service';

const useUpdateCategory = (id: string) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const toast = useToast();

    return useMutation({
        mutationFn: (body: ICategoryBody) => categoryService.updateCategory(id, body),
        onSuccess() {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey.includes('CATEGORY'),
            });
            toast('success', 'Sửa danh mục thành công');
            navigate('/admin/categories/list');
        },
    });
};

export default useUpdateCategory;
