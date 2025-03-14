import { useTypedSelector } from '~/store/store';
import { Navigate } from 'react-router';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const user = useTypedSelector((state) => state.auth.user);
    const isAdmin = user?.role === 'admin';
    if (!user || !isAdmin) {
        return <Navigate to={'/'} replace />;
    }
    return children;
}
