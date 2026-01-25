import axios from 'axios';

// Untuk Vite, gunakan import.meta.env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important: enables cookies to be sent
});

// Request interceptor - add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle 401 and refresh token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If 401 and not already retrying
        if (error.response?.status === 401 && !originalRequest._retry) {
            // Skip refresh for login/register/refresh-token endpoints
            if (originalRequest.url.includes('/freyabpr/login') || 
                originalRequest.url.includes('/freyabpr/register') ||
                originalRequest.url.includes('/freyabpr/refresh-token')) {
                return Promise.reject(error);
            }

            if (isRefreshing) {
                // Queue requests while refreshing
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Call refresh token endpoint
                const response = await axios.post(
                    `${API_BASE_URL}/freyabpr/refresh-token`,
                    {},
                    { withCredentials: true }
                );

                const newToken = response.data.data.accessToken;
                localStorage.setItem('token', newToken);
                
                // Update authorization header
                api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                processQueue(null, newToken);
                
                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                
                // Refresh failed - clear token
                localStorage.removeItem('token');
                
                // Only redirect to login if on admin pages
                if (window.location.pathname.startsWith('/admin')) {
                    window.location.href = '/freyabpr/login';
                }
                
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

// ========================
// Auth API
// ========================
export const authAPI = {
    login: (credentials) => api.post('/freyabpr/login', credentials),
    register: (data) => api.post('/freyabpr/register', data),
    logout: () => api.post('/freyabpr/logout'),
    getProfile: () => api.get('/freyabpr/profile'),
    updateProfile: (data) => api.put('/freyabpr/profile', data),
    changePassword: (data) => api.put('/freyabpr/change-password', data),
    refreshToken: () => api.post('/freyabpr/refresh-token'),
};

// ========================
// Team Profile API
// ========================
export const teamAPI = {
    getAll: (params = {}) => api.get('/team-profiles', { params }),
    getById: (id) => api.get(`/team-profiles/${id}`),
    create: (data) => api.post('/team-profiles', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    update: (id, data) => api.put(`/team-profiles/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    delete: (id) => api.delete(`/team-profiles/${id}`),
};

// ========================
// Services API
// ========================
export const servicesAPI = {
    getAll: () => api.get('/services'),
    getById: (id) => api.get(`/services/${id}`),
    create: (data) => api.post('/services', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    update: (id, data) => api.put(`/services/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    delete: (id) => api.delete(`/services/${id}`),
};

// ========================
// News API
// ========================
export const newsAPI = {
    getAll: (params = {}) => api.get('/news', { params }),
    getById: (id) => api.get(`/news/${id}`),
    create: (data) => api.post('/news', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    update: (id, data) => api.put(`/news/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    }),
    delete: (id) => api.delete(`/news/${id}`),
};

// ========================
// Users API
// ========================
export const usersAPI = {
    getAll: () => api.get('/users'),
    getById: (id) => api.get(`/users/${id}`),
    create: (data) => api.post('/users', data),
    update: (id, data) => api.put(`/users/${id}`, data),
    delete: (id) => api.delete(`/users/${id}`),
};

// ========================
// Search API
// ========================
export const searchAPI = {
    search: (query) => api.get(`/search?q=${encodeURIComponent(query)}`),
};

// ========================
// Publications API
// ========================
export const publicationsAPI = {
    getAll: (params = {}) => api.get('/publications', { params }),
    getById: (id) => api.get(`/publications/${id}`),
    create: (formData) => api.post('/publications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id, formData) => api.put(`/publications/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id) => api.delete(`/publications/${id}`),
};

// ========================
// Gallery API
// ========================
export const galleryAPI = {
    getAll: (params = {}) => api.get('/gallery', { params }),
    getById: (id) => api.get(`/gallery/${id}`),
    create: (formData) => api.post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id, formData) => api.put(`/gallery/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id) => api.delete(`/gallery/${id}`),
};

// ========================
// Activity Log API
// ========================
export const activityAPI = {
    getAll: (params = {}) => api.get('/activity', { params }),
};

export default api;
