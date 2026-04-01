import { useState, useEffect } from 'react';
import { Image, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { galleryAPI } from '@/lib/api';
import { getMediaUrl } from '@/lib/mediaUrl';

const GaleriPage = () => {
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            setLoading(true);
            const response = await galleryAPI.getAll({ limit: 50 });
            setGallery(response.data.data || []);
        } catch (error) {
            console.error('Error fetching gallery:', error);
        } finally {
            setLoading(false);
        }
    };

    const openLightbox = (item, index) => {
        setSelectedImage(item);
        setSelectedIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const goToPrevious = () => {
        const newIndex = selectedIndex === 0 ? gallery.length - 1 : selectedIndex - 1;
        setSelectedIndex(newIndex);
        setSelectedImage(gallery[newIndex]);
    };

    const goToNext = () => {
        const newIndex = selectedIndex === gallery.length - 1 ? 0 : selectedIndex + 1;
        setSelectedIndex(newIndex);
        setSelectedImage(gallery[newIndex]);
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'ArrowRight') goToNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, selectedIndex]);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-rose-50 via-white to-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Image className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-gray-900">Galeri </span>
                            <span className="text-rose-600">Kegiatan</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Dokumentasi kegiatan dan momen penting PT BPR Bank Wonogiri
                        </p>
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 animate-spin text-rose-600" />
                        </div>
                    ) : gallery.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            <Image className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-xl">Belum ada galeri</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {gallery.map((item, index) => (
                                <div
                                    key={item._id}
                                    onClick={() => openLightbox(item, index)}
                                    className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100"
                                >
                                    <div className="aspect-[4/3] overflow-hidden">
                                        {item.image?.[0] ? (
                                            <img
                                                src={getMediaUrl(item.image[0])}
                                                alt={item.title}
                                                width={400}
                                                height={300}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                <Image className="w-12 h-12 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* Previous Button */}
                    {gallery.length > 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                            className="absolute left-4 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                    )}

                    {/* Image */}
                    <div
                        className="max-w-5xl w-full max-h-[90vh] flex flex-col mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex-1 flex items-center justify-center overflow-hidden">
                            <img
                                src={getMediaUrl(selectedImage.image?.[0])}
                                alt={selectedImage.title}
                                loading="eager"
                                decoding="async"
                                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="text-xl font-bold text-white mb-2">
                                {selectedImage.title}
                            </h3>
                            <p className="text-gray-300">
                                {selectedImage.content}
                            </p>
                            <p className="text-white/50 text-sm mt-2">
                                {selectedIndex + 1} / {gallery.length}
                            </p>
                        </div>
                    </div>

                    {/* Next Button */}
                    {gallery.length > 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); goToNext(); }}
                            className="absolute right-4 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>
                    )}
                </div>
            )}

            <Footer />
        </div>
    );
};

export default GaleriPage;
