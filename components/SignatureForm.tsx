'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, User, Mail, MessageSquare } from 'lucide-react';
import type { SignatureFormData } from '@/types/signature';
import ThankYouModal from './ThankYouModal';

export default function SignatureForm() {
    const [formData, setFormData] = useState<SignatureFormData>({
        first_name: '',
        last_name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState<Partial<Record<keyof SignatureFormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof SignatureFormData, string>> = {};
        if (!formData.first_name.trim()) newErrors.first_name = 'Ad alanı zorunludur';
        if (!formData.last_name.trim()) newErrors.last_name = 'Soyad alanı zorunludur';
        if (!formData.email.trim()) {
            newErrors.email = 'E-posta alanı zorunludur';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Geçerli bir e-posta adresi girin';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');

        if (!validate()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/signature', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.error?.includes('duplicate') || data.error?.includes('already')) {
                    setSubmitError('Bu e-posta adresi ile daha önce imza verilmiş.');
                } else {
                    setSubmitError(data.error || 'Bir hata oluştu. Lütfen tekrar deneyin.');
                }
                return;
            }

            setShowThankYou(true);
            setFormData({ first_name: '', last_name: '', email: '', message: '' });
        } catch {
            setSubmitError('Bağlantı hatası. Lütfen tekrar deneyin.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: keyof SignatureFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    return (
        <>
            <section id="signature-form" className="py-20 sm:py-28 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px bg-gradient-to-r from-transparent via-[#1e3a8a]/20 to-transparent" />

                <div className="max-w-2xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-1.5 bg-[#f59e0b]/10 text-[#d97706] rounded-full text-sm font-semibold mb-4">
                            İmza Formu
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Kampanyaya <span className="text-[#1e3a8a]">Destek Olun</span>
                        </h2>
                        <p className="text-gray-500">
                            Aşağıdaki formu doldurarak dijital imzanızı bırakın.
                        </p>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        onSubmit={handleSubmit}
                        className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-2xl shadow-gray-200/50 p-8 sm:p-10 space-y-6"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Ad *
                                </label>
                                <div className="relative">
                                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        id="first_name"
                                        type="text"
                                        value={formData.first_name}
                                        onChange={(e) => handleChange('first_name', e.target.value)}
                                        placeholder="Adınız"
                                        className={`w-full pl-4 pr-11 py-3 rounded-xl border ${errors.first_name ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all text-gray-900 placeholder:text-gray-400`}
                                        aria-invalid={!!errors.first_name}
                                    />
                                </div>
                                <AnimatePresence>
                                    {errors.first_name && (
                                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1">
                                            {errors.first_name}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="last_name" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Soyad *
                                </label>
                                <div className="relative">
                                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        id="last_name"
                                        type="text"
                                        value={formData.last_name}
                                        onChange={(e) => handleChange('last_name', e.target.value)}
                                        placeholder="Soyadınız"
                                        className={`w-full pl-4 pr-11 py-3 rounded-xl border ${errors.last_name ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all text-gray-900 placeholder:text-gray-400`}
                                        aria-invalid={!!errors.last_name}
                                    />
                                </div>
                                <AnimatePresence>
                                    {errors.last_name && (
                                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1">
                                            {errors.last_name}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                E-posta *
                            </label>
                            <div className="relative">
                                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    placeholder="ornek@email.com"
                                    className={`w-full pl-4 pr-11 py-3 rounded-xl border ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all text-gray-900 placeholder:text-gray-400`}
                                    aria-invalid={!!errors.email}
                                />
                            </div>
                            <AnimatePresence>
                                {errors.email && (
                                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1">
                                        {errors.email}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                Destek Mesajınız <span className="text-gray-400 font-normal">(isteğe bağlı)</span>
                            </label>
                            <div className="relative">
                                <MessageSquare className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => handleChange('message', e.target.value)}
                                    placeholder="Kampanyaya destek mesajınızı yazabilirsiniz..."
                                    rows={4}
                                    className="w-full pl-4 pr-11 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all resize-none text-gray-900 placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Error message */}
                        <AnimatePresence>
                            {submitError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                                >
                                    {submitError}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit button */}
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            className="w-full py-4 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Gönderiliyor...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    İmza Ver
                                </>
                            )}
                        </motion.button>
                    </motion.form>
                </div>
            </section>

            <AnimatePresence>
                {showThankYou && <ThankYouModal onClose={() => setShowThankYou(false)} />}
            </AnimatePresence>
        </>
    );
}
