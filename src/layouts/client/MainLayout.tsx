import { Outlet } from 'react-router-dom';
import Header from './_components/header/Header';
import Footer from './_components/footer/Footer';

export default function MainLayout() {
    return (
        <>
            <Header />
            <main className='mx-2 mt-6 min-h-[100vh] max-w-[1240px] sm:mx-4 md:mx-6 md:justify-between xl:mx-auto'>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
