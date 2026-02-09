import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

/**
 * Route protection untuk halaman yang hanya bisa diakses admin
 * Staff akan di-redirect ke dashboard
 */
const AdminOnlyRoute = ({ children }) => {
    const { user } = useAuth();

    if (user?.role !== 'admin') {
        return <Navigate to="/admin" replace />;
    }

    return children;
};

export default AdminOnlyRoute;
