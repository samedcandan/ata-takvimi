"use client";

import { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, Calendar, MapPin, Sprout, Moon, ShieldCheck, Tag, Clock, Lock, Sparkles } from 'lucide-react';
import { CROPS_GUIDE } from '../../data/ekim-rehberi';
import GlassIcon from '../../components/GlassIcon';
import NativeAdCard from '../../components/NativeAdCard';
import { useAuth } from '../../context/AuthContext';
import { APP_CONFIG } from '../../lib/config';

export default function MyFieldNotesPage() {
  const { isAdFree, setShowSubModal } = useAuth();
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
    if (!isAdFree) {
      setShowModal(false);
      setShowSubModal(true);
      return;
    }

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
    if (!isAdFree) {
      setShowSubModal(true);
      return;
    }
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
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 md:p-8 flex flex-wrap items-center justify-between gap-4 border border-forest-800/10">
        <div>
          <div className="flex items-center gap-2 text-harvest-500 font-bold text-sm mb-1">
            <BookOpen className="w-5 h-5" />
            <span>Ata Ajandası</span>
            {!isAdFree && (
              <span className="text-[10px] bg-amber-400 text-amber-950 font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                👑 VIP Özellik
              </span>
            )}
          </div>
          <h1 className="text-3xl font-serif font-bold text-forest-900 leading-tight">
            Bitkilerim & Notlar
          </h1>
          <p className="text-sm text-forest-800/80 mt-1">
            Gelecek veya geçmiş tarihli bitki ekimlerinizi, gübreleme, sulama ve bakım notlarınızı kaydedin. Notlarınız otomatik olarak Takvim Akışı ve Ay Takvimi'ne yansır.
          </p>
        </div>

        <button
          onClick={() => {
            if (!isAdFree) {
              setShowSubModal(true);
            } else {
              setShowModal(true);
            }
          }}
          className="badge-forest px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg transition-transform hover:scale-105 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-harvest-400" />
          <span>+ Yeni Bitki / Not Ekle {!isAdFree && '👑'}</span>
        </button>
      </div>

      {/* Non-Premium Locked Paywall Banner */}
      {!isAdFree && (
        <div className="glass-card-dark rounded-3xl p-6 md:p-8 border-2 border-harvest-400/60 shadow-2xl relative overflow-hidden text-center space-y-4">
          <div className="absolute top-0 right-0 w-64 h-64 bg-harvest-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="w-16 h-16 rounded-3xl bg-harvest-500/20 border border-harvest-400/40 flex items-center justify-center mx-auto text-harvest-400 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h2 className="text-2xl font-serif font-bold text-white">
              Tarla Defteri & Notlarım Premium Abonelere Özeldir
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Tarlanızın ekim tarihlerini kaydetmek, gübreleme/budama hatırlatıcıları oluşturmak ve notlarınızı takvime işlemek için Premium üye olun.
            </p>
          </div>

          <button
            onClick={() => setShowSubModal(true)}
            className="px-8 py-3.5 rounded-2xl badge-gold text-forest-950 font-extrabold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-forest-900" />
            <span>👑 Hemen Abone Ol ve Kilidi Aç ({APP_CONFIG.subscription.currencySymbol}{APP_CONFIG.subscription.priceNumber} / Yıl)</span>
          </button>
        </div>
      )}

      {/* Plant & Notes Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${!isAdFree ? 'filter blur-sm select-none pointer-events-none opacity-60' : ''}`}>
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

                  <div className="space-y-2 text-xs text-forest-800/90 my-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-terracotta-500 shrink-0" />
                      <span><strong>Tarih:</strong> {note.sowingDate}</span>
                    </div>

                    {note.fieldName && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-forest-500 shrink-0" />
                        <span><strong>Konum:</strong> {note.fieldName}</span>
                      </div>
                    )}

                    {cropMeta.preferredMoon && (
                      <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4 text-harvest-500 shrink-0" />
                        <span><strong>Ay Evresi Tavsiyesi:</strong> {cropMeta.preferredMoon}</span>
                      </div>
                    )}
                  </div>

                  {note.note && (
                    <div className="bg-forest-50 p-3 rounded-2xl border border-forest-500/15 text-xs text-forest-900 mt-3">
                      <p className="font-bold flex items-center gap-1 text-forest-800 mb-0.5">
                        <ShieldCheck className="w-3.5 h-3.5" /> Notunuz:
                      </p>
                      <p className="text-forest-800/90 leading-relaxed italic">{note.note}</p>
                    </div>
                  )}
                </div>

                {cropMeta.harvestPeriod && (
                  <div className="mt-4 pt-3 border-t border-forest-800/10 flex items-center justify-between text-[11px] text-forest-800/60 font-medium">
                    <span>Beklenen Hasat:</span>
                    <span className="font-bold text-forest-900">{cropMeta.harvestPeriod}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add Plant Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="glass-card bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-forest-800/10 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-forest-800/10 pb-3">
              <h3 className="text-xl font-serif font-bold text-forest-900 flex items-center gap-2">
                <Sprout className="w-5 h-5 text-harvest-500" />
                Yeni Bitki / Tarla Notu Ekle
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-xl hover:bg-forest-800/10 text-forest-900 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPlantNote} className="space-y-4">
              {/* Type Switcher: Bitki mi yoksa Serbest Not mu */}
              <div className="flex rounded-2xl bg-forest-800/5 p-1 border border-forest-800/10">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, noteType: 'bitki' })}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    formData.noteType === 'bitki'
                      ? 'bg-forest-800 text-white shadow-sm'
                      : 'text-forest-900/70 hover:bg-forest-800/10'
                  }`}
                >
                  🌱 Bitki / Ürün Ekimi
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, noteType: 'not' })}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    formData.noteType === 'not'
                      ? 'bg-forest-800 text-white shadow-sm'
                      : 'text-forest-900/70 hover:bg-forest-800/10'
                  }`}
                >
                  📝 Genel Bakım Notu
                </button>
              </div>

              {/* Crop Selector */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Bitki / Ürün Seçin:
                </label>
                <select
                  value={formData.cropId}
                  onChange={(e) => setFormData({ ...formData, cropId: e.target.value })}
                  className="w-full bg-forest-50 border border-forest-800/15 rounded-xl px-3 py-2.5 text-xs text-forest-900 font-medium outline-none focus:border-harvest-500"
                >
                  {CROPS_GUIDE.map(crop => (
                    <option key={crop.id} value={crop.id}>
                      {crop.icon} {crop.name} — ({crop.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Crop Tips Card */}
              {selectedCropObj && (
                <div className="p-3 rounded-2xl bg-harvest-400/10 border border-harvest-500/20 text-xs text-forest-900 flex items-start gap-2.5">
                  <GlassIcon
                    cropId={selectedCropObj.id}
                    icon={selectedCropObj.icon}
                    category={selectedCropObj.category}
                    size={36}
                    className="shrink-0"
                  />
                  <div>
                    <p className="font-bold text-harvest-600">{selectedCropObj.name} Hakkında:</p>
                    <p className="text-[11px] text-forest-800/80 mt-0.5">
                      <strong>Ekim:</strong> {selectedCropObj.sowingPeriod} | <strong>Ay:</strong> {selectedCropObj.preferredMoon}
                    </p>
                  </div>
                </div>
              )}

              {/* Custom Title */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Kayıt Başlığı (İsteğe Bağlı):
                </label>
                <input
                  type="text"
                  placeholder={`Örn: ${selectedCropObj?.name || 'Bitki'} Ekimi`}
                  value={formData.noteTitle}
                  onChange={(e) => setFormData({ ...formData, noteTitle: e.target.value })}
                  className="w-full bg-forest-50 border border-forest-800/15 rounded-xl px-3 py-2 text-xs text-forest-900 outline-none focus:border-harvest-500"
                />
              </div>

              {/* Field Name & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Tarla / Bahçe Adı:
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Köyönü Tarlası"
                    value={formData.fieldName}
                    onChange={(e) => setFormData({ ...formData, fieldName: e.target.value })}
                    className="w-full bg-forest-50 border border-forest-800/15 rounded-xl px-3 py-2 text-xs text-forest-900 outline-none focus:border-harvest-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    İşlem / Ekim Tarihi:
                  </label>
                  <input
                    type="date"
                    value={formData.sowingDate}
                    onChange={(e) => setFormData({ ...formData, sowingDate: e.target.value })}
                    className="w-full bg-forest-50 border border-forest-800/15 rounded-xl px-3 py-2 text-xs text-forest-900 outline-none focus:border-harvest-500 font-sans"
                  />
                </div>
              </div>

              {/* Note Details */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Özel Notlarınız:
                </label>
                <textarea
                  rows={3}
                  placeholder="Kullanılan tohum çeşidi, gübre miktarı veya sulama detayları..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full bg-forest-50 border border-forest-800/15 rounded-xl p-3 text-xs text-forest-900 outline-none focus:border-harvest-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-forest-800/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-forest-800 hover:bg-forest-800/10 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="badge-forest px-6 py-2.5 rounded-xl text-xs font-bold shadow-md hover:scale-105 transition-transform"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
