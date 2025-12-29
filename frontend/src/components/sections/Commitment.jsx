import { Users, CheckCircle, Clock, Star } from "lucide-react";

const Commitment = () => {
    const stats = [
        {
            value: "57",
            label: "Tenaga Profesional",
            icon: Users,
            color: "from-red-500 to-rose-600",
        },
        {
            value: "18.651",
            label: "Total Nasabah",
            icon: CheckCircle,
            color: "from-emerald-500 to-teal-600",
        },
        {
            value: "145M+",
            label: "Aset",
            icon: Clock,
            color: "from-purple-500 to-pink-600",
        },
        {
            value: "15+",
            label: "Inovasi Digital",
            icon: Star,
            color: "from-amber-500 to-orange-600",
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-red-900 via-red-800 to-rose-900 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left - Content */}
                    <div className="text-white space-y-6">
                        <div className="space-y-4">
                            <span className="text-sm font-semibold text-red-300 tracking-widest uppercase">
                                Statistik Kami
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                                Komitmen Kami dalam Pelayanan Terbaik
                            </h2>
                            <p className="text-xl text-red-200">
                                Kami hadir untuk mendukung setiap langkah perkembangan bisnis Anda.
                            </p>
                        </div>

                        <p className="text-white/80 leading-relaxed text-lg">
                            Bank Wonogiri terus berkembang dan berkomitmen untuk memberikan layanan terbaik kepada masyarakat. Dengan dukungan tim profesional yang solid, kami siap melayani kebutuhan finansial Anda dengan penuh dedikasi dan keahlian.
                        </p>

                        <p className="text-white/80 leading-relaxed">
                            Statistik ini mencerminkan pertumbuhan kami dan semangat kami untuk membangun pelayanan yang lebih baik bagi seluruh nasabah dan mitra.
                        </p>
                    </div>

                    {/* Right - Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        {stats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                                >
                                    {/* Gradient overlay on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300`}></div>
                                    
                                    <div className="relative z-10 text-center">
                                        <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>
                                        <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                                            {stat.value}
                                        </p>
                                        <p className="text-red-200 text-sm">
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Commitment;
