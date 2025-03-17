import { useQuery } from '@tanstack/react-query';
import { categoryService } from '~/services/category.service';

export const useGetDetailCategory = (id: string) => {
    return useQuery({
        queryKey: ['CATEGORY', id],
        queryFn: () => categoryService.getDetailCategory(id),
        enabled: !!id,
    });
};
