import { productService } from '~/services/product.service';
import { Params } from '~/interfaces/api';
import { useQuery } from '@tanstack/react-query';

const useGetProductsForAdmin = (params?: Params) => {
    return useQuery({
        queryKey: ['PRODUCTS', ...Object.values(params || {}), ...Object.keys(params || {})],
        queryFn: () => productService.getAllForAdmin(params),
    });
};

export default useGetProductsForAdmin;
