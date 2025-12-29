import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Loader2, Newspaper } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { newsAPI } from '@/lib/api';

// Base URL untuk gambar dari backend
const API_BASE_URL = 'http://localhost:3000';

// Helper function untuk mendapatkan URL gambar yang benar
const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
};

const ArtikelPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    // Fetch news with category selain "Pengumuman"
    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await newsAPI.getAll();
                // Filter news yang BUKAN kategori "Pengumuman"
                const artikelNews = (response.data.data || []).filter(
                    item => item.category !== 'Pengumuman'
                );
                setNews(artikelNews);
            } catch (error) {
                console.error('Error fetching news:', error);
                setNews([]);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-rose-50 via-white to-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Newspaper className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-gray-900">Artikel </span>
                            <span className="text-rose-600">Terkini</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Berita dan informasi terbaru seputar Bank Wonogiri
                        </p>
                    </div>
                </div>
            </section>

            {/* News Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 animate-spin text-rose-600" />
                        </div>
                    ) : news.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {news.map((item) => (
                                <Link
                                    key={item._id}
                                    to={`/kegiatan/${item._id}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                                >
                                    {/* Image */}
                                    <div className="h-48 bg-gradient-to-br from-rose-400 to-rose-600 overflow-hidden relative">
                                        {item.image && item.image.length > 0 ? (
                                            <img
                                                src={getImageUrl(item.image[0])}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-5xl">📰</span>
                                            </div>
                                        )}
                                        {/* Category Badge */}
                                        <div className="absolute top-3 right-3">
                                            <span className="px-3 py-1 bg-white/90 text-rose-600 text-xs font-semibold rounded-full">
                                                {item.category || 'Berita'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-rose-600 text-sm mb-3">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(item.date || item.createdAt)}</span>
                                        </div>
                                        <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-rose-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 line-clamp-3">
                                            {item.content}
                                        </p>
                                        <span className="mt-4 inline-block text-rose-600 font-semibold">
                                            Baca Selengkapnya →
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <span className="text-6xl mb-4 block">📰</span>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Artikel</h3>
                            <p className="text-gray-600">Artikel berita akan ditampilkan di sini.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ArtikelPage;
