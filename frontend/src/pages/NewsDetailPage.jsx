import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Loader2 } from 'lucide-react';
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

const NewsDetailPage = () => {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    // Fetch news detail
    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                setLoading(true);
                const response = await newsAPI.getById(id);
                setNews(response.data.data);
            } catch (error) {
                console.error('Error fetching news detail:', error);
                setError('Berita tidak ditemukan');
            } finally {
                setLoading(false);
            }
        };

        fetchNewsDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="pt-24 flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-10 h-10 animate-spin text-rose-600" />
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !news) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="pt-24 flex flex-col items-center justify-center min-h-[60vh]">
                    <span className="text-6xl mb-4">📭</span>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Berita Tidak Ditemukan</h2>
                    <p className="text-gray-600 mb-6">Maaf, berita yang Anda cari tidak tersedia.</p>
                    <Link 
                        to="/kegiatan"
                        className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Kegiatan
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Content */}
            <section className="pt-24 pb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Link */}
                    <Link 
                        to="/kegiatan"
                        className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Kegiatan
                    </Link>

                    {/* Category Badge */}
                    <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-rose-100 text-rose-700 text-sm font-semibold rounded-full">
                            {news.category || 'Berita'}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {news.title}
                    </h1>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-gray-500 mb-6">
                        <Calendar className="w-5 h-5" />
                        <span>{formatDate(news.date || news.createdAt)}</span>
                    </div>

                    {/* Image */}
                    {news.image && news.image.length > 0 && (
                        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={getImageUrl(news.image[0])}
                                alt={news.title}
                                className="w-full h-auto max-h-[400px] object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {news.content}
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default NewsDetailPage;

