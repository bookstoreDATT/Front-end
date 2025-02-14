import { LeftOutlined } from '@ant-design/icons';
import { Pagination, Spin } from 'antd';
import { Link } from 'react-router-dom';
import ProductCard from '~/components/ProductCard/ProductCard';
import useFilter from '~/hooks/common/useFilter';
import { useGetAllProducts } from '~/hooks/queries/products/useGetAllProducts';

export default function SearchPage() {
    const { query, updateQueryParam } = useFilter();
    const limit = 10;
    const { data, isPending } = useGetAllProducts(query);
    const onChangePaginate = (page: number) => {
        updateQueryParam({ ...query, page: page.toString(), limit: String(limit) });
    };
    return (
        <div className='flex flex-col gap-[5%] md:flex-row xl:gap-[10%]'>
            <div className='mt-4 md:mt-0'>
                <div>
                    <Link to={'/'} className='flex gap-2 text-sm'>
                        <LeftOutlined />
                        Quay về trang chủ
                    </Link>
                    {data?.data.length !== 0 && query.search ? (
                        <div className='mt-4 flex justify-between'>
                            <h3 className='text-lg font-medium'>
                                Kết quả với từ khóa:{' '}
                                <span className='font-semibold text-[#FF424E] capitalize'>{query.search}</span>
                            </h3>
                            <button
                                onClick={() => updateQueryParam({ ...query, search: '' })}
                                className='cursor-pointer rounded-sm border-[1px] border-[#FF424E] bg-[#FFF0F1] px-2 text-[#FF424E]'
                            >
                                Đặt lại tìm kiếm
                            </button>
                        </div>
                    ) : (
                        <h3 className='text-xl'>Tìm kiếm sản phẩm</h3>
                    )}
                    {data && !isPending ? (
                        <>
                            {data.data.length !== 0 ? (
                                <>
                                    <div className='mt-4 grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                                        {data.data.map((item, index) => (
                                            <ProductCard product={item} key={index} />
                                        ))}
                                    </div>
                                    <div className='mt-6'>
                                        <Pagination
                                            disabled={isPending}
                                            align='center'
                                            onChange={onChangePaginate}
                                            defaultCurrent={Number(query.page)}
                                            current={Number(query.page)}
                                            total={data.totalDocs}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className='flex min-h-[30vh] w-full items-center justify-center'>
                                    <h2 className='font-medium'>Không tìm thấy sản phẩm nào</h2>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className='flex min-h-[50vh] w-[100%] items-center justify-center'>
                            <Spin size='large' />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
