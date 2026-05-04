import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RedThread from '@/components/layout/RedThread';
import Hero from '@/components/sections/Hero';
import GallerySection from '@/components/sections/GallerySection';
import AboutSection from '@/components/sections/AboutSection';
import InfoSection from '@/components/sections/InfoSection';
import BookingSection from '@/components/sections/BookingSection';
import { getTattoos } from '@/lib/sanity';

export default async function HomePage() {
  const tattoos = await getTattoos();

  return (
    <>
      <RedThread />
      <Header />
      <main>
        <Hero />
        <GallerySection initialItems={tattoos} />
        <AboutSection />
        <InfoSection />
        <BookingSection />
      </main>
      <Footer />
    </>
  );
}
