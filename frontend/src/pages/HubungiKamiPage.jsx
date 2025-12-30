import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const HubungiKamiPage = () => {
    // Informasi kontak
    const contactInfo = [
        {
            icon: MapPin,
            title: 'Alamat Kantor',
            details: ['Jl. Diponegoro No.22, Pokoh, Wonoboyo', 'Kec. Wonogiri, Kab. Wonogiri, Jawa Tengah 57615'],
            color: 'bg-rose-100 text-rose-600',
        },
        {
            icon: Phone,
            title: 'Telepon',
            details: ['(0273) 324044', '(0273) 321095'],
            color: 'bg-blue-100 text-blue-600',
        },
        {
            icon: Mail,
            title: 'Email',
            details: ['info@bankwonogiri.co.id', 'cs@bankwonogiri.co.id'],
            color: 'bg-green-100 text-green-600',
        },
        {
            icon: Clock,
            title: 'Jam Operasional',
            details: ['Senin - Jumat: 08:00 - 15:00', 'Sabtu - Minggu: Tutup'],
            color: 'bg-amber-100 text-amber-600',
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-rose-600 via-rose-500 to-orange-400 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Hubungi Kami
                        </h1>
                        <p className="text-lg text-white/90 max-w-2xl mx-auto">
                            Kami siap membantu Anda. Hubungi kami melalui berbagai channel yang tersedia.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
                            >
                                <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                                {item.details.map((detail, idx) => (
                                    <p key={idx} className="text-gray-600">{detail}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map & Form Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Map */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                📍 Lokasi Kantor
                            </h2>
                            <div className="rounded-2xl overflow-hidden shadow-lg">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31622.24914165429!2d110.89617737431638!3d-7.812976999999975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a2e4c22a8362b%3A0x361c94515c79261a!2sPT%20BPR%20BANK%20WONOGIRI%20(Perseroda)!5e0!3m2!1sid!2sid!4v1767059759233!5m2!1sid!2sid" 
                                    width="100%" 
                                    height="400" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Lokasi PT BPR Bank Wonogiri"
                                    className="w-full"
                                />
                            </div>
                        </div>

                        {/* Quick Contact */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                💬 Hubungi Langsung
                            </h2>
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <p className="text-gray-600 mb-6">
                                    Untuk pertanyaan atau informasi lebih lanjut, silakan hubungi customer service kami melalui channel berikut:
                                </p>
                                
                                <div className="space-y-4">
                                    <a
                                        href="tel:0273324044"
                                        className="flex items-center gap-4 p-4 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors"
                                    >
                                        <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center">
                                            <Phone className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Telepon</p>
                                            <p className="text-rose-600">(0273) 324044</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://wa.me/6281234567890"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                                    >
                                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                                            <MessageCircle className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">WhatsApp</p>
                                            <p className="text-green-600">Chat dengan CS</p>
                                        </div>
                                    </a>

                                    <a
                                        href="mailto:info@bankwonogiri.co.id"
                                        className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                                    >
                                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                            <Mail className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Email</p>
                                            <p className="text-blue-600">info@bankwonogiri.co.id</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HubungiKamiPage;
