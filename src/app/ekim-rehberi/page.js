"use client";

import { useState } from 'react';
import { Sprout, Search, Calendar, Droplets, Moon, ShieldCheck } from 'lucide-react';
import { CROPS_GUIDE } from '../../data/ekim-rehberi';
import GlassIcon from '../../components/GlassIcon';
import NativeAdCard from '../../components/NativeAdCard';

export default function CropsGuidePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Hepsi');

  const categories = ['Hepsi', 'Tahıl & Baklagil', 'Sebze', 'Kök Sebze', 'Yeşillik & Tıbbi Otlar', 'Meyve & Sert Kabuklu', 'Endüstri Bitkisi'];

  const filteredCrops = CROPS_GUIDE.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(search.toLowerCase()) ||
                          crop.careTips.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Hepsi' || 
                            crop.category.includes(selectedCategory) ||
                            selectedCategory.includes(crop.category);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-forest-800/10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-harvest-500 font-bold text-sm mb-2">
            <Sprout className="w-5 h-5" />
            <span>Tarımsal Ürün & Bakım Kılavuzu</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-forest-900 leading-tight">
            Ekim, Dikim ve Bakım Rehberi
          </h1>
          <p className="text-sm text-forest-800/80 mt-2">
            Hangi ürün ne zaman ekilir? Ay evresine göre budama ve gübreleme zamanı nedir? İhtiyacınız olan tüm tarımsal bilgiler.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'badge-forest shadow-md'
                    : 'bg-white/80 text-forest-900 hover:bg-forest-800/10 border border-forest-800/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-forest-800/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Ürün veya bakım ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/90 border border-forest-800/15 rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:border-harvest-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Crops Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map(crop => (
          <div
            key={crop.id}
            className="glass-card rounded-3xl p-6 border border-forest-800/10 flex flex-col justify-between hover:border-harvest-500/50 transition-all duration-300 hover:shadow-2xl group relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <GlassIcon 
                  cropId={crop.id}
                  icon={crop.icon} 
                  category={crop.category} 
                  size={52} 
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-xs bg-harvest-400/20 text-harvest-600 font-bold px-3 py-1 rounded-full border border-harvest-500/30">
                  {crop.category}
                </span>
              </div>

              <h3 className="text-xl font-serif font-bold text-forest-900 mb-2">{crop.name}</h3>

              <div className="space-y-2.5 text-xs text-forest-800/90 my-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-terracotta-500 shrink-0" />
                  <span><strong>Ekim Zamanı:</strong> {crop.sowingPeriod}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-harvest-500 shrink-0" />
                  <span><strong>Tercih Edilen Ay:</strong> {crop.preferredMoon}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-500 shrink-0" />
                  <span><strong>Su İhtiyacı:</strong> {crop.waterNeed}</span>
                </div>
              </div>

              <div className="bg-forest-50 p-3 rounded-2xl border border-forest-500/15 text-xs text-forest-900 mt-4">
                <p className="font-bold flex items-center gap-1 text-forest-800 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Bakım & İpucu:
                </p>
                <p className="text-forest-800/90 leading-snug">{crop.careTips}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-forest-800/10 flex items-center justify-between text-[11px] text-forest-800/60 font-medium">
              <span>Hasat Zamanı:</span>
              <span className="font-bold text-forest-900">{crop.harvestPeriod}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sponsorlu Reklam Kartı */}
      <NativeAdCard index={2} />
    </div>
  );
}
