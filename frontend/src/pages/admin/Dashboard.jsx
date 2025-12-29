import { useState, useEffect } from 'react';
import { Users, Briefcase, Newspaper, UserCog, TrendingUp, ArrowUpRight, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { teamAPI, servicesAPI, newsAPI, usersAPI } from '@/lib/api';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        team: 0,
        services: 0,
        news: 0,
        users: 0,
    });

    // Fetch all stats from database
    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const [teamRes, servicesRes, newsRes, usersRes] = await Promise.all([
                    teamAPI.getAll(),
                    servicesAPI.getAll(),
                    newsAPI.getAll(),
                    usersAPI.getAll(),
                ]);

                setStats({
                    team: teamRes.data.data?.length || 0,
                    services: servicesRes.data.data?.length || 0,
                    news: newsRes.data.data?.length || 0,
                    users: usersRes.data.data?.length || 0,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statsCards = [
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
        },
    ];

    const recentActivities = [
        { action: 'Added new team member', user: 'Admin', time: '2 hours ago' },
        { action: 'Updated service "Kredit Umum"', user: 'Admin', time: '3 hours ago' },
        { action: 'Published new article', user: 'Admin', time: '5 hours ago' },
        { action: 'Deleted old news', user: 'Admin', time: '1 day ago' },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Selamat datang di Admin Panel Bank Wonogiri</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" />
                            Recent Activities
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                    <div>
                                        <p className="font-medium text-gray-900">{activity.action}</p>
                                        <p className="text-sm text-gray-500">by {activity.user}</p>
                                    </div>
                                    <span className="text-sm text-gray-400">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

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
