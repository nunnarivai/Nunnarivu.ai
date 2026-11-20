import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Globe,
  ChevronDown,
  Menu,
  X,
  Building2,
  Tag,
} from 'lucide-react';
import { HEADER_NAV_ITEMS, type NavItem } from '../data/enterpriseData';
import { BrandLogo } from '../components/BrandLogo';
import styles from './HeaderNav.module.css';

interface HeaderNavProps {
  onDemoNotice: (msg: string) => void;
}

const LANGUAGES = ['English (US)', 'Deutsch', '日本語', '한국어'];

export const HeaderNav: React.FC<HeaderNavProps> = ({ onDemoNotice }) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdownId(null);
        setLangMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdownId(null);
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
    if (item.dropdown && item.dropdown.length > 0) {
      e.preventDefault();
      setOpenDropdownId((prev) => (prev === item.id ? null : item.id));
      return;
    }
    setOpenDropdownId(null);
    setMobileMenuOpen(false);
  };

  return (
    <header
      ref={navRef}
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}
      data-testid="global-header"
    >
      <div className={styles.inner}>
        {/* Left: Brand + Primary Navigation */}
        <div className={styles.leftGroup}>
          <a href="#hero" className={styles.logoLink} aria-label="Higgsfield Home">
            <BrandLogo size={26} variant="white-tile" />
          </a>

          <nav className={styles.desktopNav} aria-label="Primary Navigation">
            {HEADER_NAV_ITEMS.map((item) => {
              const hasDropdown = Boolean(item.dropdown && item.dropdown.length > 0);
              const isOpen = openDropdownId === item.id;
              return (
                <div
                  key={item.id}
                  className={styles.navItemWrap}
                  onMouseEnter={() => hasDropdown && setOpenDropdownId(item.id)}
                  onMouseLeave={() => hasDropdown && setOpenDropdownId(null)}
                >
                  <a
                    href={item.href}
                    className={`${styles.navLink} ${item.accent ? styles.navLinkAccent : ''} ${
                      isOpen ? styles.navLinkActive : ''
                    }`}
                    aria-expanded={hasDropdown ? isOpen : undefined}
                    onClick={(e) => handleNavClick(item, e)}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`${styles.badge} ${
                          item.badge === 'Top'
                            ? styles.badgeTop
                            : item.badge === 'Soon'
                              ? styles.badgeSoon
                              : styles.badgeNew
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {hasDropdown && (
                      <ChevronDown
                        size={12}
                        className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                      />
                    )}
                  </a>

                  {hasDropdown && isOpen && (
                    <div className={styles.dropdownPanel} role="menu">
                      {item.dropdown!.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          role="menuitem"
                          className={styles.dropdownItem}
                          onClick={() => setOpenDropdownId(null)}
                        >
                          <div className={styles.dropdownTitleRow}>
                            <span className={styles.dropdownTitle}>{sub.label}</span>
                            {sub.badge && (
                              <span className={styles.dropdownSubBadge}>{sub.badge}</span>
                            )}
                          </div>
                          <span className={styles.dropdownDesc}>{sub.description}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Right: Search, Language, Enterprise, Pricing, Auth */}
        <div className={styles.rightActions}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Search Higgsfield"
            onClick={() =>
              onDemoNotice('Demo mode: Workspace model & studio search is simulated locally.')
            }
          >
            <Search size={15} />
          </button>

          <div className={styles.langWrap}>
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="Change language"
              aria-expanded={langMenuOpen}
              onClick={() => setLangMenuOpen((v) => !v)}
            >
              <Globe size={15} />
            </button>
            {langMenuOpen && (
              <div className={styles.langMenu} role="menu">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    role="menuitem"
                    className={`${styles.langOption} ${
                      selectedLang === lang ? styles.langOptionActive : ''
                    }`}
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangMenuOpen(false);
                      onDemoNotice(`Display locale set to ${lang} (demo preview).`);
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="#enterprise-contact" className={styles.enterprisePill}>
            <Building2 size={13} />
            <span>Enterprise</span>
          </a>

          <a
            href="#enterprise-contact"
            className={styles.pricingPill}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('enterprise-contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Tag size={12} className={styles.pricingTagIcon} />
            <span>Pricing</span>
            <span className={styles.pricingDiscount}>-64%</span>
          </a>

          <button
            type="button"
            className={styles.loginBtn}
            onClick={() =>
              onDemoNotice('Demo mode: Authentication is disabled in this local UI reconstruction.')
            }
          >
            Login
          </button>

          <button
            type="button"
            className={styles.signupBtn}
            onClick={() => {
              document.getElementById('enterprise-contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get started
          </button>

          <button
            type="button"
            className={styles.mobileMenuBtn}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer} data-testid="mobile-nav-drawer">
          <div className={styles.mobileLinks}>
            {HEADER_NAV_ITEMS.map((item) => {
              const hasSub = Boolean(item.dropdown && item.dropdown.length > 0);
              const expanded = mobileExpandedId === item.id;
              return (
                <div key={item.id} className={styles.mobileItemGroup}>
                  <div className={styles.mobileRow}>
                    <a
                      href={item.href}
                      className={styles.mobileLink}
                      onClick={(e) => {
                        if (hasSub) {
                          e.preventDefault();
                          setMobileExpandedId(expanded ? null : item.id);
                        } else {
                          setMobileMenuOpen(false);
                        }
                      }}
                    >
                      <span>{item.label}</span>
                      {item.badge && <span className={styles.badgeNew}>{item.badge}</span>}
                    </a>
                    {hasSub && (
                      <button
                        type="button"
                        className={styles.mobileExpandBtn}
                        aria-label={`Toggle ${item.label} submenu`}
                        onClick={() => setMobileExpandedId(expanded ? null : item.id)}
                      >
                        <ChevronDown
                          size={16}
                          className={expanded ? styles.chevronOpen : ''}
                        />
                      </button>
                    )}
                  </div>
                  {hasSub && expanded && (
                    <div className={styles.mobileSubList}>
                      {item.dropdown!.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          className={styles.mobileSubLink}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span>{sub.label}</span>
                          <span className={styles.mobileSubDesc}>{sub.description}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className={styles.mobileDrawerFooter}>
            <button
              type="button"
              className={styles.mobileLoginBtn}
              onClick={() => {
                setMobileMenuOpen(false);
                onDemoNotice('Demo mode: Authentication is disabled in this local UI study.');
              }}
            >
              Login
            </button>
            <a
              href="#enterprise-contact"
              className={styles.mobileGetStartedBtn}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Enterprise Sales
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
