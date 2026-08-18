import '../styles/globals.css';
import Navbar from '../components/Navbar';
import AppContentGate from '../components/AppContentGate';
import CitySelectorModal from '../components/CitySelectorModal';
import AdBanner from '../components/AdBanner';
import { AuthProvider } from '../context/AuthContext';

export const metadata = {
  title: 'Ata Takvimi — Anadolu Halk Takvimi & Ay Evreleri Tarım Rehberi',
  description: 'Atalarımızdan miras kalan geleneksel Anadolu halk takvimi, ay evreleri ekim-dikim tavsiyeleri ve don uyarısı hatırlatıcısı.',
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#22b558',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="overflow-x-hidden max-w-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,600;0,700;1,600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-harvest-400 selection:text-forest-900 pb-20 overflow-x-hidden max-w-full w-full">
        <AuthProvider>
          <AppContentGate>
            <Navbar />
            <CitySelectorModal />
            <main className="max-w-7xl mx-auto px-4 py-4 overflow-x-hidden w-full">
              {children}
              <AdBanner className="mt-6" />
            </main>
          </AppContentGate>
        </AuthProvider>
      </body>
    </html>
  );
}
