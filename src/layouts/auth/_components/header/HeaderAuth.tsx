import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import img from '~/assets/logo.png';
export default function HeaderAuth() {
    const location = useLocation();
    return (
        <header className='max-w-[1240px] sm:mx-4 md:mx-6 xl:mx-auto'>
            <div className='flex items-center justify-between py-2'>
                <div className='flex items-center gap-2'>
                    <Link to={'/'}>
                        <img src={img} className='w-16 invert-75' alt='' />
                    </Link>
                    <h3 className='font-medium'>{location.pathname === '/auth/login' ? 'Đăng nhập' : 'Đăng ký'}</h3>
                </div>
                <div>
                    <Link className='text-blue-500' to={'/'}>
                        Bạn cần hỗ trợ?
                    </Link>
                </div>
            </div>
        </header>
    );
}
