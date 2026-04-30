'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';

const NAV_LINKS = ['gallery', 'artist', 'services', 'collections'] as const;
const EXTERNAL_LINKS: Record<string, string> = {
  collections: 'https://www.instagram.com/behind.curtains_/'
};

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const switchLocale = () => {
    const next = locale === 'lt' ? 'en' : 'lt';
    router.replace(pathname, { locale: next });
  };

  const scrollToSection = (id: string) => {
    if (EXTERNAL_LINKS[id]) {
      window.open(EXTERNAL_LINKS[id], '_blank');
      setMenuOpen(false);
      return;
    }
    
    setMenuOpen(false);
    // Map 'artist' link to 'about' section ID
    const sectionId = id === 'artist' ? 'about' : id;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          {/* Logo */}
          <button
            className={styles.logo}
            onClick={() => scrollToSection('hero')}
            aria-label="Ume Tattoo"
          >
            <img
              src="/images/logo.png"
              alt="Ume Tattoo Logo"
              className={styles.logoImg}
            />
          </button>

          {/* Desktop Nav */}
          <nav className={styles.nav} aria-label="Main navigation">
            {NAV_LINKS.map((key) => (
              EXTERNAL_LINKS[key] ? (
                <a
                  key={key}
                  href={EXTERNAL_LINKS[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.navLink}
                >
                  {t(key)}
                </a>
              ) : (
                <button
                  key={key}
                  className={styles.navLink}
                  onClick={() => scrollToSection(key)}
                >
                  {t(key)}
                </button>
              )
            ))}
          </nav>

          {/* Right controls */}
          <div className={styles.controls}>
            <button
              className={styles.langSwitch}
              onClick={switchLocale}
              aria-label="Switch language"
            >
              {routing.locales.map((loc, i) => (
                <span key={loc}>
                  {i > 0 && <span className={styles.langDivider}>|</span>}
                  <span className={locale === loc ? styles.langActive : styles.langInactive}>
                    {loc.toUpperCase()}
                  </span>
                </span>
              ))}
            </button>

            <button
              className="btn btn-primary"
              onClick={() => scrollToSection('booking')}
              style={{ padding: '10px 22px' }}
            >
              {t('book')}
            </button>

            {/* Hamburger */}
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
        ref={menuRef}
        aria-hidden={!menuOpen}
      >
        <nav className={styles.mobileNav}>
          {NAV_LINKS.map((key, i) => (
            EXTERNAL_LINKS[key] ? (
              <a
                key={key}
                href={EXTERNAL_LINKS[key]}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileNavLink}
                style={{ transitionDelay: menuOpen ? `${i * 80}ms` : '0ms' }}
                onClick={() => setMenuOpen(false)}
              >
                <span className={styles.mobileNavNum}>0{i + 1}</span>
                {t(key)}
              </a>
            ) : (
              <button
                key={key}
                className={styles.mobileNavLink}
                style={{ transitionDelay: menuOpen ? `${i * 80}ms` : '0ms' }}
                onClick={() => scrollToSection(key)}
              >
                <span className={styles.mobileNavNum}>0{i + 1}</span>
                {t(key)}
              </button>
            )
          ))}
          <button
            className={`${styles.mobileNavLink} ${styles.mobileBookBtn}`}
            style={{ transitionDelay: menuOpen ? `${NAV_LINKS.length * 80}ms` : '0ms' }}
            onClick={() => scrollToSection('booking')}
          >
            {t('book')}
          </button>
        </nav>

        <button
          className={styles.langSwitchMobile}
          onClick={switchLocale}
        >
          {routing.locales.map((loc, i) => (
            <span key={loc}>
              {i > 0 && <span className={styles.langDivider}>|</span>}
              <span className={locale === loc ? styles.langActive : styles.langInactive}>
                {loc.toUpperCase()}
              </span>
            </span>
          ))}
        </button>
      </div>
    </>
  );
}
