import { Pagination, Spin } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '~/components/ProductCard/ProductCard';
import useFilter from '~/hooks/common/useFilter';
import { useGetAllCategory } from '~/hooks/queries/category/useGetAllCategory';
import { useGetAllProducts } from '~/hooks/queries/products/useGetAllProducts';
export default function HomePage() {
    const [filter, setFilter] = useState<'all' | 'bestPrice' | 'new' | 'lowPrice' | 'highPrice'>('all');
    const { query, updateQueryParam } = useFilter();
    const limit = 10;
    const { data, isPending } = useGetAllProducts(query);
    const onChangePaginate = (page: number) => {
        updateQueryParam({ ...query, page: page.toString(), limit: String(limit) });
    };
    const { data: categoryData, isPending: categoryIsPending } = useGetAllCategory();

    return (
        <div className='flex flex-col gap-[5%] md:flex-row xl:gap-[10%]'>
            <div>
                <h3 className='whitespace-nowrap'>Danh mục sản phẩm</h3>
                {categoryData && !categoryIsPending ? (
                    categoryData.data.length !== 0 ? (
                        <ul className='mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm md:flex-col md:gap-1'>
                            {categoryData?.data.map((item, index) => (
                                <li key={index}>
                                    <Link to={'/'} className='hover:opacity-80'>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Không có danh mục</p>
                    )
                ) : (
                    <div className='flex h-12 items-center justify-center'>
                        <Spin size='small' />
                    </div>
                )}
            </div>
            <div className='mt-4 md:mt-0'>
                <div>
                    <h3 className='text-xl'>Nhà sách Tiki</h3>
                    <img
                        className='mt-4 h-48 w-full md:h-72'
                        src='https://vietgigs.vn/public/storage/gigs/gallery/large/EC6D5D824FE2BE40EAB4.webp'
                        alt=''
                    />
                </div>
                <div className='mt-6'>
                    <ul className='flex flex-wrap gap-2 md:gap-6'>
                        <li>
                            <button
                                onClick={() => setFilter('all')}
                                className={`${filter === 'all' && 'border-b-3 border-[#0D5CB6]'} cursor-pointer px-2 py-2`}
                            >
                                <p className={`${filter === 'all' && 'text-[#0D5CB6]'} text-center`}>Tất cả</p>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setFilter('bestPrice')}
                                className={`${filter === 'bestPrice' && 'border-b-3 border-[#0D5CB6]'} cursor-pointer px-2 py-2`}
                            >
                                <p className={`${filter === 'bestPrice' && 'text-[#0D5CB6]'} text-center`}>Bán chạy</p>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setFilter('new')}
                                className={`${filter === 'new' && 'border-b-3 border-[#0D5CB6]'} cursor-pointer px-2 py-2`}
                            >
                                <p className={`${filter === 'new' && 'text-[#0D5CB6]'} text-center`}>Mới nhất</p>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setFilter('lowPrice')}
                                className={`${filter === 'lowPrice' && 'border-b-3 border-[#0D5CB6]'} cursor-pointer px-2 py-2`}
                            >
                                <p className={`${filter === 'lowPrice' && 'text-[#0D5CB6]'} text-center`}>Giá thấp</p>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setFilter('highPrice')}
                                className={`${filter === 'highPrice' && 'border-b-3 border-[#0D5CB6]'} cursor-pointer px-2 py-2`}
                            >
                                <p className={`${filter === 'highPrice' && 'text-[#0D5CB6]'} text-center`}>Giá cao</p>
                            </button>
                        </li>
                    </ul>
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
