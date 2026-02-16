'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, X, Share2 } from 'lucide-react';

interface ThankYouModalProps {
    onClose: () => void;
}

export default function ThankYouModal({ onClose }: ThankYouModalProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 sm:p-10 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Kapat"
                >
                    <X className="w-4 h-4 text-gray-500" />
                </button>

                {/* Success icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2, damping: 15 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30"
                >
                    <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Teşekkürler!
                    </h3>
                    <p className="text-gray-500 mb-6">
                        İmzanız başarıyla kaydedildi. Karlık Köyü için desteğiniz çok değerli!
                    </p>

                    {/* Share CTA */}
                    <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                        <div className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                            <Share2 className="w-4 h-4" />
                            Kampanyayı paylaşarak daha fazla destek toplayın!
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                        Tamam
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
