import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Users, Target, Eye, Award } from 'lucide-react';

// Base URL untuk gambar dari backend
const API_BASE_URL = 'http://localhost:3000';

const ProfilPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-br from-rose-50 via-white to-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="text-gray-900">BANK </span>
                            <span className="text-rose-600">WONOGIRI</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                            Didukung oleh tim profesional yang berdedikasi dan berpengalaman, BANK WONOGIRI 
                            berkomitmen untuk memberikan pelayanan terbaik kepada setiap nasabah.
                        </p>
                    </div>
                    
                    {/* Team Photo */}
                    <div className="mt-12 max-w-5xl mx-auto">
                        <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <img 
                                src={`${API_BASE_URL}/uploads/profile.jpg`}
                                alt="Tim Bank Wonogiri"
                                className="w-full h-auto object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://bankwonogiri.co.id/assets/wng/img/photos/team.jpg';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Tentang Kami Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Left - About Us */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6 text-rose-600" />
                                </div>
                                <div>
                                    <p className="text-rose-600 font-semibold text-sm uppercase tracking-wider">Tentang Kami</p>
                                    <h2 className="text-3xl font-bold text-gray-900">BANK WONOGIRI</h2>
                                </div>
                            </div>
                            
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Awal berdiri merupakan BKP dan pada 15 Oktober 1993 berubah menjadi Bank Pasar Gaya Baru 
                                    yang awalnya berlokasi di Kecamatan Baturetno yang kemudian dikenal sebagai 
                                    Perusahaan Daerah Bank Perkreditan Rakyat "GIRI SUKADANA"
                                </p>
                                <p>
                                    Pada tanggal 12 Juni 2010 PD BPR Giri Sukadana berpindah kantor Pusat di Jl. Diponegoro No. 222 
                                    Pokoh, Kelurahan Wonoboyo, Wonogiri. Sedangkan Kantor Pusat lama di Kecamatan Baturetno beralih 
                                    sebagai Kantor Cabang Baturetno. Pada tanggal 01 Agustus 2015 membuka kantor kas di kecamatan 
                                    Jatisrono (depan terminal Jatisrono) Dan pada tanggal 17 juli 2018 telah dibuka kantor kas di 
                                    kecamatan Purwantoro (pasar baru Ex kantor camat purwantoro).
                                </p>
                                <p>
                                    Pada tanggal 18 Juni 2020 dilakukan perubahan bentuk Badan Hukum yang semula PD menjadi PT 
                                    atas dasar Keputusan Menteri Hukum dan Hak Asasi Manusia Nomor AHU-0023219.AH.01.01.Tahun 2020 
                                    tentang Pengesahan Pendirian Badan Hukum Perseroan Terbatas PT BANK PERKREDITAN RAKYAT BANK 
                                    GIRI SUKA DANA WONOGIRI PERSERODA dan Keputusan Kepala Otoritas Jasa Keuangan Nomor 
                                    KEP-39/KO.0301/2020 tanggal 18 Juni 2020 Tentang Pengalihan Izin Usaha BPR Dari Perusahaan 
                                    Daerah (PD) Bank Perkreditan Rakyat Giri Sukadana Kepada Perseroan Terbatas (PT) Bank 
                                    Perkreditan Rakyat Bank Giri Suka Dana Wonogiri (Perseroda)
                                </p>
                                <p className="font-semibold text-gray-900">
                                    Sehingga dikenalah sekarang sebagai PT BPR BANK GIRI SUKA DANA (Perseroda)
                                </p>
                            </div>
                        </div>

                        {/* Right - Visi & Misi */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-bold text-gray-900">
                                Visi dan Misi PT BPR BANK GIRI SUKA DANA WONOGIRI (Perseroda)
                            </h3>
                            
                            {/* Visi */}
                            <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-6 rounded-2xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center">
                                        <Eye className="w-5 h-5 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold text-rose-900">Visi</h4>
                                </div>
                                <p className="text-rose-800 font-medium italic">
                                    "Menjadi bank yang sehat, terpercaya, kompetitif, professional dan bermanfaat (TERKENAL)"
                                </p>
                            </div>

                            {/* Misi */}
                            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                                        <Target className="w-5 h-5 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-900">Misi</h4>
                                </div>
                                <ul className="space-y-3 text-slate-700">
                                    <li className="flex items-start gap-2">
                                        <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Menjalankan operasional bank sesuai dengan ketentuan dan perundang-undangan.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Melaksanakan tata kelola yang baik dalam rangka menjaga kepercayaan masyarakat.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Menjalankan fungsi intermediasi dengan memberikan produk dan layanan yang mempunyai unggulan.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Selalu berkreasi dan inovasi yang dilandasi iman dan taqwa.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Memberikan pelayanan yang terbaik yang berorientasi kepada UMKM serta memberikan kontribusi terhadap Pendapatan Asli Daerah.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Manajemen Section */}
            <section className="py-20 bg-gradient-to-br from-rose-50 via-white to-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Award className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Jajaran Manajemen</h2>
                        <p className="text-gray-600">Adapun jajaran Manajemen adalah sebagai berikut</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Dewan Komisaris */}
                        <div className="bg-white shadow-lg rounded-2xl p-8 border border-rose-100">
                            <h3 className="text-xl font-bold text-rose-600 mb-6 text-center">DEWAN KOMISARIS</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-500">Komisaris Utama</span>
                                    <span className="font-semibold text-gray-900">ARIS WIDODO, S.E., M.Si</span>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <span className="text-gray-500">Komisaris</span>
                                    <span className="font-semibold text-gray-900">DWI HARYANTO, S.E, M.M</span>
                                </div>
                            </div>
                        </div>

                        {/* Direksi */}
                        <div className="bg-white shadow-lg rounded-2xl p-8 border border-rose-100">
                            <h3 className="text-xl font-bold text-rose-600 mb-6 text-center">DIREKSI</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-500">Direktur Utama</span>
                                    <span className="font-semibold text-gray-900">SUPARMO, S.E.</span>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <span className="text-gray-500">Direktur</span>
                                    <span className="font-semibold text-gray-900">MOHAMAD HASYIM, S.E.</span>
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

export default ProfilPage;
