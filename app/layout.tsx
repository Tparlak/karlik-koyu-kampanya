import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Amasya Taşova Karlık Köyü Yol Kampanyası | Dijital İmza',
  description:
    'Karlık Köyü yollarının yapılması için başlatılan resmi dijital imza kampanyasına katılın. Sesinizi duyurun!',
  keywords: [
    'amasya',
    'taşova',
    'karlık köyü',
    'yol kampanyası',
    'imza kampanyası',
    'dijital imza',
  ],
  openGraph: {
    title: 'Karlık Köyü Yol Kampanyası | Dijital İmza',
    description:
      'Karlık Köyü yollarının yapılması için başlatılan dijital imza kampanyasına katılın.',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Karlık Köyü Kampanyası',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karlık Köyü Yol Kampanyası',
    description:
      'Karlık Köyü yollarının yapılması için dijital imza kampanyasına katılın.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
