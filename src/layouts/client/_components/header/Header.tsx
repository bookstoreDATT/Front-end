import { MenuOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import SidebarMobile from './_components/SidebarMobile';
import { useState } from 'react';
import useFilter from '~/hooks/common/useFilter';

export default function Header() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { query, updateQueryParam } = useFilter();
    const handleSearch = () => {
        updateQueryParam({ ...query, search: searchQuery, page: '1', limit: '10' });
        navigate(`/search?search=${searchQuery}&page=1&limit=10`);
    };
    return (
        <header className='h-16 bg-[#1A94FF]'>
            <div className='mx-6 flex max-w-[1240px] items-center justify-between pt-2 md:justify-between xl:mx-auto'>
                <SidebarMobile>
                    <MenuOutlined className='text-2xl' />
                </SidebarMobile>
                <Link to={'/'}>
                    <img className='w-16' src='./public/logo.png' alt='' />
                </Link>
                <div className='hidden items-center justify-center md:flex'>
                    <input
                        value={searchQuery}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type='text'
                        placeholder='Nhập tên sách hoặc tên tác giả, thể loại...'
                        className='w-auto rounded-l-md bg-white px-2 py-2 md:w-3xs lg:w-lg xl:w-xl'
                    />

                    <button
                        onClick={handleSearch}
                        className='flex cursor-pointer items-center justify-center rounded-r-md bg-[#0D5CB6] py-2.5 text-white lg:px-4'
                    >
                        <SearchOutlined />
                        <span className='text-sm text-white'>Tìm kiếm</span>
                    </button>
                </div>
                <div className='flex items-center gap-4'>
                    <div className='hidden items-center gap-2 text-white md:flex'>
                        <UserOutlined className='text-3xl' />
                        <div className='text-sm'>
                            <p>
                                <Link className='duration-300 hover:opacity-80' to={'/'}>
                                    Đăng nhập
                                </Link>
                                /{' '}
                                <Link className='duration-300 hover:opacity-80' to={'/'}>
                                    Đăng ký
                                </Link>
                            </p>
                            <Link className='text-sm duration-300 hover:opacity-80' to={'/'}>
                                Tài khoản
                            </Link>
                        </div>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-white'>
                        <Badge count={5} offset={[0, 2]}>
                            <div className='text-white'>
                                <ShoppingCartOutlined color='#fff' className='text-3xl' />
                            </div>
                        </Badge>
                        <p className='hidden md:block'>Giỏ hàng</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
