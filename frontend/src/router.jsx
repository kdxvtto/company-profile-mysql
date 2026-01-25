import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PageLoader from './components/PageLoader';

// App (non-lazy for initial load)
import App from './App';

// Lazy load public pages
const ProfilPage = lazy(() => import('./pages/ProfilPage'));
const KegiatanPage = lazy(() => import('./pages/KegiatanPage'));
const NewsDetailPage = lazy(() => import('./pages/NewsDetailPage'));
const GaleriPage = lazy(() => import('./pages/GaleriPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const TeamPublicPage = lazy(() => import('./pages/TeamPublicPage'));
const LayananPage = lazy(() => import('./pages/LayananPage'));
const LayananDetailPage = lazy(() => import('./pages/LayananDetailPage'));
const PPOBPage = lazy(() => import('./pages/PPOBPage'));
const EDCPage = lazy(() => import('./pages/EDCPage'));
const ArtikelPage = lazy(() => import('./pages/ArtikelPage'));
const SukuBungaPage = lazy(() => import('./pages/SukuBungaPage'));
const PengaduanPage = lazy(() => import('./pages/PengaduanPage'));
const PublikasiPage = lazy(() => import('./pages/PublikasiPage'));
const HubungiKamiPage = lazy(() => import('./pages/HubungiKamiPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));

// Lazy load auth pages
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));

// Lazy load admin pages
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const TeamPage = lazy(() => import('./pages/admin/TeamPage'));
const ServicesPage = lazy(() => import('./pages/admin/ServicesPage'));
const NewsPage = lazy(() => import('./pages/admin/NewsPage'));
const AdminPublicationsPage = lazy(() => import('./pages/admin/PublicationsPage'));
const AdminGalleryPage = lazy(() => import('./pages/admin/GalleryPage'));
const UsersPage = lazy(() => import('./pages/admin/UsersPage'));
const SettingsPage = lazy(() => import('./pages/admin/SettingsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Protected Route (non-lazy, small component)
import ProtectedRoute from './components/auth/ProtectedRoute';

// Wrapper for lazy components
const LazyWrapper = ({ children }) => (
    <Suspense fallback={<PageLoader />}>
        {children}
    </Suspense>
);

const router = createBrowserRouter([
    // Public routes
    {
        path: '/',
        element: <App />,
        errorElement: <LazyWrapper><NotFoundPage /></LazyWrapper>,
    },
    {
        path: '/profil',
        element: <LazyWrapper><ProfilPage /></LazyWrapper>,
    },
    {
        path: '/kegiatan',
        element: <LazyWrapper><KegiatanPage /></LazyWrapper>,
    },
    {
        path: '/kegiatan/:id',
        element: <LazyWrapper><NewsDetailPage /></LazyWrapper>,
    },
    {
        path: '/galeri',
        element: <LazyWrapper><GaleriPage /></LazyWrapper>,
    },
    {
        path: '/faq',
        element: <LazyWrapper><FAQPage /></LazyWrapper>,
    },
    {
        path: '/team',
        element: <LazyWrapper><TeamPublicPage /></LazyWrapper>,
    },
    {
        path: '/layanan/produk',
        element: <LazyWrapper><LayananPage /></LazyWrapper>,
    },
    {
        path: '/layanan/produk/:id',
        element: <LazyWrapper><LayananDetailPage /></LazyWrapper>,
    },
    {
        path: '/layanan/ppob',
        element: <LazyWrapper><PPOBPage /></LazyWrapper>,
    },
    {
        path: '/layanan/edc',
        element: <LazyWrapper><EDCPage /></LazyWrapper>,
    },
    {
        path: '/informasi/artikel',
        element: <LazyWrapper><ArtikelPage /></LazyWrapper>,
    },
    {
        path: '/informasi/suku-bunga',
        element: <LazyWrapper><SukuBungaPage /></LazyWrapper>,
    },
    {
        path: '/informasi/pengaduan',
        element: <LazyWrapper><PengaduanPage /></LazyWrapper>,
    },
    {
        path: '/publikasi',
        element: <LazyWrapper><PublikasiPage /></LazyWrapper>,
    },
    {
        path: '/hubungi',
        element: <LazyWrapper><HubungiKamiPage /></LazyWrapper>,
    },
    {
        path: '/terms',
        element: <LazyWrapper><TermsPage /></LazyWrapper>,
    },
    {
        path: '/privacy',
        element: <LazyWrapper><PrivacyPage /></LazyWrapper>,
    },
    // Auth routes (hidden path)
    {
        path: '/freyabpr/login',
        element: <LazyWrapper><LoginPage /></LazyWrapper>,
    },
    {
        path: '/freyabpr/register',
        element: <LazyWrapper><RegisterPage /></LazyWrapper>,
    },
    // Admin routes (protected)
    {
        path: '/admin',
        element: (
            <ProtectedRoute>
                <LazyWrapper>
                    <AdminLayout />
                </LazyWrapper>
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <LazyWrapper><Dashboard /></LazyWrapper>,
            },
            {
                path: 'team',
                element: <LazyWrapper><TeamPage /></LazyWrapper>,
            },
            {
                path: 'services',
                element: <LazyWrapper><ServicesPage /></LazyWrapper>,
            },
            {
                path: 'news',
                element: <LazyWrapper><NewsPage /></LazyWrapper>,
            },
            {
                path: 'publications',
                element: <LazyWrapper><AdminPublicationsPage /></LazyWrapper>,
            },
            {
                path: 'gallery',
                element: <LazyWrapper><AdminGalleryPage /></LazyWrapper>,
            },
            {
                path: 'users',
                element: <LazyWrapper><UsersPage /></LazyWrapper>,
            },
            {
                path: 'settings',
                element: <LazyWrapper><SettingsPage /></LazyWrapper>,
            },
        ],
    },
    // Catch all - 404
    {
        path: '*',
        element: <LazyWrapper><NotFoundPage /></LazyWrapper>,
    },
]);

export default router;
