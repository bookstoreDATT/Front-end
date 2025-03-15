import { tagService } from '~/services/tag.service';
import { Params } from '~/interfaces/api';
import { useQuery } from '@tanstack/react-query';

const useGetTags = (params: Params) => {
    return useQuery({
        queryKey: ['tags', ...Object.values(params)],
        queryFn: () => tagService.getAllTags(params),
    });
};

export default useGetTags;
