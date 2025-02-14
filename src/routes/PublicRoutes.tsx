import ErrorPage from '~/pages/Error/ErrorPage';
import NotFoundPage from '~/pages/NotFound/NotFound';
import MainLayout from '../layouts/client/MainLayout';
import { HomePage, LoginPage, ProductDetailPage, RegisterPage, SearchPage, Suspense } from './LazyRoutes';
import { Navigate } from 'react-router-dom';
import AuthLayout from '~/layouts/auth/AuthLayout';
import CartDetail from '~/pages/Cart/CartDetail';

const PublicRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: (
                    <Suspense>
                        <HomePage />
                    </Suspense>
                ),
            },
            {
                path: '/search',
                element: (
                    <Suspense>
                        <SearchPage />
                    </Suspense>
                ),
            },
            {
                path: '/product/:id',
                element: (
                    <Suspense>
                        <ProductDetailPage />
                    </Suspense>
                ),
            },
            {
                path: '/cart/detail',
                element: (
                    <Suspense>
                        <CartDetail />
                    </Suspense>
                ),
            },
            {
                path: '/order',
                element: (
                    <Suspense>
                        <ProductDetailPage />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: '/auth/',
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'register',
                element: (
                    <Suspense>
                        <RegisterPage />
                    </Suspense>
                ),
            },
            {
                path: 'login',
                element: (
                    <Suspense>
                        <LoginPage />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to={'/404'} />,
    },
    {
        path: '/404',
        element: <NotFoundPage />,
    },
];

export default PublicRoutes;
