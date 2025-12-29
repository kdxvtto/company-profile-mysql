import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Briefcase } from 'lucide-react';
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

const LayananDetailPage = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch service detail
    useEffect(() => {
        const fetchServiceDetail = async () => {
            try {
                setLoading(true);
                const response = await servicesAPI.getById(id);
                setService(response.data.data);
            } catch (error) {
                console.error('Error fetching service detail:', error);
                setError('Layanan tidak ditemukan');
            } finally {
                setLoading(false);
            }
        };

        fetchServiceDetail();
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

    if (error || !service) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="pt-24 flex flex-col items-center justify-center min-h-[60vh]">
                    <span className="text-6xl mb-4">🏦</span>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Layanan Tidak Ditemukan</h2>
                    <p className="text-gray-600 mb-6">Maaf, layanan yang Anda cari tidak tersedia.</p>
                    <Link 
                        to="/layanan/produk"
                        className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Produk Layanan
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
                        to="/layanan/produk"
                        className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Produk Layanan
                    </Link>

                    {/* Icon Badge */}
                    <div className="mb-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-700 rounded-full">
                            <Briefcase className="w-4 h-4" />
                            <span className="text-sm font-semibold">Produk Layanan</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                        {service.title}
                    </h1>

                    {/* Image */}
                    {service.image && (
                        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={getImageUrl(service.image)}
                                alt={service.title}
                                className="w-full h-auto max-h-[400px] object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {service.content}
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="mt-12 p-6 bg-gradient-to-br from-rose-50 to-slate-50 rounded-2xl text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Tertarik dengan layanan ini?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Hubungi kami untuk informasi lebih lanjut
                        </p>
                        <a
                            href="tel:0273324044"
                            className="inline-flex items-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors"
                        >
                            📞 (0273) 324044
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LayananDetailPage;
