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
