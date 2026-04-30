'use client';

import { useTranslations } from 'next-intl';
import { useRef, useEffect, useState } from 'react';
import styles from './InfoSection.module.css';

export default function InfoSection() {
  const t = useTranslations('info');
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.info}`} id="services" ref={sectionRef}>
      <div className="container">
        <div className={`${styles.header} ${visible ? styles.visible : ''}`}>
          <span className="label">{t('title')}</span>
          <div className="divider" />
        </div>

        <div className={styles.grid}>
          {/* Hygiene Section */}
          <div className={`${styles.col} ${visible ? styles.colVisible : ''}`}>
            <h3 className={styles.sectionTitle}>{t('hygieneTitle')}</h3>
            <p className={styles.bodyText}>{t('hygieneBody')}</p>
          </div>

          {/* Pricing Section */}
          <div className={`${styles.col} ${visible ? styles.colVisible : ''}`} style={{ transitionDelay: '200ms' }}>
            <h3 className={styles.sectionTitle}>{t('pricingTitle')}</h3>
            
            <div className={styles.subSection}>
              <h4 className={styles.subTitle}>{t('flashTitle')}</h4>
              <p className={styles.bodyTextSmall}>{t('flashBody')}</p>
            </div>

            <div className={styles.subSection}>
              <h4 className={styles.subTitle}>{t('customTitle')}</h4>
              <p className={styles.bodyTextSmall}>{t('customBody')}</p>
            </div>

            <p className={styles.contactText}>{t('contact')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
