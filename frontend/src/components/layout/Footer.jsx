import { Facebook, Instagram, Youtube, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
    return (
        <footer className="bg-slate-800 text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    {/* Column 1 - Brand & Social */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold mb-2">BANK WONOGIRI</h3>
                            <p className="text-slate-400 text-sm">
                                © 2025 BANK WONOGIRI.<br />
                                All rights reserved.
                            </p>
                        </div>
                        
                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <a
                                href="https://facebook.com/bankwonogiri"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-slate-700 hover:bg-[#1877F2] rounded-full flex items-center justify-center transition-colors duration-300"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://instagram.com/bankwonogiri"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-slate-700 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors duration-300"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://youtube.com/bankwonogiri"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-slate-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
                                aria-label="YouTube"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2 - Get in Touch */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Get in Touch</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-slate-400 text-sm">
                                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
                                <span>Jl. Diponegoro No.22, Jatirejo, Wonoboyo, Kec. Wonogiri, Kabupaten Wonogiri, Jawa Tengah 57615</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400 text-sm">
                                <Mail className="w-5 h-5 flex-shrink-0 text-red-400" />
                                <a href="mailto:info@bankwonogiri.co.id" className="hover:text-white transition-colors">
                                    info@bankwonogiri.co.id
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400 text-sm">
                                <Phone className="w-5 h-5 flex-shrink-0 text-red-400" />
                                <a href="tel:+62273324044" className="hover:text-white transition-colors">
                                    CS : (0273) 324044
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Column 3 - Learn More */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Learn More</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/terms" className="text-slate-400 text-sm hover:text-white transition-colors">
                                    Terms and Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-slate-400 text-sm hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4 - Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Newsletter</h4>
                        <p className="text-slate-400 text-sm">
                            Berlangganan informasi dari BPR BANK WONOGIRI secara gratis.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Masukkan email"
                                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-red-500"
                            />
                            <Button className="bg-red-600 hover:bg-red-700 px-6">
                                Join
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-700">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
                    <p className="text-center text-slate-500 text-sm">
                        PT BPR BANK WONOGIRI (Perseroda) - Bank milik Pemerintah Kabupaten Wonogiri
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
