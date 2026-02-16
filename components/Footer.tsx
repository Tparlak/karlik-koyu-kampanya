'use client';

import { motion } from 'framer-motion';
import { Heart, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#0f1b3d] text-white relative overflow-hidden">
            {/* Gradient line */}
            <div className="h-1 bg-gradient-to-r from-[#1e3a8a] via-[#f59e0b] to-[#1e3a8a]" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid md:grid-cols-3 gap-8 items-center"
                >
                    {/* Left */}
                    <div>
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                            <span className="text-[#f59e0b]">Karlık Köyü</span>
                            Kampanyası
                        </h3>
                        <p className="text-white/50 text-sm">
                            Bu bir sivil inisiyatif hareketidir.
                        </p>
                    </div>

                    {/* Center */}
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
                            <Mail className="w-4 h-4" />
                            <a
                                href="mailto:kampanya@karlikkoyu.org"
                                className="hover:text-[#f59e0b] transition-colors"
                            >
                                kampanya@karlikkoyu.org
                            </a>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="text-right">
                        <p className="text-white/40 text-sm flex items-center justify-end gap-1">
                            Yapıldı
                            <Heart className="w-3 h-3 text-red-400" />
                            ile
                        </p>
                        <p className="text-white/30 text-xs mt-1">
                            © {new Date().getFullYear()} Karlık Köyü Yol Kampanyası. Tüm hakları saklıdır.
                        </p>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
