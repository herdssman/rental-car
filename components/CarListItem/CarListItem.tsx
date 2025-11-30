import css from './CarListitem.module.css';
import { Car } from '@/types/car';
import { useRouter } from 'next/navigation';
import { useCarStore } from '@/lib/store/carStore';

interface PageProps {
  car: Car;
}

const CarListItem = ({ car }: PageProps) => {
  const router = useRouter();
  const { isFavorite, addFavorite, removeFavorite } = useCarStore();
  const isFav = isFavorite(car.id);

  const handleFavoriteClick = () => {
    if (isFav) {
      removeFavorite(car.id);
    } else {
      addFavorite(car.id);
    }
  };

  return (
    <li className={css.item}>
      <div className={css.imgWrapper}>
        <img src={car.img} alt="Car Image" className={css.image} />
        <button
          type="button"
          className={`${css.favouriteBtn} ${isFav ? css.active : ''}`}
          onClick={handleFavoriteClick}
          aria-label="Add to favorites"
        >
          {isFav ? (
            <svg className={css.iconHeartColoured}>
              <use
                href="#icon-heart-coloured"
                viewBox="0 0 16 16"
                width={16}
                height={16}
              ></use>
            </svg>
          ) : (
            <svg className={css.iconHeart}>
              <use
                href="#icon-heart"
                viewBox="0 0 16 16"
                width={16}
                height={16}
              ></use>
            </svg>
          )}
        </button>
      </div>

      <div className={css.titleWrapper}>
        <h4 className={css.title}>
          {car.brand} <span className={css.modelSpan}>{car.model}</span>,{' '}
          {car.year}
        </h4>
        <p className={css.price}>${car.rentalPrice}</p>
      </div>
      <p className={css.infoLine}>
        {car.address
          .split(',')
          .slice(-2)
          .map((p) => p.trim())
          .join(' | ')}{' '}
        | {car.rentalCompany} | <br /> {car.type} |{' '}
        {car.mileage.toLocaleString('sv-SE')} km
      </p>
      <button
        className={css.btn}
        type="button"
        onClick={() => router.push(`/catalog/${car.id}`)}
      >
        Read more
      </button>
    </li>
  );
};

export default CarListItem;
