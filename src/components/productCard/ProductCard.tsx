import { ConfigProvider, Rate } from 'antd';
import { IProduct } from '~/interfaces/product';
import { formatCurrency } from '~/utils/formatCurrency';

export default function ProductCard({ product }: { product: IProduct }) {
    return (
        <div className='group cursor-pointer'>
            <div className='relative'>
                <img
                    className='h-auto w-auto rounded-md duration-300 group-hover:scale-105'
                    src={product.thumbnail}
                    alt=''
                />
                <div className='absolute bottom-2 flex w-full justify-center opacity-0 duration-300 group-hover:opacity-100'>
                    <div className='rounded-md bg-white px-2 py-1 text-sm font-medium text-black opacity-80 hover:opacity-100'>
                        Thêm vào giỏ hàng
                    </div>
                </div>
            </div>
            <div className='mt-4 w-full'>
                <h3
                    title={product.name}
                    className='truncate text-base font-medium capitalize duration-300 group-hover:opacity-70'
                >
                    {product.name}
                </h3>
                <div className='opacity-100 duration-300 group-hover:opacity-70'>
                    <ConfigProvider
                        theme={{
                            components: {
                                Rate: {
                                    starSize: 12,
                                },
                            },
                        }}
                    >
                        <Rate disabled value={5} />
                    </ConfigProvider>
                    <p className='text-sm text-[#787878]'>Đã bán {product.sold}</p>
                </div>
                {product.discount !== 0 ? (
                    <div className='flex items-center gap-2 duration-300 group-hover:opacity-70'>
                        <p className='text-base font-medium text-[#FF424E]'>{formatCurrency(product.price)}</p>
                        <p className='rounded-md border-[1px] border-[#FF424E] bg-[#FFF0F1] px-1 py-1 text-xs font-medium text-[#FF424E]'>
                            - 15%
                        </p>
                    </div>
                ) : (
                    <p className='text-base font-medium'>{formatCurrency(product.price)}</p>
                )}
            </div>
        </div>
    );
}
