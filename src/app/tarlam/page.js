"use client";

import { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, Calendar, MapPin, Sprout, Moon, ShieldCheck, Tag, Clock } from 'lucide-react';
import { CROPS_GUIDE } from '../../data/ekim-rehberi';
import GlassIcon from '../../components/GlassIcon';
import NativeAdCard from '../../components/NativeAdCard';

export default function MyFieldNotesPage() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    noteType: 'bitki', // 'bitki' or 'not'
    cropId: 'bugday',
    fieldName: 'Köyönü Tarlası',
    noteTitle: '',
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
      // Default demo notes with past and future dates
      const demo = [
        {
          id: 1,
          noteType: 'bitki',
          cropId: 'bugday',
          cropName: 'Buğday',
          cropCategory: 'Tahıl & Baklagil',
          fieldName: 'Köyönü Tarlası',
          noteTitle: 'Kışlık Buğday Ekimi',
          sowingDate: '2026-10-15',
          note: 'Hilal safhasında ekildi. 50 kg taban gübresi atıldı. Baharda azotlu üst gübreleme yapılacak.'
        },
        {
          id: 2,
          noteType: 'not',
          cropId: 'incir',
          cropName: 'İncir',
          cropCategory: 'Meyve & Sert Kabuklu',
          fieldName: 'Ev Arkası Bahçe',
          noteTitle: 'İletleme ve Hazırlık Notu',
          sowingDate: '2026-06-10',
          note: 'İletleme yapıldı. Yağmurlardan korumak için kurutma sergisi hazırlandı.'
        }
      ];
      setNotes(demo);
      localStorage.setItem('ata_takvimi_notes', JSON.stringify(demo));
    }
  }, []);

  const saveNotes = (updated) => {
    setNotes(updated);
    localStorage.setItem('ata_takvimi_notes', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleAddPlantNote = (e) => {
    e.preventDefault();
    const cropInfo = CROPS_GUIDE.find(c => c.id === formData.cropId) || CROPS_GUIDE[0];

    const newNote = {
      id: Date.now(),
      noteType: formData.noteType,
      cropId: cropInfo.id,
      cropName: cropInfo.name,
      cropCategory: cropInfo.category,
      cropIcon: cropInfo.icon,
      preferredMoon: cropInfo.preferredMoon,
      harvestPeriod: cropInfo.harvestPeriod,
      fieldName: formData.fieldName || 'Bahçem / Tarlam',
      noteTitle: formData.noteTitle || (formData.noteType === 'bitki' ? `${cropInfo.name} Ekimi` : `${cropInfo.name} Notu`),
      sowingDate: formData.sowingDate || new Date().toISOString().split('T')[0],
      note: formData.note
    };

    const updated = [newNote, ...notes];
    saveNotes(updated);
    setFormData({
      noteType: 'bitki',
      cropId: CROPS_GUIDE[0].id,
      fieldName: '',
      noteTitle: '',
      sowingDate: new Date().toISOString().split('T')[0],
      note: ''
    });
    setShowModal(false);
  };

  const handleDeleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id);
    saveNotes(updated);
  };

  const getCropMeta = (note) => {
    if (note.cropId) {
      return CROPS_GUIDE.find(c => c.id === note.cropId) || { id: note.cropId, name: note.cropName, category: note.cropCategory || 'Tarım' };
    }
    const found = CROPS_GUIDE.find(c => c.name.toLowerCase().includes((note.cropName || '').toLowerCase()));
    return found || { id: 'bugday', name: note.cropName || 'Bitki', category: 'Tarım' };
  };

  const selectedCropObj = CROPS_GUIDE.find(c => c.id === formData.cropId) || CROPS_GUIDE[0];
  const todayStr = new Date().toISOString().split('T')[0];

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
            Gelecek veya geçmiş tarihli bitki ekimlerinizi, gübreleme, sulama ve bakım notlarınızı kaydedin. Notlarınız otomatik olarak Takvim Akışı ve Ay Takvimi'ne yansır.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="badge-forest px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4 text-harvest-400" />
          <span>+ Yeni Bitki / Not Ekle</span>
        </button>
      </div>

      {/* Plant & Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length === 0 ? (
          <div className="col-span-full glass-card rounded-3xl p-12 text-center text-forest-800/60">
            <Sprout className="w-12 h-12 mx-auto mb-3 text-forest-500/40" />
            <p className="font-semibold text-base">Henüz eklenmiş bir bitki veya notunuz yok.</p>
            <p className="text-xs mt-1">"+ Yeni Bitki / Not Ekle" butonuna basarak ilk kaydınızı oluşturun.</p>
          </div>
        ) : (
          notes.map(note => {
            const cropMeta = getCropMeta(note);
            const isFuture = note.sowingDate > todayStr;
            const isToday = note.sowingDate === todayStr;

            return (
              <div
                key={note.id}
                className="glass-card rounded-3xl p-6 border border-forest-800/10 flex flex-col justify-between hover:border-harvest-500/50 transition-all duration-300 shadow-md hover:shadow-xl group relative overflow-hidden"
              >
                <div>
                  {/* Top Bar: Icon, Title & Date Status Badge */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <GlassIcon
                        cropId={cropMeta.id}
                        icon={cropMeta.icon}
                        category={cropMeta.category}
                        size={50}
                        className="group-hover:scale-110 transition-transform duration-300 shrink-0"
                      />
                      <div>
                        <h3 className="text-lg font-serif font-bold text-forest-900 leading-tight">
                          {note.noteTitle || note.cropName || cropMeta.name}
                        </h3>
                        <span className="text-[11px] text-harvest-600 font-semibold">
                          {note.cropName || cropMeta.name} — ({cropMeta.category})
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1.5 text-forest-800/30 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors shrink-0"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Date Badge: Future / Past / Today */}
                  <div className="mb-3">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      isToday
                        ? 'bg-emerald-500 text-white'
                        : isFuture
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-forest-800/10 text-forest-800'
                    }`}>
                      <Clock className="w-3 h-3" />
                      {isToday ? '📍 Bugün' : isFuture ? '🔮 İleri Tarihli Hatırlatıcı' : '📜 Geçmiş Tarihli Kayıt'}
                    </span>
                  </div>

                  {/* Location & Date Details */}
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
                        Tarih:
                      </span>
                      <span className="font-bold text-forest-900">{note.sowingDate}</span>
                    </div>

                    {cropMeta.preferredMoon && (
                      <div className="flex items-center justify-between pt-1 border-t border-forest-800/5 text-[11px]">
                        <span className="flex items-center gap-1 text-harvest-600 font-medium">
                          <Moon className="w-3 h-3 text-harvest-500" />
                          Ay Tavsiyesi:
                        </span>
                        <span className="text-forest-900 truncate max-w-[150px]" title={cropMeta.preferredMoon}>
                          {cropMeta.preferredMoon}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Custom Note Content */}
                  {note.note && (
                    <div className="bg-white/90 p-3 rounded-2xl border border-forest-800/10 text-xs text-forest-900 leading-relaxed">
                      <p className="font-bold text-[11px] text-forest-800 mb-0.5 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-harvest-500" /> Detaylar & Not:
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

      {/* Add Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-3xl p-5 md:p-7 max-w-lg w-full border border-forest-800/20 shadow-2xl relative max-h-[88vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-forest-800/10 pb-3 shrink-0">
              <h3 className="text-xl font-serif font-bold text-forest-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-harvest-500" />
                İleri veya Geri Tarihli Kayıt Ekle
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-forest-800/50 hover:text-forest-900 font-bold rounded-2xl hover:bg-forest-800/10 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto py-4 flex-1 pr-1">
              <form onSubmit={handleAddPlantNote} className="space-y-4 text-xs">
              {/* Kayıt Türü */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, noteType: 'bitki' })}
                  className={`w-1/2 py-2.5 rounded-xl font-bold border transition-all ${
                    formData.noteType === 'bitki'
                      ? 'bg-forest-800 text-white border-forest-800 shadow-sm'
                      : 'bg-forest-50 text-forest-900 border-forest-800/15'
                  }`}
                >
                  🌱 Bitki / Ürün Ekimi
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, noteType: 'not' })}
                  className={`w-1/2 py-2.5 rounded-xl font-bold border transition-all ${
                    formData.noteType === 'not'
                      ? 'bg-forest-800 text-white border-forest-800 shadow-sm'
                      : 'bg-forest-50 text-forest-900 border-forest-800/15'
                  }`}
                >
                  📝 Bakım / Gübre / Not
                </button>
              </div>

              {/* Bitki Seçimi */}
              <div>
                <label className="block font-bold text-forest-900 mb-1">
                  1. Bitki / Ürün Seçin <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.cropId}
                  onChange={e => setFormData({ ...formData, cropId: e.target.value })}
                  className="w-full bg-forest-50 border border-forest-800/20 rounded-xl p-3 text-xs font-bold text-forest-900 outline-none focus:border-harvest-500 cursor-pointer shadow-sm"
                >
                  {CROPS_GUIDE.map(crop => (
                    <option key={crop.id} value={crop.id}>
                      {crop.icon} {crop.name} — ({crop.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Live Preview */}
              {selectedCropObj && (
                <div className="bg-forest-50/80 p-3.5 rounded-2xl border border-harvest-500/30 flex items-center gap-3">
                  <GlassIcon cropId={selectedCropObj.id} icon={selectedCropObj.icon} category={selectedCropObj.category} size={44} />
                  <div className="text-xs">
                    <h4 className="font-bold text-forest-900">{selectedCropObj.name}</h4>
                    <p className="text-forest-800/70 text-[11px]">Ekim: {selectedCropObj.sowingPeriod}</p>
                    <p className="text-harvest-600 text-[11px] font-medium">Ay Tavsiyesi: {selectedCropObj.preferredMoon}</p>
                  </div>
                </div>
              )}

              {/* Tarih Seçimi (İleri veya Geri) */}
              <div>
                <label className="block font-bold text-forest-900 mb-1">
                  2. İşlem / Hatırlatma Tarihi (İleri veya Geçmiş) <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.sowingDate}
                  onChange={e => setFormData({ ...formData, sowingDate: e.target.value })}
                  className="w-full bg-forest-50 border border-forest-800/20 rounded-xl p-3 outline-none focus:border-harvest-500 cursor-pointer text-xs font-bold text-forest-900"
                />
              </div>

              {/* Başlık */}
              <div>
                <label className="block font-bold text-forest-900 mb-1">
                  3. Kayıt Başlığı (İsteğe Bağlı)
                </label>
                <input
                  type="text"
                  placeholder={formData.noteType === 'bitki' ? "Örn: Kışlık Buğday Ekimi" : "Örn: Gübreleme ve Sulama Notu"}
                  value={formData.noteTitle}
                  onChange={e => setFormData({ ...formData, noteTitle: e.target.value })}
                  className="w-full bg-forest-50 border border-forest-800/15 rounded-xl p-3 outline-none focus:border-harvest-500 text-xs"
                />
              </div>

              {/* Konum */}
              <div>
                <label className="block font-bold text-forest-900 mb-1">
                  4. Tarla / Bahçe Konumu
                </label>
                <input
                  type="text"
                  placeholder="Örn: Köyün Üst Tarlası, Ön Bahçe, Saksı"
                  value={formData.fieldName}
                  onChange={e => setFormData({ ...formData, fieldName: e.target.value })}
                  className="w-full bg-forest-50 border border-forest-800/15 rounded-xl p-3 outline-none focus:border-harvest-500 text-xs"
                />
              </div>

              {/* Detaylar */}
              <div>
                <label className="block font-bold text-forest-900 mb-1">
                  5. Özel Notlar & Detaylar
                </label>
                <textarea
                  rows={3}
                  placeholder="Kullanılan gübre, tohum miktarı, ilaçlama detayları..."
                  value={formData.note}
                  onChange={e => setFormData({ ...formData, note: e.target.value })}
                  className="w-full bg-forest-50 border border-forest-800/15 rounded-xl p-3 outline-none focus:border-harvest-500 text-xs"
                />
              </div>

              {/* Actions */}
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
                  Kaydı Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
      {/* Sponsorlu Reklam Alanı */}
      <NativeAdCard index={0} />
    </div>
  );
}
