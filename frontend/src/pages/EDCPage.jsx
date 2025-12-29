import { CreditCard, Shield, Zap, Store, CheckCircle, Smartphone, Lock, TrendingUp } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const EDCPage = () => {
    // Keuntungan EDC
    const benefits = [
        { 
            icon: Zap, 
            title: 'Transaksi Cepat', 
            desc: 'Tidak perlu membawa uang tunai atau menukar uang kecil, transaksi lebih cepat dan mudah',
            color: 'bg-yellow-500'
        },
        { 
            icon: Shield, 
            title: 'Aman & Terenkripsi', 
            desc: 'Proses pembayaran otomatis dan terenkripsi, data pribadi Anda terlindungi',
            color: 'bg-blue-500'
        },
        { 
            icon: TrendingUp, 
            title: 'Efisiensi Bisnis', 
            desc: 'Meningkatkan efisiensi dan kecepatan transaksi untuk pedagang',
            color: 'bg-green-500'
        },
        { 
            icon: Lock, 
            title: 'Mengurangi Risiko', 
            desc: 'Mengurangi risiko kehilangan uang akibat pembayaran yang salah atau palsu',
            color: 'bg-purple-500'
        },
    ];

    // Fitur EDC
    const features = [
        'Pembayaran Kartu Debit',
        'Pembayaran Kartu Kredit',
        'Transaksi Non-Tunai',
        'Cetak Struk Otomatis',
        'Laporan Transaksi Real-time',
        'Dukungan 24/7',
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 right-20 w-40 h-40 border-4 border-white rounded-3xl rotate-12"></div>
                    <div className="absolute bottom-20 left-20 w-32 h-32 border-4 border-white rounded-3xl -rotate-12"></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm mb-6">
                                <CreditCard className="w-4 h-4" />
                                <span>Electronic Data Capture</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                EDC Bank Wonogiri
                            </h1>
                            <p className="text-lg text-white/90 leading-relaxed mb-8">
                                EDC (Electronic Data Capture) merupakan sebuah perangkat yang berfungsi untuk mengumpulkan, menyimpan, dan memproses data transaksi elektronik secara otomatis. Perangkat ini umumnya digunakan untuk melakukan pembayaran non-tunai melalui kartu debit atau kredit.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a 
                                    href="tel:0273324044"
                                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                                >
                                    📞 Ajukan EDC
                                </a>
                                <a 
                                    href="/layanan/produk"
                                    className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                                >
                                    Layanan Lain →
                                </a>
                            </div>
                        </div>
                        <div className="hidden md:flex justify-center">
                            <div className="w-72 h-72 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                                <span className="text-9xl">🖥️</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Keuntungan EDC */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Keuntungan Menggunakan EDC
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            EDC memberikan banyak keuntungan untuk bisnis Anda
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                            >
                                <div className={`w-14 h-14 ${benefit.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <benefit.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                <p className="text-gray-600 text-sm">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Untuk Pedagang */}
            <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                                <Store className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Untuk Para Pedagang & Penjual
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                EDC memberikan kemudahan bagi para pedagang atau penjual, terutama bagi mereka yang beroperasi di lingkungan bisnis modern seperti mall atau pasar swalayan. Dengan EDC, para pedagang dapat meningkatkan efisiensi dan kecepatan dalam melakukan transaksi, serta mengurangi risiko kehilangan uang akibat pembayaran yang salah atau palsu.
                            </p>
                            <ul className="space-y-3">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white rounded-3xl p-8 shadow-xl">
                            <div className="text-center">
                                <Smartphone className="w-20 h-20 text-blue-500 mx-auto mb-6" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Digitalisasi Layanan</h3>
                                <p className="text-gray-600">
                                    Bank Wonogiri sebagai salah satu BPR yang terus melakukan digitalisasi untuk memberikan layanan terbaik bagi nasabah.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">
                            Tertarik Menggunakan EDC?
                        </h2>
                        <p className="text-white/90 mb-8 max-w-xl mx-auto">
                            Hubungi kami untuk informasi lebih lanjut tentang pengajuan mesin EDC Bank Wonogiri
                        </p>
                        <a
                            href="tel:0273324044"
                            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
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

export default EDCPage;
