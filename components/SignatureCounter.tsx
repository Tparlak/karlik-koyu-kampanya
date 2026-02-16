'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp } from 'lucide-react';

const GOAL = 1000;

export default function SignatureCounter() {
    const [count, setCount] = useState(0);
    const [displayCount, setDisplayCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const counterRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const res = await fetch('/api/signature/count');
                if (res.ok) {
                    const data = await res.json();
                    setCount(data.count || 0);
                } else {
                    // Fallback mock data
                    setCount(247);
                }
            } catch {
                // Fallback mock data
                setCount(247);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCount();
    }, []);

    useEffect(() => {
        if (isLoading || hasAnimated.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    animateCount();
                }
            },
            { threshold: 0.3 }
        );

        if (counterRef.current) observer.observe(counterRef.current);
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, count]);

    const animateCount = () => {
        const duration = 2000;
        const start = performance.now();
        const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayCount(Math.floor(eased * count));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    };

    const percentage = Math.min((count / GOAL) * 100, 100);

    return (
        <section ref={counterRef} className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#f59e0b]/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#1e3a8a]/5 rounded-full blur-3xl" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-1.5 bg-[#1e3a8a]/10 text-[#1e3a8a] rounded-full text-sm font-semibold mb-4">
                        Canlı Sayaç
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        İmza <span className="text-[#1e3a8a]">Durumu</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-2xl shadow-gray-200/50 p-8 sm:p-12"
                >
                    {/* Counter display */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center shadow-lg shadow-blue-900/20">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Şu Anki İmza</div>
                                <div className="text-4xl sm:text-5xl font-extrabold text-[#1e3a8a] tabular-nums">
                                    {isLoading ? '...' : displayCount.toLocaleString('tr-TR')}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <div className="text-sm text-gray-500">Hedef</div>
                                <div className="text-2xl sm:text-3xl font-bold text-gray-400">
                                    {GOAL.toLocaleString('tr-TR')}
                                </div>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                                <Target className="w-6 h-6 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="relative">
                        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${percentage}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
                                className="h-full bg-gradient-to-r from-[#1e3a8a] via-[#2563eb] to-[#f59e0b] rounded-full relative"
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-shimmer" />
                            </motion.div>
                        </div>
                        <div className="flex justify-between mt-3 text-sm text-gray-500">
                            <span>0</span>
                            <span className="font-semibold text-[#1e3a8a]">%{Math.round(percentage)}</span>
                            <span>{GOAL.toLocaleString('tr-TR')}</span>
                        </div>
                    </div>

                    {/* Motivation text */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-500 text-sm">
                            {percentage >= 100
                                ? '🎉 Hedefe ulaşıldı! Teşekkürler!'
                                : `Hedefe ulaşmak için ${(GOAL - count).toLocaleString('tr-TR')} imza daha gerekiyor.`}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
