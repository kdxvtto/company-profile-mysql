import { MessageSquare, Phone, FileText, AlertCircle, CheckCircle, ClipboardList } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PengaduanPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-rose-600 via-rose-500 to-orange-400 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Layanan Pengaduan Nasabah
                        </h1>
                        <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Kami menyadari bahwa dalam memberikan layanan perbankan, tidak selalu semua harapan nasabah dapat terpenuhi. Kadang hal ini terjadi karena kurangnya transparansi informasi produk atau layanan.
                        </p>
                    </div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Jika Anda mengalami hal tersebut, jangan ragu untuk menyampaikan pengaduan kepada unit khusus penanganan nasabah kami. Sesuai dengan ketentuan <strong>POJK No. 18/POJK.07/2018</strong> tentang Layanan Pengaduan Konsumen di Sektor Jasa Keuangan, setiap pengaduan akan kami tindaklanjuti dan selesaikan dalam jangka waktu yang telah ditetapkan.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Pengaduan dapat diajukan oleh siapa saja, baik nasabah yang memiliki rekening maupun masyarakat yang pernah melakukan transaksi di <strong>PT BPR BANK WONOGIRI (Perseroda)</strong>. Anda dapat menyampaikan pengaduan secara langsung, baik secara lisan maupun tertulis, melalui kantor kami.
                        </p>
                    </div>
                </div>
            </section>

            {/* Image Section */}
            <section className="py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                        <img
                            src="/aduan.png"
                            alt="Layanan Pengaduan Nasabah"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </section>

            {/* Pengaduan Procedures */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Pengaduan Nasabah
                    </h2>

                    {/* 1. Pengaduan Lisan */}
                    <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="bg-rose-600 text-white px-6 py-4 flex items-center gap-3">
                            <Phone className="w-6 h-6" />
                            <h3 className="text-xl font-bold">1. Pengaduan Lisan</h3>
                        </div>
                        <div className="p-6">
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>Bisa melalui telepon atau datang langsung ke kantor PT BPR BANK WONOGIRI (Perseroda).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>Ditangani dan diselesaikan dalam waktu <strong>2–5 hari kerja</strong>.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>Jika butuh waktu lebih dari 5 hari, nasabah akan diminta mengajukan pengaduan tertulis.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 2. Pengaduan Tertulis */}
                    <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="bg-blue-600 text-white px-6 py-4 flex items-center gap-3">
                            <FileText className="w-6 h-6" />
                            <h3 className="text-xl font-bold">2. Pengaduan Tertulis</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-700 mb-4">Dapat disampaikan melalui surat resmi (dikirim atau diantar ke kantor), dengan melampirkan:</p>
                            <ul className="space-y-2 text-gray-700 mb-4">
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    Fotokopi KTP
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    Bukti transaksi terkait
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    Dokumen pendukung lain (jika ada)
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    Surat kuasa (jika diwakilkan)
                                </li>
                            </ul>
                            <div className="bg-blue-50 rounded-lg p-4">
                                <p className="text-blue-800 font-medium">
                                    ⏱️ Waktu penyelesaian maksimal <strong>20 hari kerja</strong>. Bila diperlukan perpanjangan, Bank akan menghubungi nasabah sebelum batas waktu berakhir.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 3. Hal yang Perlu Diperhatikan */}
                    <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="bg-amber-500 text-white px-6 py-4 flex items-center gap-3">
                            <ClipboardList className="w-6 h-6" />
                            <h3 className="text-xl font-bold">3. Hal yang Perlu Diperhatikan</h3>
                        </div>
                        <div className="p-6">
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">1</span>
                                    <span>Jelaskan inti permasalahan dengan jelas.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">2</span>
                                    <span>Lampirkan dokumen pendukung.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">3</span>
                                    <span>Catat nomor registrasi pengaduan.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">4</span>
                                    <span>Simpan dokumen/hasil penyelesaian dengan baik.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 4. Jika Belum Puas */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="bg-purple-600 text-white px-6 py-4 flex items-center gap-3">
                            <AlertCircle className="w-6 h-6" />
                            <h3 className="text-xl font-bold">4. Jika Nasabah Belum Puas</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-700 mb-4">Pengaduan dapat dilanjutkan melalui:</p>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
                                    <span>Mediasi Perbankan Bank Indonesia (BI)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
                                    <span>Fasilitasi Penyelesaian Sengketa OJK</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2"></span>
                                    <span>Alternatif penyelesaian sengketa lainnya sesuai ketentuan</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Hubungi Kami
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Sampaikan pengaduan Anda melalui telepon atau kunjungi kantor kami
                    </p>
                    <a
                        href="tel:0273324044"
                        className="inline-flex items-center gap-2 bg-rose-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-rose-700 transition-colors"
                    >
                        📞 (0273) 324044
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PengaduanPage;
