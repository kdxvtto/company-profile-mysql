import { 
    Percent, 
    Store, 
    ShieldCheck, 
    CreditCard, 
    Zap, 
    Heart, 
    Lightbulb 
} from "lucide-react";

const WhyChooseUs = () => {
    const leftFeatures = [
        {
            icon: Percent,
            title: "BUNGA BERSAING",
            description: "Simpanan di BANK WONOGIRI dengan bunga bersaing sampai dengan suku bunga LPS.",
            color: "text-red-600",
            bgColor: "bg-red-100",
        },
        {
            icon: Store,
            title: "PERMODALAN UMKM",
            description: "Memberikan kemudahan permodalan usaha untuk UMKM.",
            color: "text-emerald-600",
            bgColor: "bg-emerald-100",
        },
        {
            icon: ShieldCheck,
            title: "DI JAMIN LPS",
            description: "Tabungan di BANK WONOGIRI telah di jamin Lembaga Penjamin Simpanan (LPS) sampai dengan 2 Milyar Rupiah.",
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
        {
            icon: CreditCard,
            title: "TANPA BIAYA ADMINISTRASI",
            description: "Produk simpanan dengan biaya administrasi Rp.0 setiap bulan nya.",
            color: "text-orange-600",
            bgColor: "bg-orange-100",
        },
    ];

    const rightFeatures = [
        {
            icon: Zap,
            title: "QUICK RESPONSE",
            description: "Respon cepat dan tanggap dalam memenuhi kebutuhan finansial anda, secepat kebutuhan anda.",
            gradient: "from-yellow-400 to-orange-500",
        },
        {
            icon: Heart,
            title: "100% SATISFACTION",
            description: "Dengan pelayanan prima, tenaga profesional dan sistem jemput bola dari BANK WONOGIRI dapat menjadi alasan anda memilih kami sebagai sahabat finansial anda.",
            gradient: "from-pink-400 to-red-500",
        },
        {
            icon: Lightbulb,
            title: "CREATIVE SERVICE",
            description: "BANK GIRI SUKA DANA terus melakukan inovasi digitalisasi agar tetap dapat bersaing di dunia perbankan dan memberikan pelayanan terbaik, cepat dan efisien bagi nasabah.",
            gradient: "from-rose-400 to-red-500",
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-sm font-semibold text-red-600 tracking-widest uppercase mb-2 block">
                        Mengapa Memilih Kami?
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Alasan anda memilih <span className="text-red-600">BANK WONOGIRI</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-rose-600 mx-auto rounded-full"></div>
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Left Header */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Apa yang kami tawarkan?
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Selain kemudahan Pelayanan Prima terus menjadi sesuatu yang selalu kami tingkatkan.
                            </p>
                        </div>

                        {/* Left Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {leftFeatures.map((feature, index) => {
                                const IconComponent = feature.icon;
                                return (
                                    <div
                                        key={index}
                                        className="group bg-gray-50 rounded-xl p-5 hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100"
                                    >
                                        <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <IconComponent className={`w-6 h-6 ${feature.color}`} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2 text-sm">
                                            {feature.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {rightFeatures.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-r p-[2px] hover:p-[3px] transition-all duration-300"
                                    style={{
                                        backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                                    }}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-100`}></div>
                                    <div className="relative bg-white rounded-2xl p-6 h-full">
                                        <div className="flex items-start gap-4">
                                            <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <IconComponent className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900 mb-2 text-lg">
                                                    {feature.title}
                                                </h4>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
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

export default WhyChooseUs;
