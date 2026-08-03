"use client";

import { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, Calendar, MapPin, Sprout, Tag } from 'lucide-react';

export default function MyFieldNotesPage() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fieldName: '',
    cropName: '',
    sowingDate: '',
    note: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('ciftci_takvimi_notes');
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Default demo note
      setNotes([
        {
          id: 1,
          fieldName: 'Köyönü Tarlası',
          cropName: 'Kışlık Buğday',
          sowingDate: '2026-10-15',
          note: 'Hilal safhasında ekildi. 50 kg taban gübresi atıldı. Baharda azotlu üst gübreleme yapılacak.'
        }
      ]);
    }
  }, []);

  const saveNotes = (updated) => {
    setNotes(updated);
    localStorage.setItem('ciftci_takvimi_notes', JSON.stringify(updated));
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!formData.fieldName || !formData.cropName) return;

    const newNote = {
      id: Date.now(),
      ...formData,
      sowingDate: formData.sowingDate || new Date().toISOString().split('T')[0]
    };

    const updated = [newNote, ...notes];
    saveNotes(updated);
    setFormData({ fieldName: '', cropName: '', sowingDate: '', note: '' });
    setShowModal(false);
  };

  const handleDeleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id);
    saveNotes(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 md:p-8 flex flex-wrap items-center justify-between gap-4 border border-forest-800/10">
        <div>
          <div className="flex items-center gap-2 text-harvest-500 font-bold text-sm mb-1">
            <BookOpen className="w-5 h-5" />
            <span>Çiftçi Ajandası</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-forest-900 leading-tight">
            Tarlam & Kişisel Notlarım
          </h1>
          <p className="text-sm text-forest-800/80 mt-1">
            Kendi tarlalarınız için ekim tarihlerini, gübre notlarını ve hatırlatıcılarınızı kaydedin.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="badge-forest px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4 text-harvest-400" />
          <span>Yeni Tarla Notu Ekle</span>
        </button>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length === 0 ? (
          <div className="col-span-full glass-card rounded-3xl p-12 text-center text-forest-800/60">
            <Sprout className="w-12 h-12 mx-auto mb-3 text-forest-500/40" />
            <p className="font-semibold text-base">Henüz kaydedilmiş bir tarla notunuz yok.</p>
            <p className="text-xs mt-1">"Yeni Tarla Notu Ekle" butonuna basarak ilk notunuzu ekleyin.</p>
          </div>
        ) : (
          notes.map(note => (
            <div
              key={note.id}
              className="glass-card rounded-3xl p-6 border border-forest-800/10 flex flex-col justify-between hover:border-harvest-500 transition-all shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold bg-forest-800/10 text-forest-900 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
                    {note.fieldName}
                  </span>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="p-1.5 text-forest-800/40 hover:text-red-600 rounded-lg transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-xl font-serif font-bold text-forest-900 flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-harvest-500" />
                  {note.cropName}
                </h3>

                <div className="flex items-center gap-2 text-xs text-forest-800/70 my-3">
                  <Calendar className="w-4 h-4 text-forest-500" />
                  <span>Ekim Tarihi: {note.sowingDate}</span>
                </div>

                {note.note && (
                  <p className="text-xs text-forest-900/90 bg-white/80 p-3 rounded-2xl border border-forest-800/10 leading-relaxed">
                    {note.note}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full border border-forest-800/20 shadow-2xl space-y-4">
            <h3 className="text-xl font-serif font-bold text-forest-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-harvest-500" />
              Yeni Tarla Notu
            </h3>

            <form onSubmit={handleAddNote} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-forest-900 mb-1">Tarla / Mevkii Adı</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Dereboyu Tarlası veya Ev Arkası Bahçe"
                  value={formData.fieldName}
                  onChange={e => setFormData({ ...formData, fieldName: e.target.value })}
                  className="w-full bg-forest-50 border border-forest-800/15 rounded-xl p-3 outline-none focus:border-harvest-500"
                />
              </div>

              <div>
                <label className="block font-bold text-forest-900 mb-1">Ekilen / Dikilen Ürün</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Buğday, Domates, Fındık"
                  value={formData.cropName}
                  onChange={e => setFormData({ ...formData, cropName: e.target.value })}
                  className="w-full bg-forest-50 border border-forest-800/15 rounded-xl p-3 outline-none focus:border-harvest-500"
                />
              </div>

              <div>
                <label className="block font-bold text-forest-900 mb-1">Ekim Tarihi</label>
                <input
                  type="date"
                  value={formData.sowingDate}
                  onChange={e => setFormData({ ...formData, sowingDate: e.target.value })}
                  className="w-full bg-forest-50 border border-forest-800/15 rounded-xl p-3 outline-none focus:border-harvest-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-bold text-forest-900 mb-1">Özel Notlar & Gübreleme</label>
                <textarea
                  rows={3}
                  placeholder="Kullanılan tohum çeşidi, gübre miktarı veya hatırlatıcı..."
                  value={formData.note}
                  onChange={e => setFormData({ ...formData, note: e.target.value })}
                  className="w-full bg-forest-50 border border-forest-800/15 rounded-xl p-3 outline-none focus:border-harvest-500"
                />
              </div>

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
