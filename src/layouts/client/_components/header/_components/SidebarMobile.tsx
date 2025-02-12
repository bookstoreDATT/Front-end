import { SearchOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFilter from '~/hooks/common/useFilter';

export default function SidebarMobile({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { query, updateQueryParam } = useFilter();
    const handleSearch = () => {
        setOpen(false);
        updateQueryParam({ ...query, search: searchQuery, page: '1', limit: '10' });
        navigate(`/search?search=${searchQuery}&page=1&limit=10`);
    };
    return (
        <>
            <button onClick={showDrawer} className='block text-white md:hidden'>
                {children}
            </button>
            <Drawer
                title={
                    <Link to={'/'}>
                        <img className='w-16 invert-75' src='./public/logo.png' alt='' />
                    </Link>
                }
                placement={'left'}
                width={'100vw'}
                onClose={onClose}
                open={open}
            >
                <h3 className='text-base font-medium'>Tìm kiếm sản phẩm</h3>
                <div className='mt-2 flex h-8 items-center'>
                    <input
                        value={searchQuery}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type='text'
                        placeholder='Nhập tên sách hoặc tên tác giả...'
                        className='h-full w-[70%] rounded-l-md border-[1px] bg-white px-2 py-2 outline-none'
                    />
                    <button
                        onClick={handleSearch}
                        className='flex h-full cursor-pointer items-center justify-center rounded-r-md bg-[#0D5CB6] px-4 text-white'
                    >
                        <SearchOutlined />
                        <span className='hidden text-sm text-white sm:block'>Tìm kiếm</span>
                    </button>
                </div>
                <h3 className='mt-4 text-base font-medium'>Tài khoản</h3>
                <div className='mt-2 ml-2'>
                    <ul className='flex flex-col justify-center gap-1'>
                        <li>
                            <Link style={{ color: 'black' }} className='duration-300 hover:opacity-80' to={'/'}>
                                Đăng nhập
                            </Link>
                        </li>
                        <li className=''>
                            <Link style={{ color: 'black' }} className='duration-300 hover:opacity-80' to={'/'}>
                                Đăng ký
                            </Link>
                        </li>
                    </ul>
                </div>
            </Drawer>
        </>
    );
}
