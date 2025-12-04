import css from './page.module.css';
import NotFoundClient from './NotFoundClient';
import type { Metadata } from 'next';

const NotFound = () => {
  return (
    <section className="container">
      <div className={css.notFoundWrapper}>
        <h1 className={css.notFoundTitle}>404 - Page Not Found</h1>
        <p className={css.notFoundText}>
          With our experience you would think we&#39;d already driven here{' '}
          <br /> but we haven&#39;t yet&#40;
          <br />
        </p>
        <p className={css.notFoundTextOffer}>Meanwhile we offer you to:</p>
        <NotFoundClient />
      </div>
    </section>
  );
};

export default NotFound;

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'Sorry, the page you are looking for does not exist.',
  keywords: ['404', 'not found', 'car rental'],
  openGraph: {
    title: 'Page Not Found',
    description: 'Sorry, the page you are looking for does not exist.',
    url: '/404',
  },
  twitter: {
    title: 'Page Not Found',
    description: 'Sorry, the page you are looking for does not exist.',
  },
};
