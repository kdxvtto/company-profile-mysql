import { useState, useEffect } from 'react';
import { Users, Loader2, Facebook, Instagram } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { teamAPI } from '@/lib/api';

// Base URL untuk gambar dari backend
const API_BASE_URL = 'http://localhost:3000';

// Helper function untuk mendapatkan URL gambar yang benar
const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
};

const TeamPublicPage = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch team data
    useEffect(() => {
        const fetchTeam = async () => {
            try {
                setLoading(true);
                const response = await teamAPI.getAll();
                setTeam(response.data.data || []);
            } catch (error) {
                console.error('Error fetching team:', error);
                setTeam([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-rose-50 via-white to-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-gray-900">Tim </span>
                            <span className="text-rose-600">Kami</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Didukung oleh tim profesional yang berdedikasi dan berpengalaman untuk memberikan pelayanan terbaik
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 animate-spin text-rose-600" />
                        </div>
                    ) : team.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {team.map((member) => (
                                <div
                                    key={member._id}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                                >
                                    {/* Photo */}
                                    <div className="aspect-square bg-gradient-to-br from-rose-100 to-slate-100 overflow-hidden">
                                        {member.image ? (
                                            <img
                                                src={getImageUrl(member.image)}
                                                alt={member.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-4xl">👤</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Info */}
                                    <div className="p-3 text-center">
                                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                                            {member.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 truncate mt-1">
                                            {member.position}
                                        </p>
                                        
                                        {/* Social Links */}
                                        {(member.facebook || member.instagram) && (
                                            <div className="flex items-center justify-center gap-2 mt-2">
                                                {member.facebook && (
                                                    <a
                                                        href={member.facebook}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                                    >
                                                        <Facebook className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {member.instagram && (
                                                    <a
                                                        href={member.instagram}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-pink-600 hover:text-pink-800 transition-colors"
                                                    >
                                                        <Instagram className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <span className="text-6xl mb-4 block">👥</span>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Data Tim</h3>
                            <p className="text-gray-600">Data tim akan ditampilkan di sini.</p>
                        </div>
                    )}

                    {/* Stats */}
                    {team.length > 0 && (
                        <div className="mt-12 text-center">
                            <div className="inline-block px-6 py-3 bg-rose-50 rounded-full">
                                <span className="text-rose-600 font-semibold">
                                    {team.length} Anggota Tim
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default TeamPublicPage;
