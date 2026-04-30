'use client';

import { useTranslations } from 'next-intl';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  const t = useTranslations('about');
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.about}`} id="about" ref={sectionRef}>
      <div className="container">
        <div className={`${styles.grid} ${visible ? styles.visible : ''}`}>
          {/* Photo column */}
          <div className={styles.photoCol}>
            <div className={styles.photoFrame}>
              <Image 
                src="/images/artist_profile.png" 
                alt="Monika Matukaite — Tattoo Artist" 
                fill
                className={styles.artistPhoto}
                sizes="(max-width: 1024px) 100vw, 420px"
              />
              {/* Decorative corner */}
              <div className={styles.cornerTL} aria-hidden="true" />
              <div className={styles.cornerBR} aria-hidden="true" />
              {/* Red accent line */}
              <div className={styles.redAccent} aria-hidden="true" />
            </div>
          </div>

          {/* Text column */}
          <div className={styles.textCol}>
            <span className="label">{t('label')}</span>
            <div className="divider" />
            <h2 className={styles.heading}>{t('title')}</h2>

            <div className={styles.bio}>
              <p>{t('bio')}</p>
            </div>

            {/* Details */}
            <dl className={styles.details}>
              <div className={styles.detailRow}>
                <dt className="label">{t('studio')}</dt>
                <dd>Ume Tattoo Studio</dd>
              </div>
              <div className={styles.detailRow}>
                <dt className="label">{t('address')}</dt>
                <dd>Vilnius, Lithuania</dd>
              </div>
              <div className={styles.detailRow}>
                <dt className="label">{t('instagram')}</dt>
                <dd>
                  <a
                    href="https://www.instagram.com/monika.ume/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.instaLink}
                  >
                    @monika.ume ↗
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Horizontal skin-texture lines */}
        <div className={styles.textureLines} aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={styles.textureLine} style={{ opacity: 0.015 + i * 0.003 }} />
          ))}
        </div>
      </div>
    </section>
  );
}
