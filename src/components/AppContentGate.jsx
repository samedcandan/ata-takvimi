"use client";

import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AppContentGate({ children }) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 text-forest-800">
        <Loader2 className="w-8 h-8 animate-spin text-harvest-500" />
        <p className="text-xs font-bold font-serif">Ata Takvimi Yükleniyor...</p>
      </div>
    );
  }

  // Freemium model: Tüm içerik tüm kullanıcılara doğrudan açıktır.
  // Reklam/Premium ayrımı bileşenler içinde isAdFree ile dinamik yönetilir.
  return <>{children}</>;
}
