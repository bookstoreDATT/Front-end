import { useQuery } from '@tanstack/react-query';
import { tagService } from '~/services/tag.service';

const useGetDetailTag = (id: string) => {
    return useQuery({
        queryKey: ['TAG', id],
        queryFn: () => tagService.getDetailTag(id),
        enabled: !!id,
    });
};

export default useGetDetailTag;
