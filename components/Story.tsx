'use client';

import { motion } from 'framer-motion';
import { Mountain, CloudRain, AlertTriangle, Heart } from 'lucide-react';

export default function Story() {
    const features = [
        {
            icon: CloudRain,
            title: 'Yağmurda Çamur',
            desc: 'Yağmur yağdığında köy yolları çamura dönüşüyor, ulaşım imkansız hale geliyor.',
        },
        {
            icon: AlertTriangle,
            title: 'Güvenlik Riski',
            desc: 'Acil durumlarda ambulans ve itfaiye araçları köye ulaşmakta güçlük çekiyor.',
        },
        {
            icon: Mountain,
            title: 'Kış Şartları',
            desc: 'Kış aylarında kar ve buzlanma nedeniyle yol tamamen kapanıyor.',
        },
        {
            icon: Heart,
            title: 'Yaşam Kalitesi',
            desc: 'Çocuklar okula, hastalar hastaneye güvenli şekilde ulaşamıyor.',
        },
    ];

    return (
        <section id="story" className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#1e3a8a]/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#f59e0b]/5 rounded-full blur-3xl" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 bg-[#1e3a8a]/10 text-[#1e3a8a] rounded-full text-sm font-semibold mb-4">
                        Neden Bu Kampanya?
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Karlık Köyü&apos;nün <span className="text-[#1e3a8a]">Hikayesi</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Amasya&apos;nın Taşova ilçesine bağlı Karlık Köyü, yıllardır yol sorunuyla mücadele etmektedir.
                    </p>
                </motion.div>

                {/* Two-column layout */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Story text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-xl shadow-gray-100/50 p-8 sm:p-10">
                            <p className="text-gray-700 leading-relaxed text-lg mb-6">
                                Karlık Köyü sakinleri yıllardır güvenli ve modern bir yol altyapısından yoksun
                                yaşamaktadır. Mevcut stabilize yol, özellikle kış aylarında ve yağışlı havalarda
                                kullanılamaz hale gelmektedir.
                            </p>
                            <p className="text-gray-700 leading-relaxed text-lg mb-6">
                                Köydeki çocuklar okula giderken, hastalar hastaneye ulaşmaya çalışırken
                                büyük zorluklar yaşamaktadır. Acil sağlık hizmetlerine erişim, yol koşulları
                                nedeniyle hayati tehlike oluşturabilecek düzeyde gecikebilmektedir.
                            </p>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                Bu kampanya ile yetkililere sesimizi duyurmayı, köyümüze hak ettiği
                                modern ve güvenli yolu kazandırmayı hedefliyoruz. Her imza, bu hedefe
                                bir adım daha yaklaşmamız demektir.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right - Feature cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 p-6 hover:border-[#1e3a8a]/20 hover:shadow-[#1e3a8a]/5 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e3a8a]/10 to-[#1e3a8a]/5 flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-[#1e3a8a]" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
