import { Shield } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 via-white to-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                            Kebijakan Privasi
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
                            PT BPR Bank Wonogiri (Perseroda) ("Bank", "kami") berkomitmen untuk melindungi privasi dan keamanan data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan melindungi informasi pribadi Anda ketika Anda menggunakan layanan kami.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Informasi yang Kami Kumpulkan</h2>
                        <p className="text-gray-600 mb-4">
                            Kami dapat mengumpulkan berbagai jenis informasi pribadi, termasuk namun tidak terbatas pada:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                            <li><strong>Data Identitas:</strong> Nama lengkap, nomor KTP, tempat dan tanggal lahir, jenis kelamin.</li>
                            <li><strong>Data Kontak:</strong> Alamat email, nomor telepon, alamat tempat tinggal.</li>
                            <li><strong>Data Keuangan:</strong> Informasi rekening, riwayat transaksi, data pendapatan.</li>
                            <li><strong>Data Teknis:</strong> Alamat IP, jenis browser, sistem operasi, data cookies.</li>
                            <li><strong>Data Penggunaan:</strong> Informasi tentang bagaimana Anda menggunakan layanan kami.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cara Pengumpulan Informasi</h2>
                        <p className="text-gray-600 mb-4">
                            Kami mengumpulkan informasi melalui berbagai cara, termasuk:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                            <li>Interaksi langsung saat Anda membuka rekening atau mengajukan kredit.</li>
                            <li>Penggunaan website dan aplikasi kami.</li>
                            <li>Komunikasi melalui telepon, email, atau media sosial.</li>
                            <li>Cookies dan teknologi pelacakan serupa.</li>
                            <li>Pihak ketiga seperti biro kredit atau lembaga pemerintah.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Penggunaan Informasi</h2>
                        <p className="text-gray-600 mb-4">
                            Informasi yang kami kumpulkan digunakan untuk:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                            <li>Menyediakan dan mengelola produk dan layanan perbankan.</li>
                            <li>Memproses transaksi dan mengirim notifikasi terkait.</li>
                            <li>Memenuhi kewajiban hukum dan regulasi perbankan.</li>
                            <li>Mencegah penipuan dan aktivitas ilegal.</li>
                            <li>Meningkatkan kualitas layanan dan pengalaman pengguna.</li>
                            <li>Mengirimkan informasi tentang produk, layanan, dan promosi.</li>
                            <li>Melakukan analisis dan riset untuk pengembangan bisnis.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Pengungkapan Informasi</h2>
                        <p className="text-gray-600 mb-4">
                            Kami dapat mengungkapkan informasi pribadi Anda kepada:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                            <li>Otoritas Jasa Keuangan (OJK) dan Bank Indonesia sesuai regulasi.</li>
                            <li>Lembaga Penjamin Simpanan (LPS).</li>
                            <li>Penyedia layanan pihak ketiga yang membantu operasional kami.</li>
                            <li>Penegak hukum jika diwajibkan oleh hukum.</li>
                            <li>Pihak lain dengan persetujuan Anda.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Keamanan Data</h2>
                        <p className="text-gray-600 mb-6">
                            Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi informasi pribadi Anda dari akses tidak sah, pengubahan, pengungkapan, atau penghancuran. Ini termasuk enkripsi data, firewall, dan kontrol akses yang ketat.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Penyimpanan Data</h2>
                        <p className="text-gray-600 mb-6">
                            Kami menyimpan informasi pribadi Anda selama diperlukan untuk tujuan yang dijelaskan dalam Kebijakan Privasi ini, atau selama diwajibkan oleh hukum. Setelah tidak diperlukan lagi, kami akan menghapus atau menganonimkan data Anda secara aman.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Hak Anda</h2>
                        <p className="text-gray-600 mb-4">
                            Anda memiliki hak-hak berikut terkait informasi pribadi Anda:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                            <li>Hak untuk mengakses informasi pribadi yang kami simpan tentang Anda.</li>
                            <li>Hak untuk meminta koreksi atas informasi yang tidak akurat.</li>
                            <li>Hak untuk meminta penghapusan informasi dalam kondisi tertentu.</li>
                            <li>Hak untuk menarik persetujuan yang telah diberikan.</li>
                            <li>Hak untuk mengajukan keluhan kepada otoritas terkait.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies</h2>
                        <p className="text-gray-600 mb-6">
                            Website kami menggunakan cookies untuk meningkatkan pengalaman browsing Anda. Cookies adalah file kecil yang disimpan di perangkat Anda. Anda dapat mengatur browser Anda untuk menolak cookies, namun hal ini mungkin mempengaruhi fungsionalitas website.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Perubahan Kebijakan</h2>
                        <p className="text-gray-600 mb-6">
                            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan diumumkan melalui website kami. Kami menyarankan Anda untuk meninjau halaman ini secara berkala untuk mengetahui perubahan terbaru.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Hubungi Kami</h2>
                        <p className="text-gray-600 mb-6">
                            Jika Anda memiliki pertanyaan atau keluhan mengenai Kebijakan Privasi ini atau penanganan data pribadi Anda, silakan hubungi:
                        </p>
                        <div className="bg-blue-50 rounded-xl p-6">
                            <p className="text-gray-700"><strong>Data Protection Officer</strong></p>
                            <p className="text-gray-700"><strong>PT BPR Bank Wonogiri (Perseroda)</strong></p>
                            <p className="text-gray-600">Jl. Diponegoro No.22, Pokoh, Wonoboyo</p>
                            <p className="text-gray-600">Kec. Wonogiri, Kab. Wonogiri, Jawa Tengah 57615</p>
                            <p className="text-gray-600">Telepon: (0273) 324044</p>
                            <p className="text-gray-600">Email: privacy@bankwonogiri.co.id</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PrivacyPage;
