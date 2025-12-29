import { useState } from 'react';
import { X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const GaleriPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    // Data galeri dengan link foto
    const galleryItems = [
        {
            id: 1,
            image: 'https://bankwonogiri.co.id/public/uploads/photo-17.JPG',
            title: 'Kegiatan Bank Wonogiri',
            description: 'Dokumentasi kegiatan operasional dan pelayanan nasabah Bank Wonogiri.',
        },
        {
            id: 2,
            image: 'https://bankwonogiri.co.id/public/uploads/photo-16.JPG',
            title: 'Pelayanan Prima',
            description: 'Tim Bank Wonogiri memberikan pelayanan terbaik kepada setiap nasabah.',
        },
        {
            id: 3,
            image: 'https://bankwonogiri.co.id/public/uploads/photo-15.png',
            title: 'Acara Khusus',
            description: 'Dokumentasi acara dan kegiatan khusus Bank Wonogiri.',
        },
        {
            id: 4,
            image: 'https://bankwonogiri.co.id/public/uploads/photo-14.JPG',
            title: 'Kerjasama Mitra',
            description: 'Kerjasama dengan berbagai mitra untuk meningkatkan layanan.',
        },
        {
            id: 5,
            image: 'https://bankwonogiri.co.id/public/uploads/photo-13.JPG',
            title: 'Komunitas',
            description: 'Bank Wonogiri aktif dalam kegiatan sosial dan komunitas.',
        },
        {
            id: 6,
            image: 'https://bankwonogiri.co.id/public/uploads/photo-12.JPG',
            title: 'Tim Profesional',
            description: 'Tim profesional Bank Wonogiri siap melayani kebutuhan Anda.',
        },
    ];

    const openLightbox = (item) => {
        setSelectedImage(item);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-rose-50 via-white to-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-gray-900">Galeri </span>
                            <span className="text-rose-600">Bank Wonogiri</span>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {galleryItems.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => openLightbox(item)}
                                className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100"
                            >
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white hover:text-rose-400 transition-colors z-10"
                    >
                        <X className="w-8 h-8" />
                    </button>
                    
                    <div
                        className="max-w-5xl w-full max-h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex-1 flex items-center justify-center overflow-hidden">
                            <img
                                src={selectedImage.image}
                                alt={selectedImage.title}
                                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="text-xl font-bold text-white mb-2">
                                {selectedImage.title}
                            </h3>
                            <p className="text-gray-300">
                                {selectedImage.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default GaleriPage;
