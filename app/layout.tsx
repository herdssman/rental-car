import type { Metadata } from 'next';
import { Geist, Geist_Mono, Manrope } from 'next/font/google';
import './globals.css';
import TanStackProvider from '@/components/TanstackProvider/TanstackProvider';
import Header from '@/components/Header/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'block',
});

export const metadata: Metadata = {
  title: 'Car Rental App',
  description: 'Rent cars easily',
  applicationName: 'Car Rental',
  authors: [{ name: 'herdssman' }],
  metadataBase: new URL(
    'https://rental-car-git-main-herdssmans-projects.vercel.app/'
  ),
  robots: 'index, follow',
  themeColor: '#ffffff',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/car-180x180.png',
  },
  openGraph: {
    title: 'Car Rental App',
    description: 'Find the perfect car',
    url: 'https://rental-car-git-main-herdssmans-projects.vercel.app/',
    images: [
      {
        url: '/public/car-text-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Rental Car App',
      },
    ],
    locale: 'en_US',
    type: 'website',
    siteName: 'Rental Car',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Rental App',
    description: 'Find the perfect car',
    images: [{ url: '/car.jpg', alt: 'Rental Car App' }],
    creator: '@herdssman',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        <TanStackProvider>
          <Header />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
