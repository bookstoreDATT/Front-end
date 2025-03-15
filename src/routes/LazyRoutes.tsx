import React, { lazy } from 'react';

// Client
export const HomePage = lazy(() => import('~/pages/Home/Home'));
export const SearchPage = lazy(() => import('~/pages/Search/SearchPage'));
export const ProductDetailPage = lazy(() => import('~/pages/ProductDetail/ProductDetail'));
export const RegisterPage = lazy(() => import('~/pages/Auth/Register/Register'));
export const LoginPage = lazy(() => import('~/pages/Auth/Login/Login'));
export const AccountPage = lazy(() => import('~/pages/account/MyAccount'));
export const CartDetail = lazy(() => import('~/pages/Cart/CartDetail'));
export const Checkout = lazy(() => import('~/pages/Order/Checkout'));
export const MyOrdersPage = lazy(() => import('~/pages/account/MyOrders/MyOrders'));
export const MyOrderDetailPage = lazy(() => import('~/pages/account/MyOrders/OrderDetail/OrderDetailPage'));
export const OrderSuccess = lazy(() => import('~/pages/Order/OrderSuccessPage'));
export const OrderError = lazy(() => import('~/pages/Order/OrderError'));

// Admin

export const OrdersListPage = lazy(() => import('~/pages/admin/_order_/ManageOrder'));
export const OrderDetailPage = lazy(() => import('~/pages/admin/_order_/OrderDetails'));
export const ProductListPage = lazy(() => import('~/pages/admin/_product_/ProductList'));
export const CreateProductPage = lazy(() => import('~/pages/admin/_product_/CreateProduct'));
export const UpdateProductPage = lazy(() => import('~/pages/admin/_product_/UpdateProduct'));

export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<div>Loading</div>}>{children}</React.Suspense>;
};
