import { Navigate } from 'react-router-dom';
import AccountLayout from '~/layouts/account/AccountLayout';
import AuthLayout from '~/layouts/auth/AuthLayout';
import AuthProtected from '~/layouts/protected/AuthProtected';
import ErrorPage from '~/pages/Error/ErrorPage';
import NotFoundPage from '~/pages/NotFound/NotFound';
import MainLayout from '../layouts/client/MainLayout';
import {
    AccountPage,
    CartDetail,
    Checkout,
    HomePage,
    LoginPage,
    MyOrderDetailPage,
    MyOrdersPage,
    OrderError,
    OrderSuccess,
    ProductDetailPage,
    RegisterPage,
    SearchPage,
    Suspense,
} from './LazyRoutes';

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
                        <AuthProtected protectedType='not-logged'>
                            <CartDetail />
                        </AuthProtected>
                    </Suspense>
                ),
            },
            {
                path: '/checkout',
                element: (
                    <Suspense>
                        <AuthProtected protectedType='logged'>
                            <Checkout />
                        </AuthProtected>
                    </Suspense>
                ),
            },
            {
                path: '/order-success',
                element: (
                    <Suspense>
                        <AuthProtected protectedType='not-logged'>
                            <OrderSuccess />
                        </AuthProtected>
                    </Suspense>
                ),
            },
            {
                path: '/order-error',
                element: (
                    <Suspense>
                        <AuthProtected protectedType='not-logged'>
                            <OrderError />
                        </AuthProtected>
                    </Suspense>
                ),
            },
            // ACCOUNT PAGE
            {
                path: '/account/',
                element: (
                    <AuthProtected protectedType='not-logged'>
                        <AccountLayout />
                    </AuthProtected>
                ),
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: 'my-account',
                        element: (
                            <Suspense>
                                <AccountPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'my-orders',
                        element: (
                            <Suspense>
                                <MyOrdersPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'my-orders/:id',
                        element: (
                            <Suspense>
                                <MyOrderDetailPage />
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
    {
        path: '/auth/',
        element: (
            <AuthProtected protectedType='logged'>
                <AuthLayout />
            </AuthProtected>
        ),
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
