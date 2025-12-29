import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { servicesAPI } from "@/lib/api";

// Base URL untuk gambar dari backend
const API_BASE_URL = 'http://localhost:3000';

// Helper function untuk mendapatkan URL gambar yang benar
const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
};

// Gradient colors untuk slides
const gradients = [
    "from-red-600 via-red-700 to-rose-800",
    "from-emerald-600 via-teal-600 to-cyan-700",
    "from-violet-600 via-purple-600 to-fuchsia-700",
    "from-blue-600 via-blue-700 to-indigo-800",
    "from-orange-500 via-orange-600 to-red-600",
];

const Hero = () => {
    const [api, setApi] = useState(null);
    const [current, setCurrent] = useState(0);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch services dari database
    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const response = await servicesAPI.getAll();
                const data = response.data.data || [];
                // Ambil maksimal 5 services untuk carousel
                setServices(data.slice(0, 5));
            } catch (error) {
                console.error('Error fetching services:', error);
                // Fallback data jika API error
                setServices([
                    { _id: '1', title: 'Kredit Umum', content: 'Pinjaman untuk berbagai kebutuhan dengan tenor fleksibel.', category: 'Kredit' },
                    { _id: '2', title: 'Tabungan', content: 'Simpanan aman dengan bunga kompetitif.', category: 'Tabungan' },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    // Auto-play carousel
    useEffect(() => {
        if (!api) return;

        const interval = setInterval(() => {
            api.scrollNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [api]);

    // Track current slide
    useEffect(() => {
        if (!api) return;

        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const scrollPrev = useCallback(() => {
        api?.scrollPrev();
    }, [api]);

    const scrollNext = useCallback(() => {
        api?.scrollNext();
    }, [api]);

    const scrollTo = useCallback((index) => {
        api?.scrollTo(index);
    }, [api]);

    // Get category icon
    const getCategoryIcon = (category) => {
        switch(category) {
            case 'Kredit': return '💰';
            case 'Tabungan': return '🏦';
            case 'Deposito': return '📈';
            default: return '💳';
        }
    };

    if (loading) {
        return (
            <section className="relative pt-16">
                <div className="min-h-[500px] md:min-h-[600px] bg-gradient-to-br from-red-600 via-red-700 to-rose-800 flex items-center justify-center">
                    <Loader2 className="w-12 h-12 animate-spin text-white" />
                </div>
            </section>
        );
    }

    return (
        <section className="relative pt-16">
            <Carousel
                setApi={setApi}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {services.map((service, index) => (
                        <CarouselItem key={service._id}>
                            <div
                                className={`relative min-h-[500px] md:min-h-[600px] bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center overflow-hidden`}
                            >
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
                                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
                                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                                        {/* Text Content */}
                                        <div className="text-white space-y-6">
                                            <div 
                                                className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium"
                                            >
                                                {service.category || 'Layanan'}
                                            </div>
                                            <div 
                                                className="space-y-2 animate-fade-in"
                                                style={{ animationDelay: "0.1s" }}
                                            >
                                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                                    {service.title}
                                                </h1>
                                            </div>
                                            
                                            <p 
                                                className="text-lg md:text-xl text-white/80 max-w-lg animate-fade-in line-clamp-3"
                                                style={{ animationDelay: "0.2s" }}
                                            >
                                                {service.content}
                                            </p>

                                            <div 
                                                className="flex flex-wrap gap-4 pt-4 animate-fade-in"
                                                style={{ animationDelay: "0.3s" }}
                                            >
                                                <Link to={`/layanan/produk/${service._id}`}>
                                                    <Button
                                                        size="lg"
                                                        className="bg-white text-gray-900 hover:bg-white/90 font-semibold px-8 py-6 text-base"
                                                    >
                                                        Lihat Detail
                                                        <ArrowRight className="ml-2 h-5 w-5" />
                                                    </Button>
                                                </Link>
                                                <Link to="/layanan/produk">
                                                    <Button
                                                        size="lg"
                                                        variant="outline"
                                                        className="border-2 border-white bg-transparent !text-white hover:bg-white/20 px-8 py-6 text-base"
                                                    >
                                                        Semua Layanan
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Illustration/Image */}
                                        <div className="hidden lg:flex justify-center items-center">
                                            {service.image ? (
                                                <div className="w-80 h-80 rounded-3xl overflow-hidden shadow-2xl">
                                                    <img
                                                        src={getImageUrl(service.image)}
                                                        alt={service.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                                                    <span className="text-9xl">
                                                        {getCategoryIcon(service.category)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation Arrows */}
                <button
                    onClick={scrollPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={scrollNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </Carousel>

            {/* Dots Navigation */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {services.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            current === index
                                ? "bg-white w-8"
                                : "bg-white/50 hover:bg-white/70"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
