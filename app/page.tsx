'use client';

import css from './page.module.css';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className={css.main}>
      <section className={css.hero}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <button
          type="button"
          className={css.btn}
          onClick={() => router.push('/catalog')}
        >
          View Catalog
        </button>
      </section>
    </main>
  );
}
