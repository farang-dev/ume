'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import styles from './GallerySection.module.css';

import { getTattoos, urlFor } from '@/lib/sanity';

// Placeholder gallery items (will be replaced by Sanity CMS data)
const PLACEHOLDER_ITEMS = [
  { id: '1', style: 'fine-line', aspect: 'tall',    src: '/gallery/placeholder-1.jpg', alt: 'Fine line botanical tattoo' },
  { id: '2', style: 'blackwork', aspect: 'square',  src: '/gallery/placeholder-2.jpg', alt: 'Blackwork geometric tattoo' },
  { id: '3', style: 'botanical', aspect: 'wide',    src: '/gallery/placeholder-3.jpg', alt: 'Botanical floral tattoo' },
  { id: '4', style: 'fine-line', aspect: 'square',  src: '/gallery/placeholder-4.jpg', alt: 'Fine line minimalist tattoo' },
  { id: '5', style: 'geometric', aspect: 'tall',    src: '/gallery/placeholder-5.jpg', alt: 'Geometric linework tattoo' },
  { id: '6', style: 'blackwork', aspect: 'square',  src: '/gallery/placeholder-6.jpg', alt: 'Blackwork floral tattoo' },
  { id: '7', style: 'botanical', aspect: 'tall',    src: '/gallery/placeholder-7.jpg', alt: 'Botanical illustration tattoo' },
  { id: '8', style: 'fine-line', aspect: 'wide',    src: '/gallery/placeholder-8.jpg', alt: 'Fine line wrist tattoo' },
  { id: '9', style: 'geometric', aspect: 'square',  src: '/gallery/placeholder-9.jpg', alt: 'Geometric mandala tattoo' },
];

const GRADIENT_MAP: Record<string, string> = {
  'fine-line': 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
  'blackwork': 'linear-gradient(135deg, #111 0%, #222 100%)',
  'botanical': 'linear-gradient(135deg, #141414 0%, #1e2016 100%)',
  'geometric': 'linear-gradient(135deg, #151515 0%, #1c1c1c 100%)',
};

interface GallerySectionProps {
  initialItems?: any[];
  limit?: number;
}

export default function GallerySection({ initialItems, limit }: GallerySectionProps) {
  const t = useTranslations('gallery');
  const [items, setItems] = useState<any[]>(
    initialItems && initialItems.length > 0 ? initialItems : PLACEHOLDER_ITEMS
  );
  const [lightbox, setLightbox] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only fetch if we don't have initial items
    if (!initialItems || initialItems.length === 0) {
      async function loadTattoos() {
        const data = await getTattoos();
        if (data && data.length > 0) {
          setItems(data);
        }
      }
      loadTattoos();
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [initialItems]);

  const displayItems = limit ? items.slice(0, limit) : items;
  const showViewAll = !!limit;

  return (
    <section className={`section ${styles.gallery}`} id="gallery" ref={sectionRef}>
      <div className="container">
        {/* Masonry grid */}
        <div className={styles.masonry}>
          {displayItems.map((item, i) => {
            const isPlaceholder = !item._id;
            const imgSrc = isPlaceholder ? item.src : urlFor(item.image).width(1200).url();
            const aspect = item.aspect || 'square';
            const style = item.style || 'fine-line';

            return (
              <div
                key={item._id || item.id}
                className={`${styles.card} ${visible ? styles.cardVisible : ''}`}
                style={{ transitionDelay: `${i * 60}ms` }}
                onClick={() => setLightbox(imgSrc)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setLightbox(imgSrc)}
                aria-label={item.title || item.alt}
              >
                <div className={styles.cardBg}>
                  {!isPlaceholder ? (
                    <Image
                      src={imgSrc}
                      alt={item.title || ''}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div 
                      className={styles.image} 
                      style={{ background: GRADIENT_MAP[style] }} 
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {showViewAll && (
          <div className={styles.viewAllContainer}>
            <Link href="/tattoos" className="btn btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>
              {t('seeAll')}
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className={styles.lightbox}
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button className={styles.lightboxClose} aria-label="Close">✕</button>
          <div className={styles.lightboxContent}>
            <div className={styles.lightboxImg}>
              <img src={lightbox} alt="Fullscreen gallery" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
