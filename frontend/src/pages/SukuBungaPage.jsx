import { Shield, Info } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const SukuBungaPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-emerald-50 via-white to-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-gray-900">Suku Bunga </span>
                            <span className="text-emerald-600">LPS</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Tingkat Bunga Penjaminan Lembaga Penjamin Simpanan
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Info Box */}
                    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-xl mb-8">
                        <div className="flex items-start gap-4">
                            <Info className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">
                                    TINGKAT BUNGA PENJAMINAN UNTUK SIMPANAN DI BANK PEREKONOMIAN RAKYAT
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Sesuai Undang-Undang No. 24 Tahun 2004 tentang Lembaga Penjamin Simpanan, Undang-Undang No. 4 Tahun 2023 tentang Pengembangan dan Penguatan Sektor Keuangan, dan Peraturan Lembaga Penjamin Simpanan (PLPS) No. 1 Tahun 2023 tentang Program Penjaminan Simpanan, LPS menetapkan Tingkat Bunga Penjaminan 3 (tiga) kali dalam 1 (satu) tahun yaitu pada bulan <strong>Januari</strong>, <strong>Mei</strong>, dan <strong>September</strong>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* LPS Image */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <img
                            src="http://localhost:3000/uploads/lps.jpg"
                            alt="Tingkat Bunga Penjaminan LPS"
                            className="w-full h-auto"
                        />
                    </div>

                    {/* Additional Info */}
                    <div className="mt-12 grid md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                            <div className="text-4xl mb-3">📅</div>
                            <h3 className="font-bold text-gray-900 mb-2">Januari</h3>
                            <p className="text-sm text-gray-600">Penetapan Periode 1</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                            <div className="text-4xl mb-3">📅</div>
                            <h3 className="font-bold text-gray-900 mb-2">Mei</h3>
                            <p className="text-sm text-gray-600">Penetapan Periode 2</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                            <div className="text-4xl mb-3">📅</div>
                            <h3 className="font-bold text-gray-900 mb-2">September</h3>
                            <p className="text-sm text-gray-600">Penetapan Periode 3</p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-12 text-center">
                        <a
                            href="https://www.lps.go.id"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                        >
                            🌐 Kunjungi Website LPS
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default SukuBungaPage;
