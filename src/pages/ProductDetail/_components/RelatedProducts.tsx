import { Spin } from 'antd';
import ProductCard from '~/components/productCard/ProductCard';
import { useGetRelatedProduct } from '~/hooks/queries/products/useGetRelatedProduct';
import { IProduct } from '~/interfaces/product';

export default function RelatedProducts({ product }: { product: IProduct }) {
    console.log(product);
    const { data, isPending } = useGetRelatedProduct(product._id, product.categoryId._id);
    return (
        <div className='mt-4'>
            {data && !isPending ? (
                <div className='grid w-full grid-cols-2 gap-12 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6'>
                    {data.map((item, index) => (
                        <ProductCard product={item} key={index} />
                    ))}
                </div>
            ) : (
                <div className='flex h-[30vh] w-full items-center justify-center'>
                    <Spin size='large' />
                </div>
            )}
        </div>
    );
}
