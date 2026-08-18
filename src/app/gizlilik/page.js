"use client";

import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, Mail, Info, CreditCard, RefreshCw } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-forest-800/10 pb-6">
        <Link 
          href="/" 
          className="p-2.5 rounded-2xl bg-white hover:bg-forest-50 border border-forest-800/15 text-forest-900 transition-all shadow-sm flex items-center justify-center shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-harvest-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Yasal Bilgilendirme & Sözleşmeler
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 leading-tight">
            Gizlilik Politikası, Kullanım Şartları & Mesafeli Satış
          </h1>
          <p className="text-xs text-forest-800/70 mt-1">
            Son Güncelleme: 8 Ağustos 2026 | Karneyn Yazılım Hizmetleri Ltd. Şti.
          </p>
        </div>
      </div>

      {/* Quick Nav Anchor Badges */}
      <div className="flex items-center gap-2 flex-wrap text-xs font-bold">
        <a href="#hakkimizda" className="px-3 py-1.5 rounded-xl bg-white border border-forest-800/15 text-forest-900 hover:bg-forest-50 transition-colors shadow-sm">Hakkımızda</a>
        <a href="#gizlilik" className="px-3 py-1.5 rounded-xl bg-white border border-forest-800/15 text-forest-900 hover:bg-forest-50 transition-colors shadow-sm">Gizlilik Politikası</a>
        <a href="#mesafeli-satis" className="px-3 py-1.5 rounded-xl bg-white border border-forest-800/15 text-forest-900 hover:bg-forest-50 transition-colors shadow-sm">Mesafeli Satış Sözleşmesi</a>
        <a href="#teslimat-iade" className="px-3 py-1.5 rounded-xl bg-white border border-forest-800/15 text-forest-900 hover:bg-forest-50 transition-colors shadow-sm">Teslimat & İade Şartları</a>
      </div>

      {/* Main Content */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-forest-800/10 space-y-8 text-sm text-forest-800/90 leading-relaxed">
        
        {/* Hakkımızda */}
        <section id="hakkimizda" className="space-y-2 border-b border-forest-800/10 pb-6 scroll-mt-24">
          <h2 className="text-xl font-serif font-bold text-forest-900 flex items-center gap-2">
            <Info className="w-5 h-5 text-emerald-600" />
            Hakkımızda
          </h2>
          <p>
            <strong>Ata Takvimi</strong> (Karneyn Yazılım Hizmetleri Ltd. Şti.), Anadolu’nun binlerce yıllık kadim tarım takvimlerini, geleneksel kocakarı fırtına günlerini ve ay evrelerine dayalı zirai ekim rehberini dijital çağ ile buluşturan akıllı tarımsal karar destek sistemidir.
          </p>
          <p>
            Çiftçilerimize, bahçıvanlarımıza ve doğa severlere hava durumu uyarısı, ekim zamanlaması ve ürün ajandası sunarak doğru zamanda doğru zirai kararların alınmasını amaçlıyoruz.
          </p>
        </section>

        {/* Gizlilik Politikası */}
        <section id="gizlilik" className="space-y-4 border-b border-forest-800/10 pb-6 scroll-mt-24">
          <h2 className="text-xl font-serif font-bold text-forest-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600" />
            Gizlilik Politikası ve Veri Güvenliği
          </h2>
          
          <div className="space-y-2">
            <h3 className="font-bold text-forest-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-forest-700" /> 1. Veri Toplama ve İşleme
            </h3>
            <p>
              Karneyn Yazılım Hizmetleri Ltd. Şti. ("Karneyn") olarak sunduğumuz <strong>Ata Takvimi</strong> (paket adı: <code>com.karneyn.atatakvimi</code>) uygulamasında kişisel kimlik verileriniz (TCKN, Rehber, Galeri vb.) saklanmaz veya 3. taraflarla satılmaz.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-forest-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-forest-700" /> 2. Reklam Kimliği (AD_ID) Politikası
            </h3>
            <p>
              Uygulamamız <strong>AD_ID</strong> takip kodları veya üçüncü taraf izleyici reklam yazılımları içermez. 256-Bit SSL şifreleme ve İyzico Ödeme Altyapısı ile doğrudan güvenli abonelik hizmeti sunulmaktadır.
            </p>
          </div>
        </section>

        {/* Mesafeli Satış Sözleşmesi */}
        <section id="mesafeli-satis" className="space-y-2 border-b border-forest-800/10 pb-6 scroll-mt-24">
          <h2 className="text-xl font-serif font-bold text-forest-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-600" />
            Mesafeli Satış Sözleşmesi Özeti
          </h2>
          <p>
            İşbu sözleşme, Karneyn Yazılım Hizmetleri Ltd. Şti. ile <strong>Ata Takvimi 1 Yıllık Reklamsız Premium Abonelik</strong> (₺200 / Yıl) satın alan Alıcı arasındaki mesafeli dijital hizmet satış koşullarını düzenler.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Satıcı:</strong> Karneyn Yazılım Hizmetleri Ltd. Şti. (info@karneyn.com)</li>
            <li><strong>Hizmet Konusu:</strong> Ata Takvimi dijital platformuna 1 Yıl (365 Gün) süresince reklamsız tam erişim hakkı.</li>
            <li><strong>Ödeme Sağlayıcı:</strong> BDDK lisanslı İyzico Ödeme Hizmetleri A.Ş. altyapısı ile kredi kartı / banka kartı tahsilatı.</li>
          </ul>
        </section>

        {/* Teslimat & İade Şartları */}
        <section id="teslimat-iade" className="space-y-2 border-b border-forest-800/10 pb-6 scroll-mt-24">
          <h2 className="text-xl font-serif font-bold text-forest-900 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-emerald-600" />
            Teslimat & İade Politikası
          </h2>
          <p>
            <strong>Anında Dijital Teslimat:</strong> Satın alma işleminiz tamamlandığı anda hesabınıza reklamsız premium erişim hakkı anında tanımlanır. Fiziksel kargo veya sevkiyat bulunmamaktadır.
          </p>
          <p>
            <strong>İade Hakkı:</strong> 6502 sayılı Tüketicinin Korunması Hakkında Kanun uyarınca, elektronik ortamda anında ifa edilen dijital içeriklerde 14 gün içinde koşulsuz iade hakkınız mevcuttur. Taleplerinizi <code>info@karneyn.com</code> adresine iletebilirsiniz.
          </p>
        </section>

        {/* İletişim ve Destek */}
        <section id="iletisim" className="space-y-2">
          <h2 className="text-xl font-serif font-bold text-forest-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-600" />
            İletişim & Kurumsal Bilgiler
          </h2>
          <div className="bg-forest-50 p-4 rounded-2xl border border-forest-800/15 font-mono text-xs text-forest-900 space-y-1">
            <p><strong>Unvan:</strong> Karneyn Yazılım Hizmetleri Ltd. Şti.</p>
            <p><strong>E-posta:</strong> info@karneyn.com</p>
            <p><strong>Canlı Portal:</strong> https://atatakvimi.karneyn.com</p>
            <p><strong>Adres:</strong> İstanbul / Türkiye</p>
          </div>
        </section>

      </div>
    </div>
  );
}
