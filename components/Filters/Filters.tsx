'use client';

import css from './Filters.module.css';
import { useState, useEffect, useRef } from 'react';
import { useCarStore } from '@/lib/store/carStore';
import { CarBrand } from '@/types/brands';
import Loader from '@/app/loading';

const Filters: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { filters, setFilters, resetPage } = useCarStore();
  const [brand, setBrand] = useState<CarBrand | ''>('');
  const [price, setPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');
  const [open, setOpen] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //     useCarStore.persist.rehydrate();
  //     setMounted(true);
  //   }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setOpenPrice(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mounted]);

  const brands: CarBrand[] = [
    'Aston Martin',
    'Audi',
    'BMW',
    'Bentley',
    'Buick',
    'Chevrolet',
    'Chrysler',
    'GMC',
    'HUMMER',
    'Hyundai',
    'Kia',
    'Lamborghini',
    'Land Rover',
    'Lincoln',
    'MINI',
    'Mercedes-Benz',
    'Mitsubishi',
    'Nissan',
    'Pontiac',
    'Subaru',
    'Volvo',
  ];

  const formatNumber = (num: string) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const unformatNumber = (num: string) => {
    return num.replace(/,/g, '');
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setFilters({
        brand,
        rentalPrice: price,
        minMileage,
        maxMileage,
      });
      resetPage();
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return <div className={css.filtersWrapper}></div>;
  }

  if (isLoading) return <Loader />;

  return (
    <div className={css.filtersWrapper} ref={wrapperRef}>
      <div>
        <p className={css.legend}>Car brand</p>
        <button
          className={`${css.input} ${open ? css.open : ''}`}
          type="button"
          onClick={() => setOpen(!open)}
        >
          {brand || 'Choose a brand'}
          <span className={css.arrow}></span>
        </button>
        <ul className={`${css.dropdown} ${open ? css.open : ''}`}>
          {brands.map((b) => (
            <li
              className={css.items}
              key={b}
              onClick={() => {
                setBrand(b as CarBrand);
                setOpen(false);
              }}
            >
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className={css.legend}>Price/ 1 hour</p>
        <button
          className={`${css.input} ${openPrice ? css.open : ''}`}
          type="button"
          onClick={() => setOpenPrice(!openPrice)}
        >
          {price ? `To $${price}` : 'Choose a price'}
          <span className={css.arrow}></span>
        </button>
        <ul className={`${css.dropdown} ${openPrice ? css.open : ''}`}>
          {['30', '40', '50', '60', '70', '80'].map((p) => (
            <li
              className={css.items}
              key={p}
              onClick={() => {
                setPrice(p);
                setOpenPrice(false);
              }}
            >
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className={css.legend}>Car mileage / km</p>

        <label htmlFor="minMileage" className={css.labelFrom}>
          From
        </label>
        <input
          className={css.minMileageInput}
          type="text"
          value={formatNumber(minMileage)}
          onChange={(e) => {
            const unformatted = unformatNumber(e.target.value);
            if (
              unformatted === '' ||
              (/^\d+$/.test(unformatted) && unformatted.length <= 7)
            ) {
              setMinMileage(unformatted);
            }
          }}
        />
      </div>

      <div>
        <label htmlFor="maxMileage" className={css.labelTo}>
          To
        </label>
        <input
          className={css.maxMileageInput}
          type="text"
          value={formatNumber(maxMileage)}
          onChange={(e) => {
            const unformatted = unformatNumber(e.target.value);
            if (
              unformatted === '' ||
              (/^\d+$/.test(unformatted) && unformatted.length <= 7)
            ) {
              setMaxMileage(unformatted);
            }
          }}
        />
      </div>

      <button className={css.btn} type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Filters;
