import '../styles/globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Çiftçi Takvimi — Anadolu Halk Takvimi & Ay Evreleri Tarım Rehberi',
  description: 'Anadolu çiftçisinin geleneksel halk takvimi, ay evreleri ekim-dikim tavsiyeleri ve don uyarısı hatırlatıcısı.',
  manifest: '/manifest.json',
  themeColor: '#0f382c',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,600;0,700;1,600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-harvest-400 selection:text-forest-900 pb-16">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
