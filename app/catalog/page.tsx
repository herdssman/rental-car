import { Metadata } from 'next';
import CatalogDynamicLoading from './CatalogDynamicLoading';

const CatalogPage = () => {
  return (
    <div>
      <CatalogDynamicLoading />
    </div>
  );
};

export default CatalogPage;

export const metadata: Metadata = {
  title: 'Car Rental Catalog',
  description:
    'Take a look at our catalog and see what cars we currently offer',
  applicationName: 'Car Rental',
  authors: [{ name: 'herdssman' }],
  metadataBase: new URL(
    'https://rental-car-git-main-herdssmans-projects.vercel.app/catalog'
  ),
  robots: 'index, follow',
  themeColor: '#ffffff',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/car-180x180.png',
  },
  openGraph: {
    title: 'Car Rental Catalog',
    description:
      'Take a look at our catalog and see what cars we currently offer',
    url: 'https://rental-car-git-main-herdssmans-projects.vercel.app/catalog',
    images: [
      {
        url: '/car-text-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Rental Car App',
      },
    ],
    locale: 'en_US',
    type: 'website',
    siteName: 'Rental Car Catalog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Rental Catalog',
    description:
      'Take a look at our catalog and see what cars we currently offer',
    images: [{ url: '/car-text-logo.jpg', alt: 'Rental Car App' }],
    creator: '@herdssman',
  },
};
