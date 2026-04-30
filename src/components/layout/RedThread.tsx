'use client';

import { useEffect, useRef } from 'react';
import styles from './RedThread.module.css';

/**
 * Animated SVG red thread that draws itself as the user scrolls.
 * The thread weaves between sections, mimicking the Japanese legend of
 * the red string of fate (赤い糸, akai ito).
 */
export default function RedThread() {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    // Check reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Set initial dash array length
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      path.style.strokeDashoffset = `${length * (1 - progress)}`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <svg
        ref={svgRef}
        className={styles.svg}
        viewBox="0 0 100 2000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          className={styles.thread}
          d={[
            'M 50 0',
            // Hero → Gallery: gentle S-curve
            'C 80 100, 20 180, 50 320',
            // Gallery → About: wide swoop
            'C 90 460, 10 540, 50 660',
            // About → Services: tight weave
            'C 75 750, 25 840, 55 940',
            'C 80 1010, 20 1090, 48 1180',
            // Services → Booking
            'C 85 1280, 15 1380, 50 1500',
            // Booking → Footer
            'C 70 1600, 30 1700, 50 1850',
            'C 60 1920, 40 1960, 50 2000',
          ].join(' ')}
          fill="none"
          stroke="var(--color-ume)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.9"
          filter="drop-shadow(0 0 6px var(--color-ume))"
        />
      </svg>
    </div>
  );
}
