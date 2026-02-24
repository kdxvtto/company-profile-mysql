import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, setAccessToken, clearAccessToken } from '@/lib/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const refreshResponse = await authAPI.refreshToken();
            const newToken = refreshResponse.data?.data?.accessToken;
            if (newToken) {
                setAccessToken(newToken);
                const profileResponse = await authAPI.getProfile();
                setUser(profileResponse.data.data);
            } else {
                clearAccessToken();
                setUser(null);
            }
        } catch (error) {
            clearAccessToken();
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const response = await authAPI.login({ email, password });
        
        const { token, data } = response.data; // Check response structure carefully
        // Note: backend response usually has 'data' property for user object
        
        setAccessToken(token);
        // Important: Set user immediately to avoid race condition
        setUser(data || response.data.user); 
        return response;
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } finally {
            clearAccessToken();
            setUser(null);
        }
    };

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
