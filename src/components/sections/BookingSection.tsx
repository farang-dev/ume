'use client';

import { useTranslations } from 'next-intl';
import { useRef, useEffect, useState } from 'react';
import styles from './BookingSection.module.css';

export default function BookingSection() {
  const t = useTranslations('booking');
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

  const openCalendly = () => {
    window.open('https://calendly.com/ume-tattoo', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={`section ${styles.booking}`} id="booking" ref={sectionRef}>
      <div className="container">
        <div className={`${styles.inner} ${visible ? styles.visible : ''}`}>
          {/* Left: text */}
          <div className={styles.textCol}>
            <span className="label">{t('label')}</span>
            <div className="divider" />
            <h2 className={styles.heading}>{t('title')}</h2>

            {/* Contact options */}
            <div className={styles.options}>
              <a
                href="https://wa.me/37060000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: 'fit-content' }}
                id="booking-whatsapp-btn"
              >
                <WhatsAppIcon />
                {t('whatsapp')}
              </a>

              <a
                href="https://www.instagram.com/monika.ume/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ width: 'fit-content' }}
                id="booking-instagram-btn"
              >
                <InstagramIcon />
                {t('instagram')}
              </a>
            </div>
          </div>

          {/* Right: decorative */}
          <div className={styles.decorCol}>
            <div className={styles.decorFrame}>
              <div className={styles.logoWatermark}>
                <img src="/images/logo.png" alt="" />
              </div>
              <div className={styles.decorLines}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={styles.decorLine} style={{ animationDelay: `${i * 0.4}s` }} />
                ))}
              </div>
              <div className={styles.decorCornerTL} />
              <div className={styles.decorCornerBR} />
            </div>

            {/* Stats / trust signals */}
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>100%</span>
                <span className={styles.statLabel}>Custom designs</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>Private</span>
                <span className={styles.statLabel}>Studio sessions</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>Vilnius</span>
                <span className={styles.statLabel}>Lithuania</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-7.6 8.38 8.38 0 0 1 3.8.9L22 4l-1.5 6.5Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
