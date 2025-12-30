import { ScrollText } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-slate-100 via-white to-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <ScrollText className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                            Syarat dan Ketentuan
                        </h1>
                        <p className="text-gray-600">
                            Terakhir diperbarui: Desember 2024
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Pendahuluan</h2>
                        <p className="text-gray-600 mb-6">
                            Selamat datang di website PT BPR Bank Wonogiri (Perseroda). Dengan mengakses dan menggunakan website ini, Anda menyetujui untuk terikat dengan syarat dan ketentuan yang berlaku. Jika Anda tidak menyetujui syarat dan ketentuan ini, mohon untuk tidak menggunakan website ini.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Definisi</h2>
                        <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                            <li><strong>"Bank"</strong> berarti PT BPR Bank Wonogiri (Perseroda).</li>
                            <li><strong>"Website"</strong> berarti situs web resmi Bank yang dapat diakses melalui domain bankwonogiri.co.id.</li>
                            <li><strong>"Pengguna"</strong> berarti setiap orang yang mengakses dan menggunakan Website.</li>
                            <li><strong>"Layanan"</strong> berarti seluruh produk dan jasa perbankan yang ditawarkan oleh Bank.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Penggunaan Website</h2>
                        <p className="text-gray-600 mb-4">
                            Pengguna setuju untuk menggunakan Website ini hanya untuk tujuan yang sah dan sesuai dengan hukum yang berlaku di Indonesia. Pengguna dilarang untuk:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                            <li>Menggunakan Website untuk tujuan yang melanggar hukum.</li>
                            <li>Menyebarkan virus, malware, atau kode berbahaya lainnya.</li>
                            <li>Mencoba mengakses sistem atau data secara tidak sah.</li>
                            <li>Mengganggu atau merusak operasi Website.</li>
                            <li>Menggunakan informasi yang diperoleh dari Website untuk tujuan komersial tanpa izin.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Hak Kekayaan Intelektual</h2>
                        <p className="text-gray-600 mb-6">
                            Seluruh konten yang terdapat dalam Website ini, termasuk namun tidak terbatas pada teks, grafik, logo, ikon, gambar, klip audio, unduhan digital, dan kompilasi data, adalah milik Bank atau pihak yang memberikan lisensi kepada Bank dan dilindungi oleh hukum hak cipta Indonesia.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Informasi Produk dan Layanan</h2>
                        <p className="text-gray-600 mb-6">
                            Informasi mengenai produk dan layanan yang ditampilkan di Website ini bersifat informatif dan dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu. Bank berhak untuk mengubah atau menghentikan produk dan layanan yang ditawarkan.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Batasan Tanggung Jawab</h2>
                        <p className="text-gray-600 mb-6">
                            Bank tidak bertanggung jawab atas kerugian yang timbul akibat penggunaan Website ini, termasuk namun tidak terbatas pada kerugian langsung, tidak langsung, insidental, atau konsekuensial. Bank tidak menjamin bahwa Website akan selalu tersedia atau bebas dari kesalahan.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Tautan ke Situs Lain</h2>
                        <p className="text-gray-600 mb-6">
                            Website ini mungkin berisi tautan ke situs web pihak ketiga. Bank tidak bertanggung jawab atas konten atau praktik privasi dari situs web tersebut. Penggunaan tautan tersebut adalah risiko Pengguna sendiri.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Perubahan Syarat dan Ketentuan</h2>
                        <p className="text-gray-600 mb-6">
                            Bank berhak untuk mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan berlaku efektif segera setelah dipublikasikan di Website. Penggunaan Website secara berkelanjutan setelah perubahan tersebut dianggap sebagai persetujuan atas perubahan.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Hukum yang Berlaku</h2>
                        <p className="text-gray-600 mb-6">
                            Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. Segala sengketa yang timbul dari penggunaan Website ini akan diselesaikan di pengadilan yang berwenang di Indonesia.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Hubungi Kami</h2>
                        <p className="text-gray-600 mb-6">
                            Jika Anda memiliki pertanyaan mengenai syarat dan ketentuan ini, silakan hubungi kami melalui:
                        </p>
                        <div className="bg-gray-50 rounded-xl p-6">
                            <p className="text-gray-700"><strong>PT BPR Bank Wonogiri (Perseroda)</strong></p>
                            <p className="text-gray-600">Jl. Diponegoro No.22, Pokoh, Wonoboyo</p>
                            <p className="text-gray-600">Kec. Wonogiri, Kab. Wonogiri, Jawa Tengah 57615</p>
                            <p className="text-gray-600">Telepon: (0273) 324044</p>
                            <p className="text-gray-600">Email: info@bankwonogiri.co.id</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default TermsPage;
