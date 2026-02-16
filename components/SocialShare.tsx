'use client';

import { motion } from 'framer-motion';
import { Share2, MessageCircle, Twitter, Facebook } from 'lucide-react';
import { useEffect, useState } from 'react';

// Define exact strings for hydration stability
const FALLBACK_URL = 'https://karlik-koyu-kampanya.vercel.app';
const SHARE_TEXT = 'Karlık Köyü yol kampanyasına destek olun! 🛤️';

export default function SocialShare() {
    const [currentUrl, setCurrentUrl] = useState(FALLBACK_URL);

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    const shareLinks = [
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            color: 'from-green-500 to-green-600',
            shadow: 'shadow-green-500/20',
            hoverShadow: 'hover:shadow-green-500/40',
            url: `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${currentUrl}`)}`,
        },
        {
            name: 'Twitter',
            icon: Twitter,
            color: 'from-sky-400 to-sky-500',
            shadow: 'shadow-sky-400/20',
            hoverShadow: 'hover:shadow-sky-400/40',
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(currentUrl)}`,
        },
        {
            name: 'Facebook',
            icon: Facebook,
            color: 'from-blue-600 to-blue-700',
            shadow: 'shadow-blue-600/20',
            hoverShadow: 'hover:shadow-blue-600/40',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        },
    ];
    return (
        <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1e3a8a]/10 to-[#f59e0b]/10 flex items-center justify-center mx-auto mb-6">
                        <Share2 className="w-8 h-8 text-[#1e3a8a]" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Kampanyayı <span className="text-[#1e3a8a]">Paylaşın</span>
                    </h2>
                    <p className="text-gray-500 mb-10 max-w-lg mx-auto">
                        Sosyal medyada paylaşarak daha fazla kişinin kampanyadan haberdar olmasını sağlayın.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-4">
                    {shareLinks.map((link, i) => (
                        <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -4, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${link.color} text-white font-semibold rounded-2xl shadow-lg ${link.shadow} ${link.hoverShadow} transition-all duration-300`}
                        >
                            <link.icon className="w-5 h-5" />
                            {link.name}
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
