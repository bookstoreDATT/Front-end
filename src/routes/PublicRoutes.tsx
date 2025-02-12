import ErrorPage from '~/pages/Error/ErrorPage';
import MainLayout from '../layouts/client/MainLayout';
import { HomePage, SearchPage, Suspense } from './LazyRoutes';

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
        ],
    },
];

export default PublicRoutes;
