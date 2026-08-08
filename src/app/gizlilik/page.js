"use client";

import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, Mail } from 'lucide-react';

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
            Yasal Bilgilendirme
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 leading-tight">
            Gizlilik Politikası ve Kullanım Şartları
          </h1>
          <p className="text-xs text-forest-800/70 mt-1">
            Son Güncelleme: 8 Ağustos 2026 | Karneyn Yazılım Hizmetleri Ltd. Şti.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-forest-800/10 space-y-6 text-sm text-forest-800/90 leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-2 border-b border-forest-800/10 pb-5">
          <h2 className="text-lg font-serif font-bold text-forest-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-forest-800" />
            1. Genel Bakış ve Veri Gizliliği
          </h2>
          <p>
            Karneyn Yazılım Hizmetleri Ltd. Şti. ("Karneyn") olarak sunduğumuz <strong>Ata Takvimi</strong> (paket adı: <code>com.karneyn.atatakvimi</code>) mobil ve web uygulamasında kullanıcılarımızın kişisel veri gizliliğine azami hassasiyet göstermekteyiz.
          </p>
          <p>
            Uygulamamız kullanıcıların kişisel kimlik verilerini (TCKN, İsim, Rehber, Galeri vb.) sunucularımızda saklamaz, işlemez veya üçüncü taraflarla paylaşmaz.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2 border-b border-forest-800/10 pb-5">
          <h2 className="text-lg font-serif font-bold text-forest-900 flex items-center gap-2">
            <Eye className="w-5 h-5 text-forest-800" />
            2. Toplanan ve Saklanan Veriler
          </h2>
          <p>
            Ata Takvimi uygulamasında kullanılan tüm tercihler (örneğin seçtiğiniz il, ekim-dikim ajandasına eklediğiniz notlar ve ürün takvimleri) yalnızca cihazınızın kendi yerel hafızasında (<code>localStorage</code>) saklanır.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Konum Bilgisi:</strong> Seçtiğiniz 81 il tercihi yalnızca hava durumu tahminlerini çekmek için anlık kullanılır. Hassas GPS konumunuz takip edilmez.</li>
            <li><strong>Notlar ve Ajanda:</strong> Tarlam ajandasına eklediğiniz ekim notları tamamen cihazınızda kalır.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-2 border-b border-forest-800/10 pb-5">
          <h2 className="text-lg font-serif font-bold text-forest-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-forest-800" />
            3. Reklam ve Takip Kodu (AD_ID) Politikası
          </h2>
          <p>
            Ata Takvimi uygulaması <strong>reklam kimliği (AD_ID)</strong> veya kullanıcı davranışlarını takip eden üçüncü taraf reklam/analitik SDK'ları <u>içermez</u>. Uygulama içerisinde kullanıcıya 3. taraf reklam gösterimi yapılmaz.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2 border-b border-forest-800/10 pb-5">
          <h2 className="text-lg font-serif font-bold text-forest-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-forest-800" />
            4. Üçüncü Taraf Servis Entegrasyonları
          </h2>
          <p>
            Zirai hava durumu verilerini sunabilmek amacıyla açık kaynaklı ve güvenilir hava durumu sağlayıcısı olan Open-Meteo API hizmeti kullanılmaktadır. Bu isteklere yalnızca seçilen ilin koordinatı iletilir.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-forest-800" />
            5. İletişim ve Destek
          </h2>
          <p>
            Gizlilik politikamız veya uygulamanızla ilgili her türlü soru ve talebiniz için bizimle iletişime geçebilirsiniz:
          </p>
          <div className="bg-forest-50 p-4 rounded-2xl border border-forest-800/15 font-mono text-xs text-forest-900 space-y-1">
            <p><strong>Şirket:</strong> Karneyn Yazılım Hizmetleri Ltd. Şti.</p>
            <p><strong>E-posta:</strong> info@karneyn.com</p>
            <p><strong>Web:</strong> https://atatakvimi.karneyn.com</p>
          </div>
        </section>

      </div>
    </div>
  );
}
