'use client';

import css from './page.module.css';
import { useRouter } from 'next/navigation';

const NotFoundClient = () => {
  const router = useRouter();

  const handleGoBack = () =>
    window.history.length > 1 ? router.back() : router.push('/');

  return (
    <div className={css.notFoundBtnWrapper}>
      <button
        className={`${css.btn} ${css.notFoundBtn}`}
        type="button"
        onClick={handleGoBack}
      >
        Go Back
      </button>
      <button
        className={`${css.btn} ${css.notFoundBtn}`}
        type="button"
        onClick={() => router.push('/catalog')}
      >
        View Catalog
      </button>
    </div>
  );
};

export default NotFoundClient;
