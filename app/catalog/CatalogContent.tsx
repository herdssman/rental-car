'use client';

import { useCallback } from 'react';
import css from './Catalog.module.css';
import CarList from '@/components/CarList/CarList';
import Filters from '@/components/Filters/Filters';
import { useCarStore } from '@/lib/store/carStore';

const CatalogContent = () => {
  const { page, setPage, hasMore, setHasMore, filters } = useCarStore();

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleHasMoreChange = useCallback(
    (hasMore: boolean) => {
      setHasMore(hasMore);
    },
    [setHasMore]
  );

  return (
    <section className={css.catalog}>
      <Filters />
      <CarList
        page={page}
        limit={12}
        brand={filters.brand}
        rentalPrice={filters.rentalPrice}
        minMileage={filters.minMileage}
        maxMileage={filters.maxMileage}
        onHasMoreChange={handleHasMoreChange}
      />
      {hasMore && (
        <button className={css.btn} type="button" onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </section>
  );
};

export default CatalogContent;
