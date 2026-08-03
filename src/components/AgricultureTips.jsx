"use client";

import { Quote, BookOpenCheck } from 'lucide-react';
import { getRandomProverb } from '../lib/utils';

export default function AgricultureTips({ selectedDate = new Date() }) {
  const proverb = getRandomProverb(selectedDate);

  return (
    <div className="glass-card rounded-3xl p-6 border border-harvest-500/30 bg-gradient-to-br from-white/90 to-harvest-400/10 shadow-lg">
      <div className="flex items-center gap-2 text-harvest-600 font-bold text-sm mb-3">
        <Quote className="w-5 h-5 text-harvest-500" />
        <span>Günün Anadolu Bilgeliği & Sözü</span>
      </div>

      <blockquote className="text-lg font-serif italic text-forest-900 border-l-4 border-harvest-500 pl-4 py-1 leading-snug">
        "{proverb}"
      </blockquote>

      <div className="mt-4 pt-3 border-t border-forest-800/10 flex items-center justify-between text-xs text-forest-800/70">
        <span className="flex items-center gap-1">
          <BookOpenCheck className="w-4 h-4 text-forest-500" />
          Kuşaktan Kuşağa Aktarılan Çiftçi İpuçları
        </span>
        <span className="font-semibold text-forest-900">Anadolu Mirası</span>
      </div>
    </div>
  );
}
