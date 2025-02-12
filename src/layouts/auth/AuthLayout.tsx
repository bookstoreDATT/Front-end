import { Outlet } from 'react-router-dom';
import HeaderAuth from './_components/header/HeaderAuth';
import FooterAuth from './_components/header/FooterAuth';

export default function AuthLayout() {
    return (
        <>
            <HeaderAuth />
            <main className='min-h-[89vh] bg-[#1A94FF]'>
                <Outlet />
            </main>
            <FooterAuth />
        </>
    );
}
