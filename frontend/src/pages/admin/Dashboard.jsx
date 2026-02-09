import { useState, useEffect } from 'react';
import { Users, Briefcase, Newspaper, UserCog, TrendingUp, ArrowUpRight, Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { teamAPI, servicesAPI, newsAPI, usersAPI, activityAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';
    
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        team: 0,
        services: 0,
        news: 0,
        users: 0,
    });
    const [activities, setActivities] = useState([]);

    // Fetch all stats and activities from database
    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                
                // Base API calls for all users
                const apiCalls = [
                    teamAPI.getAll(),
                    servicesAPI.getAll(),
                    newsAPI.getAll(),
                ];
                
                // Add admin-only API calls
                if (isAdmin) {
                    apiCalls.push(
                        usersAPI.getAll().catch(() => ({ data: { data: [] } })),
                        activityAPI.getAll({ limit: 5 }).catch(() => ({ data: { data: [] } }))
                    );
                }
                
                const results = await Promise.all(apiCalls);
                
                const [teamRes, servicesRes, newsRes] = results;
                
                setStats({
                    team: teamRes.data.data?.length || teamRes.data.pagination?.totalItems || 0,
                    services: servicesRes.data.data?.length || 0,
                    news: newsRes.data.data?.length || newsRes.data.pagination?.totalNews || 0,
                    users: isAdmin && results[3] ? results[3].data.data?.length || 0 : 0,
                });
                
                if (isAdmin && results[4]) {
                    setActivities(results[4].data.data || []);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [isAdmin]);

    // Stats cards - filter based on role
    const allStatsCards = [
        {
            title: 'Total Team',
            value: stats.team,
            icon: Users,
            color: 'bg-blue-500',
        },
        {
            title: 'Total Services',
            value: stats.services,
            icon: Briefcase,
            color: 'bg-emerald-500',
        },
        {
            title: 'Total News',
            value: stats.news,
            icon: Newspaper,
            color: 'bg-purple-500',
        },
        {
            title: 'Total Users',
            value: stats.users,
            icon: UserCog,
            color: 'bg-orange-500',
            adminOnly: true,
        },
    ];

    // Filter stats cards based on role
    const statsCards = allStatsCards.filter(stat => {
        if (stat.adminOnly && !isAdmin) {
            return false;
        }
        return true;
    });

    // Helper to format time ago
    const formatTimeAgo = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const diff = Math.floor((now - date) / 1000);
        
        if (diff < 60) return 'Baru saja';
        if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`;
        if (diff < 604800) return `${Math.floor(diff / 86400)} hari yang lalu`;
        return date.toLocaleDateString('id-ID');
    };

    // Helper to get action icon and color
    const getActionStyle = (action) => {
        switch(action) {
            case 'create': return { icon: Plus, color: 'text-green-600 bg-green-50' };
            case 'update': return { icon: Pencil, color: 'text-blue-600 bg-blue-50' };
            case 'delete': return { icon: Trash2, color: 'text-red-600 bg-red-50' };
            default: return { icon: TrendingUp, color: 'text-gray-600 bg-gray-50' };
        }
    };

    // Helper to translate resource name
    const translateResource = (resource) => {
        const map = {
            'news': 'Berita',
            'team': 'Tim',
            'service': 'Layanan',
            'publication': 'Publikasi',
            'gallery': 'Galeri',
            'user': 'User'
        };
        return map[resource] || resource;
    };

    // Helper to translate action
    const translateAction = (action) => {
        const map = {
            'create': 'Menambahkan',
            'update': 'Mengubah',
            'delete': 'Menghapus'
        };
        return map[action] || action;
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Selamat datang di Admin Panel Bank Wonogiri</p>
            </div>

            {/* Stats Cards */}
            <div className={`grid grid-cols-1 md:grid-cols-2 ${isAdmin ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}>
                {statsCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index} className="relative overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                        {loading ? (
                                            <div className="flex items-center mt-2">
                                                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                                            </div>
                                        ) : (
                                            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                        )}
                                    </div>
                                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Recent Activities & Quick Actions */}
            <div className={`grid grid-cols-1 ${isAdmin ? 'lg:grid-cols-2' : ''} gap-6`}>
                {/* Recent Activities - Admin Only */}
                {isAdmin && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" />
                                Aktivitas Terbaru
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {activities.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <TrendingUp className="w-10 h-10 mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">Belum ada aktivitas</p>
                                    </div>
                                ) : (
                                    activities.map((activity, index) => {
                                        const { icon: ActionIcon, color } = getActionStyle(activity.action);
                                        return (
                                            <div key={index} className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
                                                <div className={`p-2 rounded-lg ${color}`}>
                                                    <ActionIcon className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-gray-900 text-sm">
                                                        {translateAction(activity.action)} {translateResource(activity.resource)}
                                                    </p>
                                                    <p className="text-xs text-gray-600 truncate">"{activity.resourceName}"</p>
                                                    <p className="text-xs text-gray-400 mt-1">oleh {activity.userName}</p>
                                                </div>
                                                <span className="text-xs text-gray-400 whitespace-nowrap">
                                                    {formatTimeAgo(activity.createdAt)}
                                                </span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Quick Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Info</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-blue-900">Website Status</p>
                                    <p className="text-sm text-blue-600">Running smoothly</p>
                                </div>
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">Last Login</p>
                                    <p className="text-sm text-gray-600">Today, {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">Your Role</p>
                                    <p className="text-sm text-gray-600 capitalize">{user?.role || 'Unknown'}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">System Version</p>
                                    <p className="text-sm text-gray-600">v1.0.0</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;

