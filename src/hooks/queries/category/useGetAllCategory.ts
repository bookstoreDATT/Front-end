import { useQuery } from '@tanstack/react-query';
import { Params } from 'react-router-dom';
import { categoryService } from '~/services/category.service';

export const useGetAllCategory = (params: Params) => {
    return useQuery({
        queryKey: ['CATEGORY', ...Object.values(params)],
        queryFn: () => categoryService.getAllCategory(params),
    });
};
