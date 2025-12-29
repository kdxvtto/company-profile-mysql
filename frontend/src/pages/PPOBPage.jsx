import { Smartphone, Zap, Droplets, Phone, Wifi, CreditCard, Building2, Tv, Shield, Clock, CheckCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PPOBPage = () => {
    // Layanan PPOB
    const services = [
        { icon: Zap, label: 'Listrik PLN', color: 'bg-yellow-500' },
        { icon: Droplets, label: 'PDAM', color: 'bg-blue-500' },
        { icon: Phone, label: 'Telepon', color: 'bg-green-500' },
        { icon: Wifi, label: 'Internet', color: 'bg-purple-500' },
        { icon: Tv, label: 'TV Kabel', color: 'bg-red-500' },
        { icon: CreditCard, label: 'BPJS', color: 'bg-emerald-500' },
        { icon: Building2, label: 'PBB', color: 'bg-orange-500' },
        { icon: Smartphone, label: 'Pulsa & Data', color: 'bg-pink-500' },
    ];

    // Keunggulan
    const features = [
        { icon: Shield, title: 'Aman & Terpercaya', desc: 'Transaksi dijamin aman dengan sistem keamanan berlapis' },
        { icon: Clock, title: 'Realtime 24 Jam', desc: 'Layanan tersedia 24 jam setiap hari tanpa henti' },
        { icon: CheckCircle, title: 'Proses Cepat', desc: 'Pembayaran diproses dalam hitungan detik' },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-br from-rose-600 via-rose-500 to-orange-400 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/3 w-24 h-24 border-4 border-white rounded-full"></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm mb-6">
                                <Smartphone className="w-4 h-4" />
                                <span>Payment Point Online Bank</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                PPOB Bank Wonogiri
                            </h1>
                            <p className="text-lg text-white/90 leading-relaxed mb-8">
                                PPOB (Payment Point Online Bank) adalah sistem pembayaran online yang memberikan kemudahan bagi masyarakat untuk melakukan transaksi pembayaran secara online melalui berbagai jenis layanan, seperti pembayaran tagihan listrik, air, telepon, dan lain sebagainya.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a 
                                    href="tel:0273324044"
                                    className="inline-flex items-center gap-2 bg-white text-rose-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                                >
                                    📞 Hubungi Kami
                                </a>
                                <a 
                                    href="/layanan/produk"
                                    className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                                >
                                    Lihat Layanan Lain →
                                </a>
                            </div>
                        </div>
                        <div className="hidden md:flex justify-center">
                            <div className="w-72 h-72 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                                <span className="text-9xl">💳</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Layanan PPOB */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Bayar Semua Tagihan di Satu Tempat
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Nikmati kemudahan pembayaran berbagai tagihan dengan layanan PPOB Bank Wonogiri
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center cursor-pointer hover:-translate-y-1"
                            >
                                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                    <service.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="font-semibold text-gray-900">{service.label}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Keunggulan */}
            <section className="py-20 bg-gradient-to-br from-slate-50 to-rose-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Mengapa Memilih PPOB Bank Wonogiri?
                        </h2>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-lg text-center"
                            >
                                <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <feature.icon className="w-8 h-8 text-rose-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-rose-600 to-orange-500 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">
                            Mulai Bayar Tagihan Sekarang!
                        </h2>
                        <p className="text-white/90 mb-8 max-w-xl mx-auto">
                            Kunjungi kantor Bank Wonogiri terdekat untuk menikmati layanan PPOB dengan harga terjangkau
                        </p>
                        <a
                            href="tel:0273324044"
                            className="inline-flex items-center gap-2 bg-white text-rose-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
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

export default PPOBPage;
