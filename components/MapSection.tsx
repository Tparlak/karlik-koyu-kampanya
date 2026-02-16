'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import map to avoid SSR issues with Leaflet
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false }
);
const Popup = dynamic(
    () => import('react-leaflet').then((mod) => mod.Popup),
    { ssr: false }
);

const KARLIK_COORDS: [number, number] = [40.8836, 36.3069];

// Fix for Leaflet marker icons in Next.js
const FixLeafletIcon = () => {
    useEffect(() => {
        (async () => {
            const L = (await import('leaflet')).default;
            // @ts-ignore
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            });
        })();
    }, []);
    return null;
};


export default function MapSection() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <section className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            <FixLeafletIcon />
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-1.5 bg-[#f59e0b]/10 text-[#d97706] rounded-full text-sm font-semibold mb-4">
                        <MapPin className="inline w-4 h-4 mr-1 -mt-0.5" />
                        Konum
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Karlık Köyü <span className="text-[#1e3a8a]">Nerede?</span>
                    </h2>
                    <p className="text-gray-500 max-w-lg mx-auto">
                        Amasya ili, Taşova ilçesine bağlı Karlık Köyü&apos;nün konumunu haritada görün.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-3xl border border-gray-200/50 shadow-2xl shadow-gray-200/50 overflow-hidden"
                >
                    <div className="h-[400px] sm:h-[500px] relative">
                        {isClient ? (
                            <MapContainer
                                center={KARLIK_COORDS}
                                zoom={12}
                                scrollWheelZoom={false}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={KARLIK_COORDS}>
                                    <Popup>
                                        <div className="text-center p-1">
                                            <strong className="text-[#1e3a8a]">Karlık Köyü</strong>
                                            <br />
                                            <span className="text-gray-500 text-xs">Taşova, Amasya</span>
                                            <br />
                                            <span className="text-[#f59e0b] text-xs font-medium">🛤️ Yol bekliyor</span>
                                        </div>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center bg-gray-100">
                                <div className="text-gray-400 text-center">
                                    <MapPin className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                                    <p>Harita yükleniyor...</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Info bar */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-[#1e3a8a]" />
                            Karlık Köyü, Taşova, Amasya
                        </div>
                        <div className="text-xs text-gray-400">
                            Koordinatlar: 40.8836°N, 36.3069°E
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
