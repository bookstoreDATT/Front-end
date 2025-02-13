import { LoginOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { useToast } from '~/context/ToastProvider';
import { logout } from '~/store/slice/authSlice';
import { useTypedSelector } from '~/store/store';

export default function AccountLayout() {
    const user = useTypedSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const toast = useToast();
    const handleLogout = () => {
        toast('success', 'Đăng xuất thành công');
        dispatch(logout());
    };
    return (
        <div className='mt-[10%] grid grid-cols-1 gap-12 lg:grid-cols-[25%_70%]'>
            <div className='overflow-hidden bg-white'>
                <div className='flex justify-center rounded-t-md bg-[#1a94ff] py-2'>
                    <h3 className='font-medium text-white'>Tài khoản của tôi</h3>
                </div>
                <div className='rounded-b-md border-r-[1px] border-b-[1px] border-l-[1px] border-gray-500 p-4'>
                    <div className='flex justify-center'>
                        <div className='rounded-full border-[1px] border-[#1a94ff] p-2'>
                            <img className='w-32 rounded-full' src={user?.avatar} alt='' />
                        </div>
                    </div>
                    <p className='mt-4 font-medium'>Xin chào {user?.userName}</p>
                    <ul className='mt-2 flex flex-col gap-2'>
                        <li>
                            <NavLink
                                to='/account/my-account'
                                className={({ isActive }) => {
                                    const classActive = isActive
                                        ? 'border-[1px] border-[#1a94ff] bg-[#f1f0ff] font-medium text-[#1a94ff]'
                                        : 'hover:opacity-80';
                                    return `rounded-sm border p-2 transition-transform duration-150 ease-in-out ${classActive} flex justify-between`;
                                }}
                            >
                                <span>Tài khoản của tôi</span>
                            </NavLink>
                        </li>
                        <li className='w-full'>
                            <p>
                                <NavLink
                                    to='/account/my-orders'
                                    className={({ isActive }) => {
                                        const classActive = isActive
                                            ? 'border-[1px] border-[#1a94ff] bg-[#f1f0ff] font-medium text-[#1a94ff]'
                                            : 'hover:opacity-80';
                                        return `rounded-sm border p-2 transition-transform duration-150 ease-in-out ${classActive} flex justify-between`;
                                    }}
                                >
                                    <span>Đơn hàng của tôi</span>
                                </NavLink>
                            </p>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className={`flex w-full cursor-pointer items-center gap-2 rounded-sm border p-2 text-[##000000] transition-transform duration-150 ease-in-out hover:opacity-80`}
                            >
                                <LoginOutlined />
                                <p>Đăng xuất</p>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <Outlet />
        </div>
    );
}
