import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

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
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent 
                                        align="center" 
                                        className={item.megamenu ? "w-80 p-4" : "w-48"}
                                    >
                                        {item.megamenu ? (
                                            <div className="grid grid-cols-2 gap-4">
                                                {item.dropdown.map((section, sectionIndex) => (
                                                    <div key={sectionIndex}>
                                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                                            {section.category}
                                                        </p>
                                                        <div className="space-y-1">
                                                            {section.items.map((subItem, subIndex) => (
                                                                <DropdownMenuItem key={subIndex} asChild disabled={subItem.disabled}>
                                                                    {subItem.external ? (
                                                                        <a 
                                                                            href={subItem.href}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="w-full cursor-pointer text-sm flex items-center"
                                                                        >
                                                                            {subItem.label}
                                                                            <span className="ml-1 text-xs">↗</span>
                                                                        </a>
                                                                    ) : (
                                                                        <Link 
                                                                            to={subItem.href}
                                                                            className={`w-full cursor-pointer text-sm ${subItem.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                        >
                                                                            {subItem.label}
                                                                            {subItem.disabled && <span className="ml-1 text-xs text-rose-500">🔜</span>}
                                                                        </Link>
                                                                    )}
                                                                </DropdownMenuItem>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            item.dropdown.map((subItem, subIndex) => (
                                                <DropdownMenuItem key={subIndex} asChild>
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
                        <div className="relative">
                            {searchOpen ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Cari..."
                                        className="w-48 px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        autoFocus
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setSearchOpen(false)}
                                        className="h-9 w-9"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
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
                            {isOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden border-t border-gray-100 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
                    <div className="px-4 py-3 space-y-1">
                        {menuItems.map((item, index) => (
                            item.dropdown ? (
                                <div key={index} className="py-1">
                                    <div className="px-3 py-2 text-sm font-medium text-gray-900">
                                        {item.label}
                                    </div>
                                    <div className="pl-4 space-y-1">
                                        {item.dropdown.map((subItem, subIndex) => (
                                            <Link
                                                key={subIndex}
                                                to={subItem.href}
                                                className="block px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md"
                                            >
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    key={index}
                                    to={item.href}
                                    className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md"
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
