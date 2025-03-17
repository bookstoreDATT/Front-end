import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '~/context/ToastProvider';
import { ITagBody } from '~/interfaces/tag';
import { tagService } from '~/services/tag.service';

const useCreateTag = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const toast = useToast();
    return useMutation({
        mutationFn: (body: ITagBody) => tagService.createTag(body),
        onSuccess() {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey.includes('TAG'),
            });
            toast('success', 'Tạo thể loại thành công');
            navigate('/admin/tags/list');
        },
    });
};

export default useCreateTag;
