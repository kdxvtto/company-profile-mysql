import { useState, useEffect } from 'react';
import { FileText, Download, BookOpen, ClipboardList, Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { publicationsAPI } from '@/lib/api';

const PublikasiPage = () => {
    const [activeTab, setActiveTab] = useState('Laporan');
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPublications();
    }, []);

    const fetchPublications = async () => {
        try {
            setLoading(true);
            // Request with high limit for public page to show all publications
            const response = await publicationsAPI.getAll({ limit: 100 });
            setPublications(response.data.data || []);
        } catch (error) {
            console.error('Error fetching publications:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter publications by category
    const filteredPublications = publications.filter(
        (pub) => pub.category === activeTab
    );

    // Function to download file
    const handleDownload = (fileUrl) => {
        window.open(fileUrl, '_blank');
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-rose-50 via-white to-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-gray-900">Pusat </span>
                            <span className="text-rose-600">Publikasi</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Download laporan keuangan dan dokumen penting Bank Wonogiri
                        </p>
                    </div>
                </div>
            </section>

            {/* Tabs */}
            <section className="py-8 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={() => setActiveTab('Laporan')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                activeTab === 'Laporan'
                                    ? 'bg-rose-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            <ClipboardList className="w-5 h-5" />
                            Laporan Keuangan
                        </button>
                        <button
                            onClick={() => setActiveTab('Manual Book')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                activeTab === 'Manual Book'
                                    ? 'bg-rose-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            <BookOpen className="w-5 h-5" />
                            Manual & Panduan
                        </button>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-rose-600" />
                        </div>
                    ) : filteredPublications.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>Belum ada publikasi dalam kategori ini</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                {activeTab === 'Laporan' ? '📊 Laporan Keuangan' : '📚 Manual & Panduan'}
                            </h2>
                            {filteredPublications.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                            activeTab === 'Laporan' ? 'bg-rose-100' : 'bg-blue-100'
                                        }`}>
                                            {activeTab === 'Laporan' ? (
                                                <FileText className="w-6 h-6 text-rose-600" />
                                            ) : (
                                                <BookOpen className="w-6 h-6 text-blue-600" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                {new Date(item.createdAt).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })} • PDF
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDownload(item.file[0])}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                                            activeTab === 'Laporan'
                                                ? 'bg-rose-600 text-white hover:bg-rose-700'
                                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                    >
                                        <Download className="w-4 h-4" />
                                        Download
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PublikasiPage;
