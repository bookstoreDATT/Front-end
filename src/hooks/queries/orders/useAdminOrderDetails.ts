import { useQuery } from '@tanstack/react-query';
import instance from '~/utils/api/axiosInstance';

const useAdminOrderDetails = (id: string) => {
    /* eslint-disable */
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async () => {
            const response = await instance<any>({
                method: 'GET',
                url: `/order//${id}`,
            });
            return response && response.data;
        },
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        enabled: !!id,
    });
};
/* eslint-enable */
export default useAdminOrderDetails;
