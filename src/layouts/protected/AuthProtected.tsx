import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTypedSelector } from '~/store/store';

export default function AuthProtected({
    pageType,
    children,
}: {
    pageType: 'account' | 'auth';
    children: React.ReactNode;
}) {
    const user = useTypedSelector((state) => state.auth.user);
    if (pageType === 'auth' && user) {
        return <Navigate to={'/'} />;
    }
    if (pageType === 'account' && !user) {
        return <Navigate to={'/auth/login'} />;
    }
    return <>{children}</>;
}
