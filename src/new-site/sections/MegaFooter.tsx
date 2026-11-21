import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  VERIFIED_SOCIAL_LINKS,
  NUNNARIVU_OFFICE_ADDRESS,
  type ShowcaseCategoryId,
  type ContactServiceOption,
} from '../data/enterpriseData';
import styles from './MegaFooter.module.css';

interface MegaFooterProps {
  onSelectShowcaseCategory?: (category: ShowcaseCategoryId) => void;
  onRequestService?: (service: ContactServiceOption) => void;
}

export const MegaFooter: React.FC<MegaFooterProps> = ({
  onSelectShowcaseCategory,
  onRequestService,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const isLanding =
    location.pathname === '/new-site' ||
    location.pathname === '/new-site/' ||
    location.pathname === '/new-site/enterprise';

  const scrollToSection = (sectionId: string) => {
    if (isLanding) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/new-site#${sectionId}`);
    }
  };

  const handleServiceLink = (categoryId: ShowcaseCategoryId) => {
    if (onSelectShowcaseCategory && isLanding) {
      onSelectShowcaseCategory(categoryId);
      document.getElementById('creative-showcase')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/new-site#creative-showcase');
    }
  };

  return (
    <footer id="footer" className={`section--light ${styles.footer}`} data-testid="mega-footer">
      <div className={`hf-container ${styles.inner}`}>
        <div className={styles.topSection}>
          {/* SECTION 1 — BRAND */}
          <div className={styles.brandCol}>
            <Link to="/new-site" className={styles.brandMarkRow}>
              <img
                src="/assets/images/logo-emblem.png"
                alt="Nunnarivu.ai"
                className={styles.brandEmblem}
                loading="lazy"
              />
              <span className={styles.brandName}>Nunnarivu.ai</span>
            </Link>

            <p className={styles.brandDesc}>
              AI-first company building enterprise AI solutions, cinematic generative media,
              and proprietary products.
            </p>

            <p className={styles.addressText}>{NUNNARIVU_OFFICE_ADDRESS}</p>
          </div>

          {/* 3 Clean Link Columns */}
          <div className={styles.columnsGrid}>
            {/* SECTION 2 — QUICK LINKS */}
            <nav className={styles.column} aria-label="Quick Links">
              <h3 className={styles.colHeading}>Quick Links</h3>
              <ul className={styles.linkList}>
                <li>
                  <button
                    type="button"
                    className={styles.footerLink}
                    onClick={() => scrollToSection('hero')}
                  >
                    Home
                  </button>
                </li>
                <li>
                  <Link to="/" className={styles.footerLink}>
                    About
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className={styles.footerLink}
                    onClick={() => scrollToSection('creative-showcase')}
                  >
                    Our Services
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={styles.footerLink}
                    onClick={() => scrollToSection('our-work')}
                  >
                    Our Work
                  </button>
                </li>
                <li>
                  <Link to="/new-site/academy" className={styles.footerLink}>
                    Academy
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className={styles.footerLink}
                    onClick={() => scrollToSection('enterprise-contact')}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </nav>

            {/* SECTION 3 — SERVICES */}
            <nav className={styles.column} aria-label="Services">
              <h3 className={styles.colHeading}>Services</h3>
              <ul className={styles.linkList}>
                <li>
                  <button
                    type="button"
                    className={styles.footerLink}
                    onClick={() => handleServiceLink('video-generation')}
                  >
                    AI Video
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={styles.footerLink}
                    onClick={() => handleServiceLink('image-generation')}
                  >
                    AI Image
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={styles.footerLink}
                    onClick={() => handleServiceLink('voice-generation')}
                  >
                    AI Voice
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={styles.footerLink}
                    onClick={() => handleServiceLink('movie-creation')}
                  >
                    AI Movie Creation
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={styles.footerLink}
                    onClick={() => {
                      if (onRequestService && isLanding) {
                        onRequestService('Enterprise AI Solutions');
                      } else {
                        scrollToSection('enterprise-contact');
                      }
                    }}
                  >
                    Enterprise AI Solutions
                  </button>
                </li>
              </ul>
            </nav>

            {/* SECTION 4 — CONNECT */}
            <nav className={styles.column} aria-label="Connect">
              <h3 className={styles.colHeading}>Connect</h3>
              <ul className={styles.linkList}>
                {VERIFIED_SOCIAL_LINKS.map((soc) => (
                  <li key={soc.id}>
                    <a
                      href={soc.href}
                      className={styles.footerLink}
                      target={soc.external ? '_blank' : undefined}
                      rel={soc.external ? 'noopener noreferrer' : undefined}
                    >
                      {soc.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            Copyright © {currentYear} Nunnarivu.ai. All rights reserved.
          </p>

          <button
            type="button"
            className={styles.backToTopBtn}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
