import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GallerySection from '@/components/sections/GallerySection';
import { getTattoos } from '@/lib/sanity';
import { getTranslations } from 'next-intl/server';

export default async function TattoosPage() {
  const tattoos = await getTattoos();
  const t = await getTranslations('gallery');

  return (
    <>
      <Header />
      <main style={{ paddingTop: '120px', paddingBottom: '60px', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem', fontWeight: 300, letterSpacing: '0.05em' }}>
            {t('title')}
          </h1>
        </div>
        <GallerySection initialItems={tattoos} />
      </main>
      <Footer />
    </>
  );
}
