'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const t = useTranslations('hero');
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered entrance animation
    const elements = [
      headlineRef.current,
      ctaRef.current,
      scrollRef.current,
    ];
    elements.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.9s cubic-bezier(0.25,0.1,0.25,1) ${i * 150 + 200}ms, transform 0.9s cubic-bezier(0.25,0.1,0.25,1) ${i * 150 + 200}ms`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    });
  }, []);

  const scrollToGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} id="hero">
      {/* Artist Photo Layer */}
      <div className={styles.heroImage}>
        <img src="/images/artist_hero.png" alt="Monika Matukaite" />
      </div>

      {/* Grain/Noise Overlay */}
      <div className={styles.noiseOverlay} />

      {/* Abstract Ink Graphic */}
      <div className={styles.inkFluid} />
      
      {/* SVG Filter for Ink Bleed Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0, visibility: 'hidden' }}>
        <filter id="inkFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="5">
            <animate attributeName="baseFrequency" dur="40s" values="0.012;0.018;0.012" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="220" />
          <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" seed="10" result="edgeNoise" />
          <feDisplacementMap in="SourceGraphic" in2="edgeNoise" scale="40" />
          <feGaussianBlur stdDeviation="20" />
          <feColorMatrix type="matrix" values="
            0.1 0 0 0 0.02
            0 0.1 0 0 0.02
            0 0 0.15 0 0.05
            0 0 0 18 -8" />
        </filter>
      </svg>

      {/* Official Logo Watermark */}
      <div className={styles.logoBg} aria-hidden="true">
        <img src="/images/logo.png" alt="" />
      </div>

      {/* Gradient vignette */}
      <div className={styles.vignette} aria-hidden="true" />
      
      {/* Bottom shadow fade to next section */}
      <div className={styles.bottomFade} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        {/* Label */}
        <span className={`label ${styles.label}`}>
          Vilnius · Lithuania
        </span>

        {/* Main headline */}
        <h1 className={styles.headline} ref={headlineRef}>
          <span className={styles.headlineUme}>UME</span>
          <span className={styles.headlineSub}>{t('tagline')}</span>
        </h1>

        {/* CTA Button */}
        <div className={styles.cta} ref={ctaRef}>
          <button 
            className="btn btn-primary"
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('cta')}
          </button>
        </div>
      </div>
    </section>
  );
}
