import { Shield, Heart, TrendingUp, Award } from "lucide-react";

const CompanyProfile = () => {
    const values = [
        {
            icon: Heart,
            title: "Sehat",
            description: "Kondisi keuangan yang solid dan terjaga dengan baik",
            color: "from-red-500 to-pink-500",
            bgColor: "bg-red-50",
            iconColor: "text-red-500",
        },
        {
            icon: Shield,
            title: "Terpercaya",
            description: "Dipercaya masyarakat Wonogiri selama puluhan tahun",
            color: "from-red-500 to-rose-500",
            bgColor: "bg-red-50",
            iconColor: "text-red-500",
        },
        {
            icon: TrendingUp,
            title: "Kompetitif",
            description: "Menawarkan produk dengan suku bunga yang bersaing",
            color: "from-emerald-500 to-teal-500",
            bgColor: "bg-emerald-50",
            iconColor: "text-emerald-500",
        },
        {
            icon: Award,
            title: "Professional & Bermanfaat",
            description: "Pelayanan profesional untuk kesejahteraan masyarakat",
            color: "from-amber-500 to-orange-500",
            bgColor: "bg-amber-50",
            iconColor: "text-amber-500",
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-block">
                        <span className="text-sm font-semibold text-red-600 tracking-widest uppercase mb-2 block">
                            Company Profile
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            BANK <span className="text-red-600">WONOGIRI</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-rose-600 mx-auto rounded-full mb-8"></div>
                    </div>
                    
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        <span className="font-semibold text-gray-800">PT BPR BANK WONOGIRI (Perseroda)</span> adalah Bank milik Pemerintah Kabupaten Wonogiri, 
                        satu-satunya Bank di Kabupaten Wonogiri yang{" "}
                        <span className="font-semibold text-red-600">100% sahamnya milik Pemkab Wonogiri</span>.
                    </p>
                </div>

                {/* Values Grid - 2x2 Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {values.map((value, index) => {
                        const IconComponent = value.icon;
                        return (
                            <div
                                key={index}
                                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                            >
                                {/* Background Gradient on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                                
                                {/* Decorative Circle */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full opacity-50"></div>
                                
                                <div className="relative flex items-start gap-5">
                                    {/* Icon Container */}
                                    <div className={`flex-shrink-0 w-16 h-16 ${value.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className={`w-8 h-8 ${value.iconColor}`} />
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                                            {value.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                            </div>
                        );
                    })}
                </div>

                {/* Additional Info */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-3 bg-red-50 px-6 py-3 rounded-full">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-red-700 font-medium">Melayani masyarakat Wonogiri sejak tahun 1982</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompanyProfile;
