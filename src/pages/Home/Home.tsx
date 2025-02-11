import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '~/components/productCard/ProductCard';
import { useGetAllProducts } from '~/hooks/queries/products/useGetAllProducts';

export default function HomePage() {
    const [filter, setFilter] = useState<'trending' | 'bestPrice' | 'new' | 'lowPrice' | 'highPrice'>('trending');
    const { data } = useGetAllProducts();
    console.log(data);
    return (
        <div className='flex flex-col gap-[5%] md:flex-row xl:gap-[10%]'>
            <div>
                <h3 className='whitespace-nowrap'>Danh mục sản phẩm</h3>
                <ul className='mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm md:flex-col md:gap-1'>
                    <li>
                        <Link to={'/'} className='hover:opacity-80'>
                            Sách Tiếng Việt
                        </Link>
                    </li>
                    <li>
                        <Link to={'/'} className='hover:opacity-80'>
                            Sách giáo khoa
                        </Link>
                    </li>
                    <li>
                        <Link to={'/'} className='hover:opacity-80'>
                            Truyện tranh
                        </Link>
                    </li>
                    <li>
                        <Link to={'/'} className='hover:opacity-80'>
                            Tiểu thuyết
                        </Link>
                    </li>
                </ul>
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
                                onClick={() => setFilter('trending')}
                                className={`${filter === 'trending' && 'border-b-3 border-[#0D5CB6]'} cursor-pointer px-2 py-2`}
                            >
                                <p className={`${filter === 'trending' && 'text-[#0D5CB6]'} text-center`}>Phổ biến</p>
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
                    <div className='mt-4 grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                        {data &&
                            data?.data.map((item: any, index: number) => <ProductCard product={item} key={index} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}
