import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Loader2 } from 'lucide-react';
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

const KegiatanPage = () => {
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

    // Fetch news with category "Pengumuman"
    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await newsAPI.getAll();
                // Filter hanya news dengan kategori "Pengumuman"
                const pengumumanNews = (response.data.data || []).filter(
                    item => item.category === 'Pengumuman'
                );
                setNews(pengumumanNews);
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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-gray-900">Kegiatan </span>
                            <span className="text-rose-600">Bank Wonogiri</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Informasi terkini tentang kegiatan dan pengumuman dari PT BPR Bank Wonogiri
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
                                <article 
                                    key={item._id} 
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                                >
                                    {/* Image */}
                                    <div className="h-48 bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center">
                                        {item.image && item.image.length > 0 ? (
                                            <img
                                                src={getImageUrl(item.image[0])}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-5xl">📢</span>
                                        )}
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-rose-600 text-sm mb-3">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(item.date || item.createdAt)}</span>
                                        </div>
                                        <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 line-clamp-3">
                                            {item.content}
                                        </p>
                                        <Link 
                                            to={`/kegiatan/${item._id}`}
                                            className="mt-4 inline-block text-rose-600 font-semibold hover:text-rose-700 transition-colors"
                                        >
                                            Baca Selengkapnya →
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <span className="text-6xl mb-4 block">📭</span>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Kegiatan</h3>
                            <p className="text-gray-600">Kegiatan dan pengumuman akan ditampilkan di sini.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default KegiatanPage;
