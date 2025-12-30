import { NavLink, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Users, 
    Briefcase, 
    Newspaper, 
    UserCog,
    Settings,
    LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Sidebar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const menuItems = [
        {
            title: 'Dashboard',
            icon: LayoutDashboard,
            path: '/admin',
        },
        {
            title: 'Team Profile',
            icon: Users,
            path: '/admin/team',
        },
        {
            title: 'Services',
            icon: Briefcase,
            path: '/admin/services',
        },
        {
            title: 'News',
            icon: Newspaper,
            path: '/admin/news',
        },
        {
            title: 'Users',
            icon: UserCog,
            path: '/admin/users',
        },
        {
            title: 'Settings',
            icon: Settings,
            path: '/admin/settings',
        },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="fixed top-0 left-0 z-40 h-screen w-64 bg-gradient-to-b from-rose-50 via-rose-100 to-slate-100 text-slate-800">
            {/* Logo */}
            <div className="flex items-center h-16 px-4 border-b border-rose-200">
                <div className="flex items-center gap-3">
                    <img
                        src="https://bankwonogiri.co.id/public/uploads/logo.png"
                        alt="Bank Wonogiri"
                        className="h-10 w-auto"
                    />
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/admin'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                    isActive
                                        ? 'bg-rose-500 text-white shadow-lg'
                                        : 'text-slate-600 hover:bg-rose-200 hover:text-slate-800'
                                }`
                            }
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            <span className="font-medium">{item.title}</span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-rose-200">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-600 hover:bg-rose-200 hover:text-red-600 transition-all duration-200"
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
