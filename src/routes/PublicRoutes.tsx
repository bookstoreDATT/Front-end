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
    CategoryListPage,
    Checkout,
    CreateCategoryPage,
    CreateProductPage,
    CreateTagPage,
    HomePage,
    LoginPage,
    MyOrderDetailPage,
    MyOrdersPage,
    OrderDetailPage,
    OrderError,
    OrdersListPage,
    OrderSuccess,
    ProductDetailPage,
    ProductListPage,
    RegisterPage,
    SearchPage,
    Suspense,
    TagListPage,
    UpdateCategoryPage,
    UpdateProductPage,
    UpdateTagPage,
} from './LazyRoutes';
import AdminLayout from '~/layouts/AdminLayout';
import ProtectedRoute from '~/layouts/protected/ProtectedRoute';

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
                path: '/order-success/:orderId',
                element: (
                    <Suspense>
                        <AuthProtected protectedType='not-logged'>
                            <OrderSuccess />
                        </AuthProtected>
                    </Suspense>
                ),
            },
            {
                path: '/order-error/:orderId',
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
        path: 'admin',
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: (
                    <Suspense>
                        <div>DashBoard</div>
                    </Suspense>
                ),
            },
            {
                path: 'orders',
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <OrdersListPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'list',
                        element: (
                            <Suspense>
                                <OrdersListPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: ':id/detail',
                        element: (
                            <Suspense>
                                <OrderDetailPage />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: 'products',
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ProductListPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'list',
                        element: (
                            <Suspense>
                                <ProductListPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'create',
                        element: (
                            <Suspense>
                                <CreateProductPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: ':id/edit',
                        element: (
                            <Suspense>
                                <UpdateProductPage />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: 'categories',
                children: [
                    {
                        index: true,
                        path: '',
                        element: (
                            <Suspense>
                                <CategoryListPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'list',
                        element: (
                            <Suspense>
                                <CategoryListPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'create',
                        element: (
                            <Suspense>
                                <CreateCategoryPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: ':id/edit',
                        element: (
                            <Suspense>
                                <UpdateCategoryPage />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: 'tags',
                children: [
                    {
                        index: true,
                        path: '',
                        element: (
                            <Suspense>
                                <TagListPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'list',
                        element: (
                            <Suspense>
                                <TagListPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'create',
                        element: (
                            <Suspense>
                                <CreateTagPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: ':id/edit',
                        element: (
                            <Suspense>
                                <UpdateTagPage />
                            </Suspense>
                        ),
                    },
                ],
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
