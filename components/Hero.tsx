'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
    const [particles, setParticles] = useState<Array<{ left: string; top: string; duration: number; delay: number }>>([]);

    useEffect(() => {
        setParticles(
            [...Array(20)].map(() => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
            }))
        );
    }, []);

    const scrollToForm = () => {
        const el = document.getElementById('signature-form');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f1b3d] via-[#1e3a8a] to-[#0f1b3d]" />

            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{
                            left: p.left,
                            top: p.top,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay,
                        }}
                    />
                ))}
            </div>

            {/* Overlay pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

            <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs mb-8"
                >
                    <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full animate-pulse" />
                    Dijital İmza Kampanyası Aktif
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
                >
                    Karlık Köyü{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]">
                        Çamur Değil
                    </span>
                    ,{' '}
                    <br className="hidden sm:block" />
                    Yol İstiyor!
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Karlık Köyü halkının güvenli ve modern yollara kavuşması için başlatılan
                    bu kampanyaya siz de destek olun. Sesinizi duyurun!
                </motion.p>

                {/* CTA Button */}
                <motion.button
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(245, 158, 11, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={scrollToForm}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white font-bold text-lg rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 cursor-pointer"
                >
                    Hemen İmza Ver
                    <ChevronDown className="w-5 h-5 animate-bounce" />
                </motion.button>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto"
                >
                    {[
                        { label: 'Köy Halkı', value: '200+' },
                        { label: 'Yıllık Beklenti', value: '10+' },
                        { label: 'Hedef İmza', value: '1000' },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                            <div className="text-xs sm:text-sm text-white/50 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
                >
                    <div className="w-1.5 h-3 bg-white/50 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
