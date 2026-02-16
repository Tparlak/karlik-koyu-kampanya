'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, LogIn, Loader2, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import AdminTable from '@/components/AdminTable';

export default function AdminPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (!supabase) {
                // Mock login for development
                if (email && password) {
                    setIsLoggedIn(true);
                } else {
                    setError('E-posta ve şifre gereklidir.');
                }
                return;
            }

            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) {
                setError('Giriş başarısız. E-posta veya şifre hatalı.');
                return;
            }

            setIsLoggedIn(true);
        } catch {
            setError('Bağlantı hatası. Lütfen tekrar deneyin.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoggedIn) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Admin header */}
                <div className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                                <p className="text-xs text-gray-500">Karlık Köyü Kampanyası</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsLoggedIn(false)}
                            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                        >
                            Çıkış Yap
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                    <AdminTable />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f1b3d] via-[#1e3a8a] to-[#0f1b3d] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full p-8 sm:p-10"
            >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/30">
                    <Lock className="w-8 h-8 text-white" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                    Admin Girişi
                </h1>
                <p className="text-gray-500 text-sm text-center mb-8">
                    Kampanya yönetim paneline erişmek için giriş yapın.
                </p>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label htmlFor="admin-email" className="block text-sm font-semibold text-gray-700 mb-2">
                            E-posta
                        </label>
                        <input
                            id="admin-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@ornek.com"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all text-gray-900"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="admin-password" className="block text-sm font-semibold text-gray-700 mb-2">
                            Şifre
                        </label>
                        <input
                            id="admin-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all text-gray-900"
                            required
                        />
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] text-white font-semibold rounded-xl shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 disabled:opacity-70 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <LogIn className="w-5 h-5" />
                        )}
                        Giriş Yap
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
