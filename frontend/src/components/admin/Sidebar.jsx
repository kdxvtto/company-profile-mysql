import { NavLink, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Users, 
    Briefcase, 
    Newspaper, 
    UserCog,
    FileText,
    Settings,
    LogOut,
    X
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
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
            title: 'Publications',
            icon: FileText,
            path: '/admin/publications',
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

    const handleNavClick = () => {
        // Close sidebar on mobile after navigation
        if (onClose) onClose();
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-50 h-screen w-64 
                bg-gradient-to-b from-rose-50 via-rose-100 to-slate-100 text-slate-800
                transform transition-transform duration-300 ease-in-out
                lg:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Header with close button for mobile */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-rose-200">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://bankwonogiri.co.id/public/uploads/logo.png"
                            alt="Bank Wonogiri"
                            className="h-10 w-auto"
                        />
                    </div>
                    {/* Close button - only visible on mobile */}
                    <button 
                        onClick={onClose}
                        className="lg:hidden p-2 rounded-lg hover:bg-rose-200 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-8rem)]">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === '/admin'}
                                onClick={handleNavClick}
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
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-rose-200 bg-gradient-to-b from-rose-50 to-slate-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-600 hover:bg-rose-200 hover:text-red-600 transition-all duration-200"
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
