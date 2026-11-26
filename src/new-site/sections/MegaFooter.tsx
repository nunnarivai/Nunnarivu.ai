/** @jsxRuntime classic */
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { BrandLogo } from '../../components/common/BrandLogo';
import {
  VERIFIED_SOCIAL_LINKS,
  NUNNARIVU_OFFICE_ADDRESS_LINES,
  BODHI_MULTIVERSE_URL,
  type ShowcaseCategoryId,
  type ContactServiceOption,
} from '../data/enterpriseData';
import styles from './MegaFooter.module.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: any;
    }
  }
}

interface MegaFooterProps {
  variant?: 'enterprise' | 'blog';
  onSelectShowcaseCategory?: (category: ShowcaseCategoryId) => void;
  onRequestService?: (service: ContactServiceOption) => void;
}

export const MegaFooter: React.FC<MegaFooterProps> = ({
  variant = 'enterprise',
  onSelectShowcaseCategory,
  onRequestService,
}) => {
  const isBlogVariant = variant === 'blog';
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const isLanding =
    location.pathname === '/' ||
    location.pathname === '/enterprise' ||
    location.pathname === '/new-site' ||
    location.pathname === '/new-site/';

  const scrollToSection = (sectionId: string) => {
    if (isLanding) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const handleServiceLink = (categoryId: ShowcaseCategoryId) => {
    if (onSelectShowcaseCategory && isLanding) {
      onSelectShowcaseCategory(categoryId);
      document.getElementById('creative-showcase')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#creative-showcase');
    }
  };

  return (
    <footer
      id="footer"
      className={`section--light ${styles.footer} ${isBlogVariant ? styles.footerBlog : ''}`}
      data-testid={isBlogVariant ? 'blog-footer' : 'mega-footer'}
      data-footer-variant={variant}
    >
      <div className={`hf-container ${styles.inner}`}>
        <div className={`${styles.topSection} ${isBlogVariant ? styles.topSectionBlog : ''}`}>
          {/* SECTION 1 — BRAND & OFFICE ADDRESSES */}
          <div className={styles.brandCol}>
            <Link to="/" className={styles.brandMarkRow} aria-label="Nunnarivu.ai home">
              <BrandLogo variant="footer" />
            </Link>

            <div className={`${styles.officesList} ${isBlogVariant ? styles.officesListBlog : ''}`}>
              <div className={styles.officeBlock} data-office="uk">
                <h3 className={styles.officeHeading}>
                  <MapPin size={14} className={styles.officePin} aria-hidden="true" />
                  <span>Our Manchester Company</span>
                </h3>
                <address className={styles.officeAddress}>
                  Profronted UK Pvt Ltd
                  <br />
                  Withington Works, Burton Road,
                  <br />
                  Withington, Manchester M20 3EB
                  <br />
                  United Kingdom
                </address>
              </div>

              <div className={styles.officeBlock} data-office="trichy">
                <h3 className={styles.officeHeading}>
                  <MapPin size={14} className={styles.officePin} aria-hidden="true" />
                  <span>Our Thiruchi Office</span>
                </h3>
                <address className={styles.officeAddress}>
                  {NUNNARIVU_OFFICE_ADDRESS_LINES.map((line, idx) => (
                    <React.Fragment key={line}>
                      {idx > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))}
                </address>
              </div>
            </div>
          </div>

          {/* Link Columns (Blog variant excludes Quick Links & Services) */}
          <div className={`${styles.columnsGrid} ${isBlogVariant ? styles.columnsGridBlog : ''}`}>
            {!isBlogVariant && (
              <>
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
                      <Link to="/old-site" className={styles.footerLink}>
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
                        Creative Work
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className={styles.footerLink}
                        onClick={() => scrollToSection('studios')}
                      >
                        Cinema Studio
                      </button>
                    </li>
                    <li>
                      <Link to="/academy" className={styles.footerLink}>
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
              </>
            )}

            {/* SECTION 4 — CONNECT */}
            <nav className={styles.column} aria-label="Connect">
              <h3 className={styles.colHeading}>Connect</h3>
              <ul className={`${styles.linkList} ${isBlogVariant ? styles.linkListBlog : ''}`}>
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

          {/* SECTION 5 — BODHI MULTIVERSE PARENT ECOSYSTEM LOGO */}
          <div className={styles.partnerCol} data-testid="bodhi-multiverse-badge">
            <a
              href={BODHI_MULTIVERSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bodhiLink}
              aria-label="Visit Bodhi Multiverse"
              title="Visit Bodhi Multiverse"
            >
              <img
                src="/assets/new-site/enterprise/brand/bodhi-multiverse-logo.png"
                alt="Bodhi Multiverse"
                className={styles.bodhiLogo}
                width={148}
                height={148}
                loading="lazy"
              />
            </a>
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
