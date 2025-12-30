import { useState } from 'react';
import { FileText, Download, BookOpen, ClipboardList } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Base URL untuk file dari backend
const API_BASE_URL = 'http://localhost:3000';

const PublikasiPage = () => {
    const [activeTab, setActiveTab] = useState('laporan');

    // Data Laporan Keuangan
    const laporanFiles = [
        { id: 1, name: 'Laporan Publikasi Triwulan III Tahun 2025', file: 'LAPORAN PUBLIKASI TRIWULAN III TAHUN 2025 PT BANK WONOGIRI (PERSERODA).pdf', year: '2025' },
        { id: 2, name: 'Laporan Publikasi Triwulan II Tahun 2025', file: 'LAPORAN PUBLIKASI TRIWULAN II TAHUN 2025 PT BANK WONOGIRI (PERSERODA).pdf', year: '2025' },
        { id: 3, name: 'Laporan Publikasi Triwulan I Tahun 2025', file: 'LAPORAN PUBLIKASI TRIWULAN I TAHUN 2025 PT BANK WONOGIRI (PERSERODA).pdf', year: '2025' },
        { id: 4, name: 'Laporan Publikasi Triwulan IV Tahun 2024', file: 'LAPORAN PUBLIKASI TRIWULAN IV TAHUN 2024 PT BPR BANK WONOGIRI (PERSERODA).pdf', year: '2024' },
        { id: 5, name: 'Laporan Tahunan 2024', file: 'LAPORAN TAHUNAN 2024.pdf', year: '2024' },
        { id: 6, name: 'Laporan Publikasi Desember 2023', file: 'LAPORAN PUBLIKASI DESEMBER 2023.pdf', year: '2023' },
        { id: 7, name: 'Laporan Publikasi Desember 2022', file: 'LAPORAN PUBLIKASI DESEMBER 2022.pdf', year: '2022' },
        { id: 8, name: 'Piagam Audit Internal', file: 'PIAGAM AUDIT INTERNAL PT BPR BANK WONOGIRI (PERSERODA).pdf', year: '2024' },
    ];

    // Data Manual/Panduan
    const manualFiles = [
        { id: 1, name: 'Manual Book Aplikasi HRM Plus', file: 'MANUAL BOOK APLIKASI HRM PLUS.pdf', category: 'Aplikasi' },
        { id: 2, name: 'Manual Book Aplikasi Masdaku', file: 'MANUAL BOOK APLIKASI MASDAKU.pdf', category: 'Aplikasi' },
        { id: 3, name: 'Manual Book Kredit Rumahкое', file: 'MANUAL BOOK KREDIT RUMAHКОЕ.pdf', category: 'Kredit' },
        { id: 4, name: 'Manual Book Kredit Sebrakan', file: 'MANUAL BOOK KREDIT SEBRAKAN.pdf', category: 'Kredit' },
        { id: 5, name: 'Manual Book Kredit Sumeh', file: 'MANUAL BOOK KREDIT SUMEH.pdf', category: 'Kredit' },
        { id: 6, name: 'Manual Book Penggunaan Aplikasi Credigo', file: 'MANUAL BOOK PENGGUNAAN APLIKASI CREDIGO.pdf', category: 'Aplikasi' },
        { id: 7, name: 'Manual Book Tabungan Kencana', file: 'MANUAL BOOK TABUNGAN KENCANA.pdf', category: 'Tabungan' },
        { id: 8, name: 'Manual Book WA Gateway', file: 'MANUAL BOOK WA GATEWAY.pdf', category: 'Aplikasi' },
    ];

    // Function to download file
    const handleDownload = (folder, filename) => {
        const url = `${API_BASE_URL}/${folder}/${filename}`;
        window.open(url, '_blank');
    };

    // Format file size
    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
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
                            onClick={() => setActiveTab('laporan')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                activeTab === 'laporan'
                                    ? 'bg-rose-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            <ClipboardList className="w-5 h-5" />
                            Laporan Keuangan
                        </button>
                        <button
                            onClick={() => setActiveTab('manual')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                activeTab === 'manual'
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
                    {activeTab === 'laporan' ? (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                📊 Laporan Keuangan
                            </h2>
                            {laporanFiles.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                                            <FileText className="w-6 h-6 text-rose-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-500">Tahun {item.year} • PDF</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDownload('laporan', item.file)}
                                        className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-rose-700 transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                📚 Manual & Panduan
                            </h2>
                            {manualFiles.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <BookOpen className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-500">{item.category} • PDF</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDownload('manual', item.file)}
                                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
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
