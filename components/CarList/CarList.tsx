'use client';

import css from './CarList.module.css';
import { useQueries } from '@tanstack/react-query';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { useEffect } from 'react';
import { CarQueryParams, Car } from '@/types/car';
import { getCars } from '@/lib/api/clientApi';
import CarListItem from '../CarListItem/CarListItem';

interface CarListProps extends CarQueryParams {
  onHasMoreChange?: (hasMore: boolean) => void;
  onLoadingChange?: (isLoading: boolean) => void;
}

const CarList = ({
  page,
  limit,
  brand,
  rentalPrice,
  minMileage,
  maxMileage,
  onHasMoreChange,
  onLoadingChange,
}: CarListProps) => {
  const queries = useQueries({
    queries: Array.from({ length: page }, (_, i) => ({
      queryKey: [
        'cars',
        { page: i + 1, limit, brand, rentalPrice, minMileage, maxMileage },
      ],
      queryFn: () =>
        getCars({
          page: i + 1,
          limit,
          brand,
          rentalPrice,
          minMileage,
          maxMileage,
        }),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const error = queries.find((q) => q.error)?.error;
  const lastQuery = queries[queries.length - 1];

  useEffect(() => {
    if (error) {
      iziToast.error({
        title: 'Error',
        message:
          'Failed to load cars. Please ensure your connection and try again.',
        position: 'topCenter',
      });
    }
  }, [error]);

  useEffect(() => {
    if (lastQuery?.data) {
      const hasMore = lastQuery.data.page < lastQuery.data.totalPages;
      onHasMoreChange?.(hasMore);
    }
  }, [lastQuery?.data, onHasMoreChange]);

  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  if (error && !queries[0]?.data && page === 1) {
    return null;
  }

  const allCars = queries.reduce((acc: Car[], query) => {
    if (query.data?.cars) {
      acc.push(...query.data.cars);
    }
    return acc;
  }, []);

  if (allCars.length === 0 && !isLoading && page === 1) {
    return (
      <p className={css.noMatches}>No cars found matching your criteria.</p>
    );
  }

  return (
    <ul className={css.list}>
      {allCars.map((c, i) => (
        <CarListItem key={`${c.id}-${i}`} car={c} />
      ))}
    </ul>
  );
};

export default CarList;
