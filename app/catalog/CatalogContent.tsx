'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import css from './Catalog.module.css';
import CarList from '@/components/CarList/CarList';
import Filters from '@/components/Filters/Filters';
import { useCarStore } from '@/lib/store/carStore';
import Loader from '../loading';

const CatalogContent = () => {
  const { page, setPage, hasMore, setHasMore, filters } = useCarStore();
  const prevPageRef = useRef(page);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const carListRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    prevPageRef.current = page;
    setPage(page + 1);
  };

  const handleHasMoreChange = useCallback(
    (hasMore: boolean) => {
      setHasMore(hasMore);
    },
    [setHasMore]
  );

  const handleLoadingChange = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  useEffect(() => {
    if (page > prevPageRef.current && !isLoading && carListRef.current) {
      setTimeout(() => {
        const scrollAmount = 268 * 2;
        window.scrollBy({
          top: scrollAmount,
          behavior: 'smooth',
        });
      }, 50);
    }
  }, [page, isLoading]);

  return (
    <section className={css.catalog}>
      <aside aria-label="Car Filters">
        <Filters />
      </aside>

      {isLoading && <Loader />}
      <div ref={carListRef} aria-busy={isLoading}>
        <CarList
          page={page}
          limit={12}
          brand={filters.brand}
          rentalPrice={filters.rentalPrice}
          minMileage={filters.minMileage}
          maxMileage={filters.maxMileage}
          onHasMoreChange={handleHasMoreChange}
          onLoadingChange={handleLoadingChange}
        />
      </div>
      {hasMore && (
        <button
          ref={buttonRef}
          className={css.btn}
          type="button"
          onClick={handleLoadMore}
          disabled={isLoading}
          aria-label={isLoading ? 'Loading more cars…' : 'Load more cars'}
        >
          Load more
        </button>
      )}
    </section>
  );
};

export default CatalogContent;
