import { useState } from 'react';
import { FileText, Scale, ShieldCheck, RefreshCw, AlertTriangle, Info, Lock, Send, CheckCircle, ClipboardList, Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ppidAPI } from '@/lib/api';

const PPIDPage = () => {
    const [formData, setFormData] = useState({
        nama: '',
        nomorIdentitas: '',
        informasiDiminta: '',
        tujuan: '',
        kontak: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await ppidAPI.submit(formData);
            setSuccess(true);
            setFormData({
                nama: '',
                nomorIdentitas: '',
                informasiDiminta: '',
                tujuan: '',
                kontak: '',
            });
        } catch (err) {
            const msg = err.response?.data?.message
                || err.response?.data?.errors?.[0]?.message
                || 'Gagal mengirim permohonan. Silakan coba lagi.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-rose-50 via-white to-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-gray-900">Informasi </span>
                            <span className="text-rose-600">PPID</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Pejabat Pengelola Informasi dan Dokumentasi
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

                    {/* Profil PPID */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck className="w-6 h-6 text-rose-600 flex-shrink-0" />
                            <h2 className="text-2xl font-bold text-gray-900">Profil PPID</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Pejabat Pengelola Informasi dan Dokumentasi (PPID) Bank Wonogiri bertanggung jawab dalam pengelolaan dan pelayanan informasi publik sesuai dengan prinsip keterbukaan informasi, akuntabilitas, dan perlindungan data nasabah.
                        </p>
                    </div>

                    {/* Dasar Hukum */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Scale className="w-6 h-6 text-rose-600 flex-shrink-0" />
                            <h2 className="text-2xl font-bold text-gray-900">Dasar Hukum</h2>
                        </div>
                        <ul className="space-y-3">
                            {[
                                'UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik',
                                'POJK No. 6/POJK.07/2022 tentang Perlindungan Konsumen',
                                'SEOJK terkait Transparansi Produk dan Layanan Perbankan',
                                'Kebijakan Internal Bank Wonogiri',
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-600">
                                    <span className="mt-1.5 w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tugas dan Wewenang */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-6 h-6 text-rose-600 flex-shrink-0" />
                            <h2 className="text-2xl font-bold text-gray-900">Tugas dan Wewenang PPID</h2>
                        </div>
                        <ul className="space-y-3">
                            {[
                                'Mengelola dan menyediakan informasi publik',
                                'Menjamin akses informasi yang cepat dan akurat',
                                'Melakukan pengujian konsekuensi atas informasi yang dikecualikan',
                                'Menjaga kerahasiaan data nasabah dan bank',
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-600">
                                    <span className="mt-1.5 w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kategori Informasi - Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Informasi Berkala */}
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                                <h3 className="text-lg font-bold text-gray-900">Informasi Berkala</h3>
                            </div>
                            <ul className="space-y-2 ml-6">
                                {[
                                    'Laporan Tahunan Bank',
                                    'Laporan Keuangan Publikasi',
                                    'Profil Manajemen & Dewan Komisaris',
                                    'Struktur Organisasi',
                                    'Kebijakan Tata Kelola Perusahaan',
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                                        <RefreshCw className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Informasi Serta Merta */}
                        <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="w-3 h-3 rounded-full bg-red-500" />
                                <h3 className="text-lg font-bold text-gray-900">Informasi Serta Merta</h3>
                            </div>
                            <ul className="space-y-2 ml-6">
                                {[
                                    'Gangguan layanan sistem perbankan',
                                    'Kejadian luar biasa yang mempengaruhi nasabah',
                                    'Perubahan jam operasional nasional',
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Informasi Setiap Saat */}
                        <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="w-3 h-3 rounded-full bg-rose-500" />
                                <h3 className="text-lg font-bold text-gray-900">Informasi Setiap Saat</h3>
                            </div>
                            <ul className="space-y-2 ml-6">
                                {[
                                    'Prosedur pembukaan rekening',
                                    'Informasi produk dan biaya',
                                    'Mekanisme pengaduan nasabah',
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                                        <Info className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Informasi Dikecualikan */}
                        <div className="rounded-2xl border border-gray-300 bg-gray-50/50 p-6">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="w-3 h-3 rounded-full bg-gray-700" />
                                <h3 className="text-lg font-bold text-gray-900">Informasi Dikecualikan</h3>
                            </div>
                            <ul className="space-y-2 ml-6">
                                {[
                                    'Data pribadi nasabah',
                                    'Rahasia bank',
                                    'Data transaksi individu',
                                    'Strategi bisnis internal',
                                    'Kredensial sistem & keamanan IT',
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                                        <Lock className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    {/* Prosedur Permohonan Informasi */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <ClipboardList className="w-6 h-6 text-rose-600 flex-shrink-0" />
                            <h2 className="text-2xl font-bold text-gray-900">Prosedur Permohonan Informasi</h2>
                        </div>

                        {/* Alur Steps */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                            {[
                                { step: '1', text: 'Pemohon mengisi Form Permohonan Informasi' },
                                { step: '2', text: 'Verifikasi identitas pemohon' },
                                { step: '3', text: 'PPID memberikan tanggapan maks. 10 hari kerja' },
                                { step: '4', text: 'Perpanjangan maks. 7 hari kerja bila diperlukan' },
                            ].map((item, idx) => (
                                <div key={idx} className="relative bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                                        {item.step}
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Form Permohonan */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="bg-rose-600 text-white px-6 py-4 flex items-center gap-3">
                                <Send className="w-5 h-5" />
                                <h3 className="text-lg font-bold">Form Permohonan Informasi</h3>
                            </div>

                            {success ? (
                                <div className="p-8 text-center">
                                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Permohonan Berhasil Dikirim!</h4>
                                    <p className="text-gray-600 mb-2">
                                        PPID akan memberikan tanggapan maksimal <strong>10 hari kerja</strong>.
                                    </p>
                                    <p className="text-gray-500 text-sm mb-6">
                                        Perpanjangan maksimal <strong>7 hari kerja</strong> bila diperlukan.
                                    </p>
                                    <button
                                        onClick={() => setSuccess(false)}
                                        className="text-rose-600 font-semibold hover:text-rose-700 transition-colors"
                                    >
                                        Kirim permohonan lagi
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                    {error && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                            {error}
                                        </div>
                                    )}

                                    <div>
                                        <label htmlFor="ppid-nama" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            Nama Pemohon <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="ppid-nama"
                                            type="text"
                                            name="nama"
                                            value={formData.nama}
                                            onChange={handleChange}
                                            required
                                            placeholder="Masukkan nama lengkap"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-shadow"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="ppid-identitas" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            Nomor Identitas (KTP/SIM/Paspor) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="ppid-identitas"
                                            type="text"
                                            name="nomorIdentitas"
                                            value={formData.nomorIdentitas}
                                            onChange={handleChange}
                                            required
                                            placeholder="Masukkan nomor identitas"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-shadow"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="ppid-informasi" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            Informasi yang Diminta <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="ppid-informasi"
                                            name="informasiDiminta"
                                            value={formData.informasiDiminta}
                                            onChange={handleChange}
                                            required
                                            rows={3}
                                            placeholder="Jelaskan informasi yang ingin Anda peroleh"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-shadow resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="ppid-tujuan" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            Tujuan Penggunaan Informasi <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="ppid-tujuan"
                                            name="tujuan"
                                            value={formData.tujuan}
                                            onChange={handleChange}
                                            required
                                            rows={2}
                                            placeholder="Jelaskan tujuan penggunaan informasi"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-shadow resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="ppid-kontak" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            Kontak Pemohon (Email/No. HP) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="ppid-kontak"
                                            type="text"
                                            name="kontak"
                                            value={formData.kontak}
                                            onChange={handleChange}
                                            required
                                            placeholder="Email atau nomor telepon"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-shadow"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Mengirim...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Kirim Permohonan
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Kontak PPID */}
                    <div className="bg-gradient-to-br from-rose-50 to-slate-50 rounded-2xl p-8 border border-rose-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center">
                                <Send className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Kontak PPID</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <p className="font-semibold text-gray-900 mb-1">PPID PT BPR Bank Wonogiri (Perseroda)</p>
                                    <p className="text-gray-600 flex items-start gap-2">
                                        <span>📍</span>
                                        <span>Kantor Pusat: Jl. Diponegoro No.22, Jatirejo, Wonoboyo, Kec. Wonogiri, Kabupaten Wonogiri, Jawa Tengah 57615</span>
                                    </p>
                                </div>
                                <p className="text-gray-600 flex items-center gap-2">
                                    <span>📧</span>
                                    <a href="mailto:info@bankwonogiri.co.id" className="text-rose-600 hover:text-rose-700 font-medium transition-colors">
                                        info@bankwonogiri.co.id
                                    </a>
                                </p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-gray-600 flex items-center gap-2">
                                    <span>☎️</span>
                                    <a href="tel:0273324044" className="text-rose-600 hover:text-rose-700 font-medium transition-colors">
                                        (0273) 324044
                                    </a>
                                </p>
                                <p className="text-gray-600 flex items-center gap-2">
                                    <span>🕘</span>
                                    <span>Jam Layanan: Senin–Jumat, 09.00–16.00 WIB</span>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PPIDPage;
