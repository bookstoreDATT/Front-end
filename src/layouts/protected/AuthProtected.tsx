import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTypedSelector } from '~/store/store';

export default function AuthProtected({
    children,
    protectedType,
}: {
    // pageType: 'account' | 'auth' | 'order';
    children: React.ReactNode;
    protectedType: 'logged' | 'not-logged';
}) {
    const user = useTypedSelector((state) => state.auth.user);
    const cartItems = useTypedSelector((state) => state.cart.items);

    if (protectedType === 'logged' && user && cartItems.length === 0) {
        return <Navigate to={'/'} />;
    }
    if (protectedType === 'not-logged' && !user) {
        return <Navigate to={'/auth/login'} />;
    }

    return <>{children}</>;
}
