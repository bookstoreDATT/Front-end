import { LeftOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, InputNumber, Rate } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useGetDetailProduct } from '~/hooks/queries/products/useGetDetailProduct';
import { calculateOriginPrice, formatCurrency } from '~/utils/formatCurrency';
import SlideShow from './_components/SlideShow';
import RelatedProducts from './_components/RelatedProducts';

export default function ProductDetail() {
    const { id } = useParams();
    const { data: product } = useGetDetailProduct(id as string);
    const originalPrice =
        product && product.discount !== 0 ? calculateOriginPrice(product.price, product.discount) : null;
    return (
        <div>
            {product && (
                <>
                    <Link to={'/'} className='inline items-center gap-2 text-sm hover:opacity-80'>
                        <LeftOutlined className='mr-1' />
                        Quay về trang chủ
                    </Link>
                    <div className='mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5'>
                        <SlideShow thumbnail={product.thumbnail} images={product.images} />
                        <div>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-2xl font-medium capitalize'>{product.name}</h1>
                                {product.discount !== 0 && (
                                    <p className='rounded-md border-[1px] border-[#FF424E] bg-[#FFF0F1] px-1 py-1 text-xs font-medium text-[#FF424E]'>
                                        - 15%
                                    </p>
                                )}
                            </div>
                            <div className='mt-2 flex items-center gap-2'>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Rate: {
                                                starSize: 18,
                                            },
                                        },
                                    }}
                                >
                                    <Rate disabled value={5} />
                                </ConfigProvider>
                                <span className='text-sm text-[#787878]'>( 221 Đánh giá)</span>
                                <span className='border-l-[1px] border-[#787878] px-2 text-sm text-[#787878]'>
                                    {' '}
                                    Đã bán {product.sold}
                                </span>
                            </div>
                            <div className='mt-8 flex items-end gap-2'>
                                <h3 className='text-2xl font-medium text-[#FF424E]'>{formatCurrency(product.price)}</h3>
                                {product.discount !== 0 && (
                                    <div className='flex items-center gap-2'>
                                        <span className='text-base text-[#808089] line-through'>
                                            {formatCurrency(originalPrice as number)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className='mt-12'>
                                <span>Số lượng</span>
                                <div className='my-2 flex items-center gap-2'>
                                    <Button className='h-full'>-</Button>
                                    <InputNumber min={1} value={1} className='flex items-center' controls={false} />
                                    <Button className=''>+</Button>
                                </div>
                                <span className='text-sm text-[#808089]'>Còn lại {product.stock} sản phẩm</span>
                            </div>
                            <div className='mt-8'>
                                <button className='w-full cursor-pointer rounded-md border-[1px] border-[#1a94ff] bg-[#f1f0ff] py-4 font-medium text-[#1a94ff] duration-300 hover:bg-[#1a94ff] hover:text-white'>
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='mt-12'>
                        <h3 className='text-xl font-medium'>Sản phẩm tương tự</h3>
                        <RelatedProducts product={product} />
                    </div>
                    <div className='mt-12'>
                        <h3 className='text-xl font-medium'>Mô tả về sản phẩm </h3>
                        <p className='mt-4'>{product.description}</p>
                    </div>
                </>
            )}
        </div>
    );
}
