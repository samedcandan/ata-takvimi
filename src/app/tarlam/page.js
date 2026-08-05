"use client";

import { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, Calendar, MapPin, Sprout, Moon, ShieldCheck } from 'lucide-react';
import { CROPS_GUIDE } from '../../data/ekim-rehberi';
import GlassIcon from '../../components/GlassIcon';

export default function MyFieldNotesPage() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    cropId: 'bugday',
    fieldName: 'Köyönü Tarlası',
    sowingDate: new Date().toISOString().split('T')[0],
    note: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('ata_takvimi_notes');
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Default demo plant note
      setNotes([
        {
          id: 1,
          cropId: 'bugday',
          cropName: 'Buğday',
          cropCategory: 'Tahıl & Baklagil',
          fieldName: 'Köyönü Tarlası',
          sowingDate: '2026-10-15',
          note: 'Hilal safhasında ekildi. 50 kg taban gübresi atıldı. Baharda azotlu üst gübreleme yapılacak.'
        },
        {
          id: 2,
          cropId: 'incir',
          cropName: 'İncir',
          cropCategory: 'Meyve & Sert Kabuklu',
          fieldName: 'Ev Arkası Bahçe',
          sowingDate: '2026-02-20',
          note: 'İletleme ve haziran budaması yapıldı. Yağmurlardan korumak için kurutma sergisi hazırlandı.'
        }
      ]);
    }
  }, []);

  const saveNotes = (updated) => {
    setNotes(updated);
    localStorage.setItem('ata_takvimi_notes', JSON.stringify(updated));
  };

  const handleAddPlant = (e) => {
    e.preventDefault();
    const cropInfo = CROPS_GUIDE.find(c => c.id === formData.cropId) || CROPS_GUIDE[0];

    const newPlantNote = {
      id: Date.now(),
      cropId: cropInfo.id,
      cropName: cropInfo.name,
      cropCategory: cropInfo.category,
      cropIcon: cropInfo.icon,
      preferredMoon: cropInfo.preferredMoon,
      harvestPeriod: cropInfo.harvestPeriod,
      fieldName: formData.fieldName || 'Bahçem / Tarlam',
      sowingDate: formData.sowingDate || new Date().toISOString().split('T')[0],
      note: formData.note
    };

    const updated = [newPlantNote, ...notes];
    saveNotes(updated);
    setFormData({
      cropId: CROPS_GUIDE[0].id,
      fieldName: '',
      sowingDate: new Date().toISOString().split('T')[0],
      note: ''
    });
    setShowModal(false);
  };

  const handleDeleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id);
    saveNotes(updated);
  };

  // Helper to find crop info by cropId or cropName fallback
  const getCropMeta = (note) => {
    if (note.cropId) {
      return CROPS_GUIDE.find(c => c.id === note.cropId) || { id: note.cropId, name: note.cropName, category: note.cropCategory || 'Tarım' };
    }
    const found = CROPS_GUIDE.find(c => c.name.toLowerCase().includes((note.cropName || '').toLowerCase()));
    return found || { id: 'bugday', name: note.cropName || 'Bitki', category: 'Tarım' };
  };

  const selectedCropObj = CROPS_GUIDE.find(c => c.id === formData.cropId) || CROPS_GUIDE[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 md:p-8 flex flex-wrap items-center justify-between gap-4 border border-forest-800/10">
        <div>
          <div className="flex items-center gap-2 text-harvest-500 font-bold text-sm mb-1">
            <BookOpen className="w-5 h-5" />
            <span>Ata Ajandası</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-forest-900 leading-tight">
            Bitkilerim & Notlar
          </h1>
          <p className="text-sm text-forest-800/80 mt-1">
            Bahçenizde ve tarlanızda yetiştirdiğiniz bitkileri seçin, ekim tarihlerini ve gübre notlarınızı kaydedin.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="badge-forest px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4 text-harvest-400" />
          <span>+ Yeni Bitki Ekle</span>
        </button>
      </div>

      {/* Plant Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length === 0 ? (
          <div className="col-span-full glass-card rounded-3xl p-12 text-center text-forest-800/60">
            <Sprout className="w-12 h-12 mx-auto mb-3 text-forest-500/40" />
            <p className="font-semibold text-base">Henüz eklenmiş bir bitkiniz yok.</p>
            <p className="text-xs mt-1">"+ Yeni Bitki Ekle" butonuna basarak ilk bitkinizi seçin ve ajandanıza kaydedin.</p>
          </div>
        ) : (
          notes.map(note => {
            const cropMeta = getCropMeta(note);
            return (
              <div
                key={note.id}
                className="glass-card rounded-3xl p-6 border border-forest-800/10 flex flex-col justify-between hover:border-harvest-500/50 transition-all duration-300 shadow-md hover:shadow-xl group relative overflow-hidden"
              >
                <div>
                  {/* Top Bar: 3D GlassIcon & Delete Button */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <GlassIcon
                        cropId={cropMeta.id}
                        icon={cropMeta.icon}
                        category={cropMeta.category}
                        size={52}
                        className="group-hover:scale-110 transition-transform duration-300"
                      />
                      <div>
                        <h3 className="text-xl font-serif font-bold text-forest-900 leading-tight">
                          {note.cropName || cropMeta.name}
                        </h3>
                        <span className="text-[11px] text-harvest-600 font-semibold">
                          {note.cropCategory || cropMeta.category}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1.5 text-forest-800/30 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Location & Sowing Info */}
                  <div className="space-y-2 text-xs text-forest-800/80 my-3 bg-forest-50/50 p-3 rounded-2xl border border-forest-800/10">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
                        Konum/Tarla:
                      </span>
                      <span className="font-bold text-forest-900">{note.fieldName}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-forest-800/5">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-forest-500" />
                        Ekim Tarihi:
                      </span>
                      <span className="font-bold text-forest-900">{note.sowingDate}</span>
                    </div>

                    {cropMeta.preferredMoon && (
                      <div className="flex items-center justify-between pt-1 border-t border-forest-800/5 text-[11px]">
                        <span className="flex items-center gap-1 text-harvest-600 font-medium">
                          <Moon className="w-3 h-3 text-harvest-500" />
                          Ay Tavsiyesi:
                        </span>
                        <span className="text-forest-900 truncate max-w-[160px]" title={cropMeta.preferredMoon}>
                          {cropMeta.preferredMoon}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Custom Note */}
                  {note.note && (
                    <div className="bg-white/90 p-3 rounded-2xl border border-forest-800/10 text-xs text-forest-900 leading-relaxed">
                      <p className="font-bold text-[11px] text-forest-800 mb-0.5 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-harvest-500" /> Özel Notlarım:
                      </p>
                      {note.note}
                    </div>
                  )}
                </div>

                {cropMeta.harvestPeriod && (
                  <div className="mt-4 pt-3 border-t border-forest-800/10 flex items-center justify-between text-[11px] text-forest-800/60">
                    <span>Tahmini Hasat:</span>
                    <span className="font-bold text-forest-900">{cropMeta.harvestPeriod}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add Plant Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full border border-forest-800/20 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-forest-800/10 pb-3">
              <h3 className="text-xl font-serif font-bold text-forest-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-harvest-500" />
                Bahçeme / Tarlama Bitki Ekle
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-forest-800/40 hover:text-forest-900 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPlant} className="space-y-4 text-xs">
              {/* Bitki Seçimi Dropdown */}
              <div>
                <label className="block font-bold text-forest-900 mb-1.5">
                  1. Bitki / Ürün Seçin <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.cropId}
                  onChange={e => setFormData({ ...formData, cropId: e.target.value })}
                  className="w-full bg-forest-50 border border-forest-800/20 rounded-2xl p-3 text-xs font-bold text-forest-900 outline-none focus:border-harvest-500 cursor-pointer shadow-sm"
                >
                  {CROPS_GUIDE.map(crop => (
                    <option key={crop.id} value={crop.id}>
                      {crop.icon} {crop.name} — ({crop.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Plant Preview Card */}
              {selectedCropObj && (
                <div className="bg-forest-50/70 p-4 rounded-2xl border border-harvest-500/30 flex items-center gap-3">
                  <GlassIcon cropId={selectedCropObj.id} icon={selectedCropObj.icon} category={selectedCropObj.category} size={46} />
                  <div className="text-xs">
                    <h4 className="font-bold text-forest-900 text-sm">{selectedCropObj.name}</h4>
                    <p className="text-forest-800/70 text-[11px]">Ekim: {selectedCropObj.sowingPeriod}</p>
                    <p className="text-harvest-600 text-[11px] font-medium">Ay Tavsiyesi: {selectedCropObj.preferredMoon}</p>
                  </div>
                </div>
              )}

              {/* Tarla / Konum Adı */}
              <div>
                <label className="block font-bold text-forest-900 mb-1">
                  2. Tarla / Bahçe Konumu
                </label>
                <input
                  type="text"
                  placeholder="Örn: Köyün Üst Tarlası, Balkon Saksısı veya Arka Bahçe"
                  value={formData.fieldName}
                  onChange={e => setFormData({ ...formData, fieldName: e.target.value })}
                  className="w-full bg-forest-50 border border-forest-800/15 rounded-xl p-3 outline-none focus:border-harvest-500 text-xs"
                />
              </div>

              {/* Ekim Tarihi */}
              <div>
                <label className="block font-bold text-forest-900 mb-1">
                  3. Ekim / Dikim Tarihi
                </label>
                <input
                  type="date"
                  value={formData.sowingDate}
                  onChange={e => setFormData({ ...formData, sowingDate: e.target.value })}
                  className="w-full bg-forest-50 border border-forest-800/15 rounded-xl p-3 outline-none focus:border-harvest-500 cursor-pointer text-xs"
                />
              </div>

              {/* Özel Notlar */}
              <div>
                <label className="block font-bold text-forest-900 mb-1">
                  4. Özel Notlar & Gübreleme Hatırlatıcısı
                </label>
                <textarea
                  rows={3}
                  placeholder="Kullanılan tohum çeşidi, taban gübresi miktarı veya dikkat edilecek hususlar..."
                  value={formData.note}
                  onChange={e => setFormData({ ...formData, note: e.target.value })}
                  className="w-full bg-forest-50 border border-forest-800/15 rounded-xl p-3 outline-none focus:border-harvest-500 text-xs"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-3 rounded-xl border border-forest-800/20 text-forest-900 font-bold hover:bg-forest-800/5 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-xl badge-forest font-bold shadow-md hover:scale-[1.02] transition-transform"
                >
                  Bitkiyi Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
