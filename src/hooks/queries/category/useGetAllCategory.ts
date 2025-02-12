import { useQuery } from '@tanstack/react-query';
import { categoryService } from '~/services/category.service';

export const useGetAllCategory = () => {
    return useQuery({
        queryKey: ['CATEGORY'],
        queryFn: () => categoryService.getAllCategory(),
    });
};
