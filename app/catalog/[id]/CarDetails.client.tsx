'use client';

import css from './CarDetails.client.module.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getOneCar } from '@/lib/api/clientApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Loader from '@/app/loading';
import Form from '@/components/Form/Form';
import { useEffect } from 'react';

const CarDetailsClient = () => {
  const id = useParams().id as string | undefined;

  const extractShortId = (imgUrl: string): string => {
    const match = imgUrl.match(/\/(\d+)-ai\.jpg$/);
    return match ? match[1] : 'N/A';
  };

  useEffect(() => {
    fetch('/sprite.svg')
      .then((res) => res.text())
      .then((data) => {
        const div = document.createElement('div');
        div.style.display = 'none';
        div.innerHTML = data;
        document.body.appendChild(div);
        const iconLocation = document.querySelector('#icon-location');
        const iconCheck = document.querySelector('#icon-check-circle');
        const iconCalendar = document.querySelector('#icon-calendar');
        const iconCar = document.querySelector('#icon-car');
        const iconGas = document.querySelector('#icon-gas');
        const iconGear = document.querySelector('#icon-gear');
        console.log(iconLocation);
        console.log(iconCheck);
        console.log(iconCalendar);
        console.log(iconCar);
        console.log(iconGas);
        console.log(iconGear);
      });
  }, []);

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['car', id],
    queryFn: ({ queryKey }) => getOneCar(queryKey[1] as string),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    enabled: !!id,
  });

  useEffect(() => {
    if (error || !car) {
      iziToast.error({
        title: 'Error',
        message:
          'Failed to load the car. Please ensure your connection and try again.',
        position: 'topCenter',
      });
    }
  }, [error, car]);

  if (isLoading) return <Loader />;
  if (error || !car) {
    return null;
  }

  return (
    <div className={css.content}>
      <div className={css.left}>
        <img src={car.img} alt="Car Image" className={css.img} />
        <Form />
      </div>
      <div className={css.right}>
        <div className={css.titleIdWrapper}>
          <h2 className={css.title}>
            {car.brand} {car.model}, {car.year}
          </h2>
          <span className={css.id}>Id: {extractShortId(car.img)}</span>
        </div>
        <div className={css.locationLine}>
          <svg
            className={css.iconLocation}
            viewBox="0 0 16 16"
            width={16}
            height={16}
          >
            <use href="#icon-location"></use>
          </svg>
          <p className={css.location}>
            {car.address.split(',').slice(-2).join(',').trim()}
          </p>
          <p className={css.mileage}>
            Mileage: {car.mileage.toLocaleString('sv-SE')}
          </p>
        </div>
        <p className={css.price}>${car.rentalPrice}</p>
        <p className={css.description}>{car.description}</p>
        <div className={css.listWrapper}>
          <div className={css.list}>
            <h3 className={css.listTitle}>Rental Conditions:</h3>
            <ul className={css.innerList}>
              {car.rentalConditions.map((cond, i) => (
                <li key={i} className={css.item}>
                  <svg
                    className={css.iconCheckCircle}
                    viewBox="0 0 16 16"
                    width={16}
                    height={16}
                  >
                    <use href="#icon-check-circle"></use>
                  </svg>
                  {cond}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={css.listTitle}>Car Specifications:</h3>
            <ul className={css.innerList}>
              <li className={css.item}>
                <svg className={css.icon}>
                  <use href="#icon-calendar"></use>
                </svg>
                Year: {car.year}
              </li>
              <li className={css.item}>
                <svg className={css.icon}>
                  <use href="#icon-car"></use>
                </svg>
                Type: {car.type}
              </li>
              <li className={css.item}>
                <svg className={css.icon}>
                  <use href="#icon-gas"></use>
                </svg>
                Fuel Consumption: {car.fuelConsumption}
              </li>
              <li className={css.item}>
                <svg className={css.icon}>
                  <use href="#icon-gear"></use>
                </svg>
                Engine Size: {car.engineSize}
              </li>
            </ul>
          </div>
          <div>
            <h3 className={css.listTitle}>Accessories and functionalities:</h3>
            <ul className={css.innerList}>
              {car.accessories.map((acc, i) => (
                <li key={i} className={css.item}>
                  <svg
                    className={css.iconCheckCircle}
                    viewBox="0 0 16 16"
                    width={16}
                    height={16}
                  >
                    <use href="#icon-check-circle"></use>
                  </svg>
                  {acc}
                </li>
              ))}
              {car.functionalities.map((fun, i) => (
                <li key={i} className={css.item}>
                  <svg
                    className={css.iconCheckCircle}
                    viewBox="0 0 16 16"
                    width={16}
                    height={16}
                  >
                    <use href="#icon-check-circle"></use>
                  </svg>
                  {fun}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsClient;
