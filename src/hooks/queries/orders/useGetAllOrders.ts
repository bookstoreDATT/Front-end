import { useQuery } from '@tanstack/react-query';
import { Params } from '~/interfaces/api';
import instance from '~/utils/api/axiosInstance';

const useGetAllOrders = (params: Params) => {
    return useQuery({
        queryKey: ['orders', ...Object.values(params)],
        queryFn: async () => {
            const result = await instance<Promise<any>>({
                method: 'GET',
                url: '/order/all',
                params,
            });
            return result && result.data ? result.data : null;
        },
    });
};

export default useGetAllOrders;
