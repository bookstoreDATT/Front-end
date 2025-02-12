import React, { lazy } from 'react';

// Client
export const HomePage = lazy(() => import('~/pages/Home/Home'));
export const SearchPage = lazy(() => import('~/pages/Search/SearchPage'));
export const ProductDetailPage = lazy(() => import('~/pages/ProductDetail/ProductDetail'));

export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<div>Loading</div>}>{children}</React.Suspense>;
};
