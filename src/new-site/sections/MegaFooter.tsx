import React from 'react';
import { MEGA_FOOTER_COLUMNS } from '../data/enterpriseData';
import { BrandLogo } from '../components/BrandLogo';
import styles from './MegaFooter.module.css';

interface MegaFooterProps {
  onDemoNotice: (msg: string) => void;
}

export const MegaFooter: React.FC<MegaFooterProps> = ({ onDemoNotice }) => {
  return (
    <footer id="footer" className={styles.footer} data-testid="mega-footer">
      <div className={`hf-container ${styles.inner}`}>
        <div className={styles.topSection}>
          {/* Observed Left Display Column */}
          <div className={styles.brandCol}>
            <div className={styles.brandMarkRow}>
              <BrandLogo size={26} variant="dark-glyph" />
              <span className={styles.brandName}>Higgsfield</span>
            </div>
            <h2 className={styles.suiteHeadline}>AI-NATIVE CREATIVE SUITE</h2>
          </div>

          {/* 9 Observed Mega Footer Columns */}
          <div className={styles.columnsGrid}>
            {MEGA_FOOTER_COLUMNS.map((col) => (
              <div key={col.heading} className={styles.column}>
                <h3 className={styles.colHeading}>{col.heading}</h3>
                <ul className={styles.linkList}>
                  {col.links.map((lnk) => (
                    <li key={`${col.heading}-${lnk.label}`}>
                      <a
                        href={lnk.href}
                        className={styles.footerLink}
                        onClick={(e) => {
                          if (lnk.href === '#footer') {
                            e.preventDefault();
                            onDemoNotice(
                              `External social link (${lnk.label}) kept local in reconstruction study.`
                            );
                          }
                        }}
                      >
                        {lnk.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Legal & Address Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.addressBlock}>
            <span>2nd Floor, Oorvasi Theatre Complex,
Annasilai, Chinthamani,
Trichy – 620002</span>
            <span className={styles.studyDisclaimer}>
              Local Clean-Room UI Reconstruction Study · Independent educational build, not
              an official Higgsfield service
            </span>
          </div>

          <div className={styles.socialRow}>
            {['X / Twitter', 'Youtube', 'LinkedIn', 'Tiktok', 'Discord'].map((soc) => (
              <button
                key={soc}
                type="button"
                className={styles.socialChip}
                onClick={() =>
                  onDemoNotice(`External destination (${soc}) disabled in local demo mode.`)
                }
              >
                {soc}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
