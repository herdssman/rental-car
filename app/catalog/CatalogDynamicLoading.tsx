'use client';

import dynamic from 'next/dynamic';
import Loader from '@/app/loading';

const CatalogContent = dynamic(() => import('./CatalogContent'), {
  ssr: false,
  loading: () => <Loader />,
});

export default function CatalogDynamicLoading() {
  return <CatalogContent />;
}
