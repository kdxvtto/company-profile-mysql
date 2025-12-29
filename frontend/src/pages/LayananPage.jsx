import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Loader2, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { servicesAPI } from '@/lib/api';

// Base URL untuk gambar dari backend
const API_BASE_URL = 'http://localhost:3000';

// Helper function untuk mendapatkan URL gambar yang benar
const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
};

const LayananPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('Semua');

    // Filter options
    const filterOptions = [
        { label: 'Semua', value: 'Semua' },
        { label: 'Kredit', value: 'Kredit' },
        { label: 'Tabungan', value: 'Tabungan' },
    ];

    // Fetch services data
    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const response = await servicesAPI.getAll();
                setServices(response.data.data || []);
            } catch (error) {
                console.error('Error fetching services:', error);
                setServices([]);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    // Filter services based on active filter
    const filteredServices = services.filter((service) => {
        if (activeFilter === 'Semua') return true;
        if (activeFilter === 'Tabungan') {
            // Tabungan includes Tabungan and Deposito
            return service.category === 'Tabungan' || service.category === 'Deposito';
        }
        return service.category === activeFilter;
    });

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-rose-50 via-white to-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-gray-900">Produk </span>
                            <span className="text-rose-600">Layanan</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Berbagai produk dan layanan perbankan untuk memenuhi kebutuhan Anda
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter Tabs */}
            <section className="py-8 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center gap-2">
                        {filterOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setActiveFilter(option.value)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                                    activeFilter === option.value
                                        ? 'bg-rose-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 animate-spin text-rose-600" />
                        </div>
                    ) : filteredServices.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredServices.map((service) => (
                                <Link
                                    key={service._id}
                                    to={`/layanan/produk/${service._id}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                                >
                                    {/* Image */}
                                    <div className="h-48 bg-gradient-to-br from-rose-400 to-rose-600 overflow-hidden relative">
                                        {service.image ? (
                                            <img
                                                src={getImageUrl(service.image)}
                                                alt={service.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-5xl">🏦</span>
                                            </div>
                                        )}
                                        {/* Category Badge */}
                                        <div className="absolute top-3 right-3">
                                            <span className="px-3 py-1 bg-white/90 text-rose-600 text-xs font-semibold rounded-full">
                                                {service.category || 'Kredit'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 line-clamp-3 mb-4">
                                            {service.content}
                                        </p>
                                        <div className="flex items-center text-rose-600 font-semibold group-hover:gap-2 transition-all">
                                            <span>Lihat Detail</span>
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <span className="text-6xl mb-4 block">🏦</span>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {activeFilter === 'Semua' ? 'Belum Ada Layanan' : `Belum Ada Produk ${activeFilter}`}
                            </h3>
                            <p className="text-gray-600">Data layanan akan ditampilkan di sini.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LayananPage;
