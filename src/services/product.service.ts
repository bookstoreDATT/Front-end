import instance from '~/utils/api/axiosInstance';

export const productService = {
    async getAllProducts() {
        const { data } = await instance.get('/products/all');
        return data.data;
    },
};
