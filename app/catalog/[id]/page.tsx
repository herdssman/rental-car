import { Metadata } from 'next';
import { getOneCarServer } from '@/lib/api/serverApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import CarDetailsClient from './CarDetails.client';

interface PageProps {
  params: Promise<{ id: string }>;
}

const CarDetails = async ({ params }: PageProps) => {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['car', id],
    queryFn: () => getOneCarServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsClient />
    </HydrationBoundary>
  );
};

export default CarDetails;

interface MetadataProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const car = await getOneCarServer(params.id);

  const title = `${car.brand} ${car.model} on Car Rental`;
  const description = `Rent this ${car.brand} ${car.model} in one click`;

  return {
    title,
    description,
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
      title,
      description,
      url: 'https://rental-car-git-main-herdssmans-projects.vercel.app/',
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
      siteName: 'Rental Car',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: '/car-text-logo.jpg', alt: 'Rental Car App' }],
      creator: '@herdssman',
    },
  };
}
