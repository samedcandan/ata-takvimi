"use client";

import { useAuth } from '../context/AuthContext';
import LandingGate from './LandingGate';
import { Loader2 } from 'lucide-react';

export default function AppContentGate({ children }) {
  const { user, isAccessGranted, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 text-forest-800">
        <Loader2 className="w-8 h-8 animate-spin text-harvest-500" />
        <p className="text-xs font-bold font-serif">Ata Takvimi Yükleniyor...</p>
      </div>
    );
  }

  // If user is not logged in or doesn't have active subscription / trial, render LandingGate
  if (!user || !isAccessGranted) {
    return <LandingGate />;
  }

  // Otherwise render full app content
  return <>{children}</>;
}
