import { createBrowserRouter } from 'react-router-dom';

// Public pages
import App from './App';
import ProfilPage from './pages/ProfilPage';
import KegiatanPage from './pages/KegiatanPage';
import NewsDetailPage from './pages/NewsDetailPage';
import GaleriPage from './pages/GaleriPage';
import FAQPage from './pages/FAQPage';
import TeamPublicPage from './pages/TeamPublicPage';
import LayananPage from './pages/LayananPage';
import LayananDetailPage from './pages/LayananDetailPage';
import PPOBPage from './pages/PPOBPage';
import EDCPage from './pages/EDCPage';
import ArtikelPage from './pages/ArtikelPage';
import SukuBungaPage from './pages/SukuBungaPage';
import PengaduanPage from './pages/PengaduanPage';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Admin pages
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import TeamPage from './pages/admin/TeamPage';
import ServicesPage from './pages/admin/ServicesPage';
import NewsPage from './pages/admin/NewsPage';
import UsersPage from './pages/admin/UsersPage';

// Protected Route
import ProtectedRoute from './components/auth/ProtectedRoute';

const router = createBrowserRouter([
    // Public routes
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/profil',
        element: <ProfilPage />,
    },
    {
        path: '/kegiatan',
        element: <KegiatanPage />,
    },
    {
        path: '/kegiatan/:id',
        element: <NewsDetailPage />,
    },
    {
        path: '/galeri',
        element: <GaleriPage />,
    },
    {
        path: '/faq',
        element: <FAQPage />,
    },
    {
        path: '/team',
        element: <TeamPublicPage />,
    },
    {
        path: '/layanan/produk',
        element: <LayananPage />,
    },
    {
        path: '/layanan/produk/:id',
        element: <LayananDetailPage />,
    },
    {
        path: '/layanan/ppob',
        element: <PPOBPage />,
    },
    {
        path: '/layanan/edc',
        element: <EDCPage />,
    },
    {
        path: '/informasi/artikel',
        element: <ArtikelPage />,
    },
    {
        path: '/informasi/suku-bunga',
        element: <SukuBungaPage />,
    },
    {
        path: '/informasi/pengaduan',
        element: <PengaduanPage />,
    },
    // Auth routes
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    // Admin routes (protected)
    {
        path: '/admin',
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: 'team',
                element: <TeamPage />,
            },
            {
                path: 'services',
                element: <ServicesPage />,
            },
            {
                path: 'news',
                element: <NewsPage />,
            },
            {
                path: 'users',
                element: <UsersPage />,
            },
        ],
    },
]);

export default router;
