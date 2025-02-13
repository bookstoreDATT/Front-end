import { Outlet } from 'react-router-dom';
import Header from './_components/header/Header';
import Footer from './_components/footer/Footer';
import { useGetProfile } from '~/hooks/queries/auth/useGetProfile';
import { useAppDispatch } from '~/store/store';
import { useEffect } from 'react';
import { login } from '~/store/slice/authSlice';

export default function MainLayout() {
    const { data } = useGetProfile();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (data) {
            dispatch(login(data));
        }
    }, [data, dispatch]);
    return (
        <>
            <Header />
            <main className='mx-2 mt-6 min-h-[89vh] max-w-[1240px] sm:mx-4 md:mx-6 md:justify-between xl:mx-auto'>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
