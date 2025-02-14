import { MenuOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import img from '~/assets/logo.png';
import CartDrawer from '~/components/CartDrawer/CartDrawer';
import useFilter from '~/hooks/common/useFilter';
import { logout } from '~/store/slice/authSlice';
import { closeCart, openCart } from '~/store/slice/cartSlice';
import { useTypedSelector } from '~/store/store';
import SidebarMobile from './_components/SidebarMobile';

export default function Header() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { query, updateQueryParam } = useFilter();
    const dispatch = useDispatch();

    const handleSearch = () => {
        updateQueryParam({ ...query, search: searchQuery, page: '1', limit: '10' });
        navigate(`/search?search=${searchQuery}&page=1&limit=10`);
    };
    const user = useTypedSelector((state) => state.auth.user);
    const cartQuantity = useTypedSelector((state) => state.cart.quantityInCart);
    const handleLogOut = () => {
        dispatch(logout());
    };

    const handleOpenCart = () => {
        dispatch(openCart());
    };

    useEffect(() => {
        return () => {
            dispatch(closeCart());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <header className='h-16 bg-[#1A94FF]'>
            <div className='mx-6 flex max-w-[1240px] items-center justify-between pt-2 md:justify-between xl:mx-auto'>
                <SidebarMobile>
                    <MenuOutlined className='text-2xl' />
                </SidebarMobile>
                <Link to={'/'}>
                    <img className='w-16' src={img} alt='' />
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
                <div className='flex items-center gap-5'>
                    <div className='hidden items-center gap-2 text-white md:flex'>
                        <Link to={`${user ? '/account/my-account' : '/auth/login'}`}>
                            <UserOutlined className='text-3xl' />
                        </Link>
                        <div className='min-w-[128px] text-sm'>
                            {user ? (
                                <>
                                    <Link to={'/account/my-account'}>{user.userName}</Link>
                                    <p
                                        onClick={handleLogOut}
                                        className='cursor-pointer text-sm duration-300 hover:opacity-80'
                                    >
                                        Đăng xuất
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p>
                                        <Link className='duration-300 hover:opacity-80' to={'/auth/login'}>
                                            Đăng nhập
                                        </Link>
                                        /{' '}
                                        <Link className='duration-300 hover:opacity-80' to={'/auth/register'}>
                                            Đăng ký
                                        </Link>
                                    </p>
                                    <Link
                                        className='text-sm duration-300 hover:opacity-80'
                                        to={`${user ? '/account/my-account' : '/auth/login'}`}
                                    >
                                        Tài khoản
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-white'>
                        {user ? (
                            <Badge
                                className='cursor-pointer'
                                count={cartQuantity}
                                showZero
                                offset={[0, 2]}
                                onClick={handleOpenCart}
                            >
                                <div className='text-white'>
                                    <ShoppingCartOutlined color='#fff' className='text-3xl' />
                                </div>
                            </Badge>
                        ) : (
                            <div className='text-white'>
                                <ShoppingCartOutlined color='#fff' className='text-3xl' />
                            </div>
                        )}

                        <p className='hidden md:block'>Giỏ hàng</p>
                    </div>
                </div>
            </div>
            <CartDrawer />
        </header>
    );
}
