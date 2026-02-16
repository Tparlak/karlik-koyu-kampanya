'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, RefreshCw, ChevronLeft, ChevronRight, Loader2, AlertTriangle } from 'lucide-react';
import type { Signature } from '@/types/signature';

const PAGE_SIZE = 10;

export default function AdminTable() {
    const [signatures, setSignatures] = useState<Signature[]>([]);
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchSignatures = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/signature?page=${page}&pageSize=${PAGE_SIZE}`);
            if (res.ok) {
                const data = await res.json();
                setSignatures(data.signatures || []);
                setTotalCount(data.total || 0);
            }
        } catch {
            console.error('Failed to fetch signatures');
        } finally {
            setIsLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchSignatures();
    }, [fetchSignatures]);

    const handleDelete = async (id: string) => {
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/signature?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                await fetchSignatures();
            }
        } catch {
            console.error('Failed to delete');
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">İmzalar</h2>
                    <p className="text-sm text-gray-500">Toplam: {totalCount} imza</p>
                </div>
                <button
                    onClick={fetchSignatures}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-xl hover:bg-[#1e40af] transition-colors text-sm cursor-pointer"
                >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    Yenile
                </button>
            </div>

            {/* Table */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-100">
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ad Soyad</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">E-posta</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Mesaj</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tarih</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#1e3a8a]" />
                                        <p className="text-gray-400 text-sm mt-2">Yükleniyor...</p>
                                    </td>
                                </tr>
                            ) : signatures.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                        Henüz imza yok.
                                    </td>
                                </tr>
                            ) : (
                                signatures.map((sig) => (
                                    <tr key={sig.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                            {sig.first_name} {sig.last_name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{sig.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                            {sig.message || <span className="text-gray-300">—</span>}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {new Date(sig.created_at).toLocaleDateString('tr-TR', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setDeleteId(sig.id)}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-xs cursor-pointer"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                Sil
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Sayfa {page + 1} / {totalPages}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(0, p - 1))}
                                disabled={page === 0}
                                className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                                disabled={page >= totalPages - 1}
                                className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deleteId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={() => setDeleteId(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle className="w-6 h-6 text-red-500" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                                İmzayı Sil
                            </h3>
                            <p className="text-gray-500 text-sm text-center mb-6">
                                Bu imzayı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteId(null)}
                                    className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    İptal
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteId)}
                                    disabled={isDeleting}
                                    className="flex-1 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 disabled:opacity-70 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                    Sil
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
