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

                                        {/* Illustration/Image - Unique Design */}
                                        <div className="hidden lg:flex justify-center items-center relative">
                                            {/* Floating decorative elements */}
                                            <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-sm animate-float" style={{ animationDelay: '0s' }} />
                                            <div className="absolute -bottom-4 -left-8 w-16 h-16 bg-white/15 rounded-full blur-sm animate-float" style={{ animationDelay: '1s' }} />
                                            <div className="absolute top-1/3 -right-10 w-12 h-12 bg-white/10 rounded-full blur-sm animate-float" style={{ animationDelay: '2s' }} />
                                            
                                            {/* Animated gradient ring - larger to accommodate bigger image */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-[480px] h-[480px] rounded-full border-2 border-dashed border-white/20 animate-spin-slow" />
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-[440px] h-[440px] rounded-full border border-white/10" />
                                            </div>

                                            {service.image ? (
                                                <div className="relative group">
                                                    {/* Background shadow layer */}
                                                    <div className="absolute inset-0 bg-black/30 rounded-[60px_20px_60px_20px] translate-x-4 translate-y-4 blur-xl" />
                                                    
                                                    {/* Gradient glow border */}
                                                    <div className="absolute -inset-2 bg-gradient-to-br from-white/50 via-white/20 to-transparent rounded-[64px_24px_64px_24px] opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                                                    
                                                    {/* Decorative frame lines */}
                                                    <div className="absolute -top-4 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                                    <div className="absolute -bottom-4 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                                    <div className="absolute top-8 bottom-8 -left-4 w-0.5 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
                                                    <div className="absolute top-8 bottom-8 -right-4 w-0.5 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
                                                    
                                                    {/* Main image container - Asymmetric rounded shape with tilt */}
                                                    <div 
                                                        className="relative w-[400px] h-[400px] overflow-hidden shadow-2xl group-hover:rotate-1 transition-transform duration-700"
                                                        style={{ borderRadius: '60px 20px 60px 20px' }}
                                                    >
                                                        {/* Inner gradient overlay for depth */}
                                                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 z-10 pointer-events-none" />
                                                        {/* Shine effect */}
                                                        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/15 to-transparent z-10 pointer-events-none" />
                                                        <img
                                                            src={getImageUrl(service.image)}
                                                            alt={service.title}
                                                            width={400}
                                                            height={400}
                                                            loading="eager"
                                                            decoding="async"
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                        />
                                                    </div>
                                                    
                                                    {/* Floating badge - positioned at the corner */}
                                                    <div className="absolute -bottom-4 right-4 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 animate-bounce-gentle border border-white/50">
                                                        <span className="text-2xl">{getCategoryIcon(service.category)}</span>
                                                        <span className="text-sm font-bold text-gray-800">{service.category || 'Layanan'}</span>
                                                    </div>
                                                    
                                                    {/* Small decorative dot */}
                                                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/80 rounded-full shadow-lg" />
                                                </div>
                                            ) : (
                                                <div className="relative group">
                                                    {/* Background shadow layer */}
                                                    <div className="absolute inset-0 bg-black/30 rounded-[60px_20px_60px_20px] translate-x-4 translate-y-4 blur-xl" />
                                                    
                                                    {/* Gradient glow border */}
                                                    <div className="absolute -inset-2 bg-gradient-to-br from-white/50 via-white/20 to-transparent rounded-[64px_24px_64px_24px] opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                                                    
                                                    {/* Decorative frame lines */}
                                                    <div className="absolute -top-4 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                                    <div className="absolute -bottom-4 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                                    <div className="absolute top-8 bottom-8 -left-4 w-0.5 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
                                                    <div className="absolute top-8 bottom-8 -right-4 w-0.5 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
                                                    
                                                    {/* Main container - Asymmetric rounded shape */}
                                                    <div 
                                                        className="relative w-[400px] h-[400px] bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden group-hover:rotate-1 transition-transform duration-700"
                                                        style={{ borderRadius: '60px 20px 60px 20px' }}
                                                    >
                                                        {/* Inner gradient */}
                                                        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-white/5" />
                                                        {/* Shine effect */}
                                                        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/15 to-transparent" />
                                                        {/* Icon */}
                                                        <span className="text-[10rem] relative z-10 group-hover:scale-110 transition-transform duration-500">
                                                            {getCategoryIcon(service.category)}
                                                        </span>
                                                        {/* Decorative circles */}
                                                        <div className="absolute top-10 right-10 w-16 h-16 border-2 border-white/30 rounded-full" />
                                                        <div className="absolute bottom-12 left-12 w-10 h-10 bg-white/20 rounded-full" />
                                                    </div>
                                                    
                                                    {/* Floating badge */}
                                                    <div className="absolute -bottom-4 right-4 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 animate-bounce-gentle border border-white/50">
                                                        <span className="text-2xl">{getCategoryIcon(service.category)}</span>
                                                        <span className="text-sm font-bold text-gray-800">{service.category || 'Layanan'}</span>
                                                    </div>
                                                    
                                                    {/* Small decorative dot */}
                                                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/80 rounded-full shadow-lg" />
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
