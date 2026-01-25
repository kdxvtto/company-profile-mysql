import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
            <div className="text-center max-w-lg w-full">
                {/* Visual */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
                        <span className="text-[12rem] font-bold text-gray-900">404</span>
                    </div>
                    <div className="relative z-10 bg-white p-6 rounded-full w-24 h-24 mx-auto shadow-xl flex items-center justify-center ring-8 ring-gray-50">
                        <Search className="w-10 h-10 text-rose-600" />
                    </div>
                </div>

                {/* Content */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Halaman Tidak Ditemukan
                </h1>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    Maaf, halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak tersedia lagi.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Kembali
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-rose-500/30 transition-all flex items-center justify-center gap-2 group"
                    >
                        <Home className="w-4 h-4" />
                        Ke Beranda
                    </button>
                </div>

                {/* Footer Helper */}
                <div className="mt-12 text-sm text-gray-500">
                    Perlu bantuan?{' '}
                    <a href="/hubungi" className="text-rose-600 hover:text-rose-700 font-medium hover:underline">
                        Hubungi Kami
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
