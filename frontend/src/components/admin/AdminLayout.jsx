import { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell, Search, User, Menu, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { searchAPI } from '@/lib/api';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [searching, setSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/freyabpr/login');
    };

    // Search handler with debounce
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim().length >= 2) {
                setSearching(true);
                try {
                    const response = await searchAPI.search(searchQuery);
                    setSearchResults(response.data.data);
                    setShowResults(true);
                } catch (error) {
                    console.error('Search error:', error);
                }
                setSearching(false);
            } else {
                setSearchResults(null);
                setShowResults(false);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Close search on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Navigate to admin page based on result type
    const handleResultClick = (type, id) => {
        setShowResults(false);
        setSearchQuery('');
        switch(type) {
            case 'news': navigate('/admin/news'); break;
            case 'services': navigate('/admin/services'); break;
            case 'publications': navigate('/admin/publications'); break;
            case 'teamProfiles': navigate('/admin/team'); break;
            case 'gallery': navigate('/admin/gallery'); break;
            default: break;
        }
    };

    const hasResults = searchResults && (
        searchResults.news?.length > 0 ||
        searchResults.services?.length > 0 ||
        searchResults.publications?.length > 0 ||
        searchResults.teamProfiles?.length > 0 ||
        searchResults.gallery?.length > 0
    );

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content */}
            <div className="lg:ml-64 transition-all duration-300">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between h-16 px-4 lg:px-6">
                        {/* Left side */}
                        <div className="flex items-center gap-4">
                            {/* Hamburger menu for mobile */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <Menu className="w-6 h-6" />
                            </button>

                            {/* Search - hide on mobile */}
                            <div className="hidden sm:flex items-center relative" ref={searchRef}>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Cari..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                                        className="pl-10 pr-8 w-48 md:w-64 bg-gray-50 border-gray-200"
                                    />
                                    {searchQuery && (
                                        <button 
                                            onClick={() => { setSearchQuery(''); setShowResults(false); }}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                {/* Search Results Dropdown */}
                                {showResults && (
                                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-y-auto">
                                        {searching ? (
                                            <div className="p-4 flex items-center justify-center">
                                                <Loader2 className="w-5 h-5 animate-spin text-rose-600" />
                                            </div>
                                        ) : hasResults ? (
                                            <div className="p-2">
                                                {searchResults.news?.length > 0 && (
                                                    <div className="mb-2">
                                                        <p className="text-xs font-semibold text-gray-500 px-2 mb-1">BERITA</p>
                                                        {searchResults.news.map(item => (
                                                            <button
                                                                key={item._id}
                                                                onClick={() => handleResultClick('news', item._id)}
                                                                className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded text-sm"
                                                            >
                                                                {item.title}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                                {searchResults.services?.length > 0 && (
                                                    <div className="mb-2">
                                                        <p className="text-xs font-semibold text-gray-500 px-2 mb-1">LAYANAN</p>
                                                        {searchResults.services.map(item => (
                                                            <button
                                                                key={item._id}
                                                                onClick={() => handleResultClick('services', item._id)}
                                                                className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded text-sm"
                                                            >
                                                                {item.title}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                                {searchResults.teamProfiles?.length > 0 && (
                                                    <div className="mb-2">
                                                        <p className="text-xs font-semibold text-gray-500 px-2 mb-1">TIM</p>
                                                        {searchResults.teamProfiles.map(item => (
                                                            <button
                                                                key={item._id}
                                                                onClick={() => handleResultClick('teamProfiles', item._id)}
                                                                className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded text-sm"
                                                            >
                                                                {item.name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                                {searchResults.publications?.length > 0 && (
                                                    <div className="mb-2">
                                                        <p className="text-xs font-semibold text-gray-500 px-2 mb-1">PUBLIKASI</p>
                                                        {searchResults.publications.map(item => (
                                                            <button
                                                                key={item._id}
                                                                onClick={() => handleResultClick('publications', item._id)}
                                                                className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded text-sm"
                                                            >
                                                                {item.name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                                {searchResults.gallery?.length > 0 && (
                                                    <div className="mb-2">
                                                        <p className="text-xs font-semibold text-gray-500 px-2 mb-1">GALERI</p>
                                                        {searchResults.gallery.map(item => (
                                                            <button
                                                                key={item._id}
                                                                onClick={() => handleResultClick('gallery', item._id)}
                                                                className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded text-sm"
                                                            >
                                                                {item.title}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="p-4 text-center text-gray-500 text-sm">
                                                Tidak ada hasil untuk "{searchQuery}"
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-2">
                            {/* Notifications */}
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </Button>

                            {/* User Menu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="hidden md:block text-sm font-medium">{user?.name || 'Admin'}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem asChild>
                                        <Link to="/admin/settings" className="cursor-pointer w-full">
                                            Settings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
