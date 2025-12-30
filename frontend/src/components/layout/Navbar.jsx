import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, ChevronDown, Loader2, FileText, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { searchAPI } from "@/lib/api";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState({ news: [], services: [] });
    const [searching, setSearching] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    // Menu items dengan dropdown
    const menuItems = [
        { label: "Home", href: "/" },
        { label: "Profil", href: "/profil" },
        {
            label: "Halaman",
            dropdown: [
                { label: "Kegiatan", href: "/kegiatan" },
                { label: "Galeri", href: "/galeri" },
                { label: "FAQ", href: "/faq" },
                { label: "Team", href: "/team" },
            ],
        },
        {
            label: "Layanan",
            megamenu: true,
            dropdown: [
                { 
                    category: "Existing Services",
                    items: [
                        { label: "Produk Layanan", href: "/layanan/produk" },
                        { label: "Pengajuan Kredit", href: "https://cdg.girisukadana.co.id/", external: true },
                        { label: "Simulasi Kredit", href: "https://cdg.girisukadana.co.id/web/simulations", external: true },
                        { label: "Whistleblowing System", href: "https://wbs.girisukadana.co.id/", external: true },
                        { label: "PPOB", href: "/layanan/ppob" },
                        { label: "EDC", href: "/layanan/edc" },
                        { label: "Joss WA", href: "/layanan/joss-wa" },
                    ]
                },
                { 
                    category: "Coming Soon",
                    items: [
                        { label: "SnapBank", href: "#", disabled: true },
                        { label: "Open API PPOB", href: "#", disabled: true },
                        { label: "GoDepo", href: "#", disabled: true },
                        { label: "GoTicketing", href: "#", disabled: true },
                    ]
                },
            ],
        },
        {
            label: "Informasi",
            dropdown: [
                { label: "Artikel Terkini", href: "/informasi/artikel" },
                { label: "Suku Bunga LPS", href: "/informasi/suku-bunga" },
                { label: "Pengaduan Nasabah", href: "/informasi/pengaduan" },
            ],
        },
        { label: "Publikasi", href: "/publikasi" },
        { label: "Hubungi Kami", href: "/hubungi" },
    ];

    // Debounce search
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults({ news: [], services: [] });
            return;
        }

        const timeoutId = setTimeout(async () => {
            try {
                setSearching(true);
                const response = await searchAPI.search(searchQuery);
                setSearchResults(response.data.data);
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setSearching(false);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Close search on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchOpen(false);
                setSearchQuery("");
                setSearchResults({ news: [], services: [] });
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleResultClick = (type, id) => {
        if (type === "news") {
            navigate(`/kegiatan/${id}`);
        } else {
            navigate(`/layanan/produk/${id}`);
        }
        setSearchOpen(false);
        setSearchQuery("");
        setSearchResults({ news: [], services: [] });
    };

    const hasResults = searchResults.news.length > 0 || searchResults.services.length > 0;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    
                    {/* Logo - Kiri */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <img 
                                src="https://bankwonogiri.co.id/public/uploads/logo.png" 
                                alt="Bank Wonogiri"
                                className="h-10 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Menu - Tengah (Desktop) */}
                    <div className="hidden lg:flex items-center gap-1">
                        {menuItems.map((item, index) => (
                            item.dropdown ? (
                                <DropdownMenu key={index}>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors">
                                            {item.label}
                                            <ChevronDown className="h-3 w-3" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start" className={`${item.megamenu ? 'w-[400px] p-4' : ''}`}>
                                        {item.megamenu ? (
                                            <div className="grid grid-cols-2 gap-4">
                                                {item.dropdown.map((categoryGroup, catIdx) => (
                                                    <div key={catIdx}>
                                                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">{categoryGroup.category}</h4>
                                                        <div className="space-y-1">
                                                            {categoryGroup.items.map((subItem, subIdx) => (
                                                                subItem.external ? (
                                                                    <a
                                                                        key={subIdx}
                                                                        href={subItem.href}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className={`block px-2 py-1.5 text-sm rounded ${subItem.disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'}`}
                                                                    >
                                                                        {subItem.disabled && '🔜 '}{subItem.label}{subItem.external && !subItem.disabled && ' ↗'}
                                                                    </a>
                                                                ) : (
                                                                    <Link
                                                                        key={subIdx}
                                                                        to={subItem.href}
                                                                        className={`block px-2 py-1.5 text-sm rounded ${subItem.disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'}`}
                                                                    >
                                                                        {subItem.disabled && '🔜 '}{subItem.label}
                                                                    </Link>
                                                                )
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            item.dropdown.map((subItem, subIdx) => (
                                                <DropdownMenuItem key={subIdx} asChild>
                                                    <Link
                                                        to={subItem.href}
                                                        className="w-full cursor-pointer"
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link
                                    key={index}
                                    to={item.href}
                                    className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    {item.label}
                                </Link>
                            )
                        ))}
                    </div>

                    {/* Search & Mobile Menu - Kanan */}
                    <div className="flex items-center gap-2">
                        {/* Search Button */}
                        <div className="relative" ref={searchRef}>
                            {searchOpen ? (
                                <div className="relative">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            placeholder="Cari berita atau layanan..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-64 px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            autoFocus
                                        />
                                        {searching && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                setSearchOpen(false);
                                                setSearchQuery("");
                                                setSearchResults({ news: [], services: [] });
                                            }}
                                            className="h-9 w-9"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    {/* Search Results Dropdown */}
                                    {searchQuery && (
                                        <div className="absolute top-full mt-2 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-100 max-h-96 overflow-auto z-50">
                                            {searching ? (
                                                <div className="p-4 text-center text-gray-500">
                                                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                                    Mencari...
                                                </div>
                                            ) : hasResults ? (
                                                <div>
                                                    {searchResults.news.length > 0 && (
                                                        <div className="p-2">
                                                            <h4 className="text-xs font-bold text-gray-500 uppercase px-2 mb-2 flex items-center gap-1">
                                                                <FileText className="w-3 h-3" /> Berita
                                                            </h4>
                                                            {searchResults.news.map((item) => (
                                                                <button
                                                                    key={item._id}
                                                                    onClick={() => handleResultClick("news", item._id)}
                                                                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md"
                                                                >
                                                                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                                                                    <p className="text-xs text-gray-500">{item.category}</p>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {searchResults.services.length > 0 && (
                                                        <div className="p-2 border-t border-gray-100">
                                                            <h4 className="text-xs font-bold text-gray-500 uppercase px-2 mb-2 flex items-center gap-1">
                                                                <Briefcase className="w-3 h-3" /> Layanan
                                                            </h4>
                                                            {searchResults.services.map((item) => (
                                                                <button
                                                                    key={item._id}
                                                                    onClick={() => handleResultClick("services", item._id)}
                                                                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md"
                                                                >
                                                                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                                                                    <p className="text-xs text-gray-500">{item.category}</p>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="p-4 text-center text-gray-500">
                                                    Tidak ada hasil untuk "{searchQuery}"
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSearchOpen(true)}
                                    className="h-9 w-9"
                                >
                                    <Search className="h-4 w-4" />
                                </Button>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden h-9 w-9"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100">
                    <div className="px-4 py-4 space-y-2">
                        {menuItems.map((item, index) => (
                            item.dropdown ? (
                                <div key={index} className="space-y-1">
                                    <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md">
                                        {item.label}
                                    </button>
                                    <div className="pl-4 space-y-1">
                                        {item.megamenu ? (
                                            item.dropdown.flatMap((cat, catIdx) => 
                                                cat.items
                                                    .filter(subItem => !subItem.disabled)
                                                    .map((subItem, subIdx) => 
                                                        subItem.external ? (
                                                            <a
                                                                key={`${catIdx}-${subIdx}`}
                                                                href={subItem.href}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="block px-3 py-1.5 text-sm text-gray-500 hover:text-red-600"
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                {subItem.label} ↗
                                                            </a>
                                                        ) : (
                                                            <Link
                                                                key={`${catIdx}-${subIdx}`}
                                                                to={subItem.href}
                                                                className="block px-3 py-1.5 text-sm text-gray-500 hover:text-red-600"
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                {subItem.label}
                                                            </Link>
                                                        )
                                                    )
                                            )
                                        ) : (
                                            item.dropdown.map((subItem, subIdx) => (
                                                <Link
                                                    key={subIdx}
                                                    to={subItem.href}
                                                    className="block px-3 py-1.5 text-sm text-gray-500 hover:text-red-600"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    key={index}
                                    to={item.href}
                                    className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
