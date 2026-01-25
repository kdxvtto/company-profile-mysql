import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    console.log('[ProtectedRoute] Loading:', loading, 'Authenticated:', isAuthenticated);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-red-600 mx-auto" />
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        console.log('[ProtectedRoute] Not authenticated, redirecting to login');
        return <Navigate to="/freyabpr/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
