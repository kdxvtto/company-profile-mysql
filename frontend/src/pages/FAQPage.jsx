import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'Apakah di BANK WONOGIRI ada kredit ultra mikro?',
            answer: 'Ya. Di BANK WONOGIRI ada kredit SUMEH, kredit tanpa agunan diperuntukan bagi pedagang pasar, warung kelontong dan usaha ultra mikro lain nya. Adanya kredit sumeh dengan bunga 3% pertahun dan tanpa agunan diharapkan dapat membantu mengentaskan masyarakat khususnya di Kabupaten Wonogiri terbebas dari jeratan Rentenir dan Pinjol iLegal.',
        },
        {
            question: 'Bagaimana cara mengajukan kredit?',
            answer: 'Anda dapat langsung ke kantor PT BPR BANK WONOGIRI (Perseroda) baik dikantor Pusat Wonogiri, Cabang Baturetno, maupun kantor kas kami di Pracimantoro, Purwantoro, Jatisrono, dan Slogohimo. Atau dapat melalui pengajuan online di Aplikasi Credigo kami.',
        },
        {
            question: 'Berapa bunga kredit di BANK WONOGIRI?',
            answer: 'Bunga kredit umum ditentukan berdasarkan plafon, agunan dan jangka waktu pinjaman, untuk lebih detailnya dapat menghubungi customer service kami di (0273) 324044 atau datang langsung ke kantor operasional kami.',
        },
        {
            question: 'Apakah kredit di BANK WONOGIRI melalui BI Checking?',
            answer: 'YA. Pengajuan kredit di PT BPR BANK WONOGIRI (Perseroda) melalui pengecekan SLIK (Sistem Layanan Informasi Keuangan). Mungkin bagi sebagian masyarakat masih mengenalnya dengan istilah BI Checking. Untuk itu diharapkan masyarakat tetap menjaga kualitas kreditnya agar catatan pada SLIK tetap terjaga BAIK.',
        },
        {
            question: 'Apakah Menabung di BPR itu aman?',
            answer: 'TENTU. PT BPR BANK WONOGIRI (Perseroda) di awasi oleh Otoritas Jasa Keuangan (OJK) dan Dijamin oleh Lembaga Penjamin Simpanan (LPS) sampai dengan 2 Miliar.',
        },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-rose-50 via-white to-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <HelpCircle className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-gray-900">Pertanyaan </span>
                            <span className="text-rose-600">Umum</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Temukan jawaban atas pertanyaan yang sering diajukan tentang layanan Bank Wonogiri
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ List */}
            <section className="py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                                >
                                    <span className="font-semibold text-gray-900">
                                        {faq.question}
                                    </span>
                                    <ChevronDown 
                                        className={`w-5 h-5 text-rose-600 flex-shrink-0 transition-transform duration-300 ${
                                            openIndex === index ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        openIndex === index ? 'max-h-96' : 'max-h-0'
                                    }`}
                                >
                                    <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <div className="mt-12 text-center p-8 bg-gradient-to-br from-rose-50 to-slate-50 rounded-2xl">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Masih ada pertanyaan?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Hubungi customer service kami untuk bantuan lebih lanjut
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

export default FAQPage;
