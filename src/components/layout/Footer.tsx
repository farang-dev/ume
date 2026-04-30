import { useTranslations } from 'next-intl';
import styles from './Footer.module.css';

const YEAR = new Date().getFullYear();

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className={styles.footer} id="footer">
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <div className={styles.logoBlock}>
          <img src="/images/logo.png" alt="Ume Logo" className={styles.footerLogo} />
          <p className={styles.studioLine}>{t('footer.studio')}</p>
        </div>

        {/* Links */}
        <nav className={styles.links} aria-label="Footer navigation">
          {(['gallery', 'artist', 'services', 'collections'] as const).map((key) => (
            <a
              key={key}
              href={key === 'collections' ? 'https://www.instagram.com/behind.curtains_/' : `#${key === 'artist' ? 'about' : key}`}
              target={key === 'collections' ? '_blank' : undefined}
              rel={key === 'collections' ? 'noopener noreferrer' : undefined}
              className={styles.link}
            >
              {t(`nav.${key}`)}
            </a>
          ))}
        </nav>

        {/* Social */}
        <div className={styles.social}>
          <a
            href="https://www.instagram.com/monika.ume/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instaLink}
            aria-label="Instagram DM"
          >
            <InstagramIcon />
            <span>@monika.ume</span>
          </a>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <span className={styles.copy}>
            &copy; {YEAR} Monika Matukaite — {t('footer.rights')}
          </span>
          <span className={styles.address}>Vilnius, Lithuania</span>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
