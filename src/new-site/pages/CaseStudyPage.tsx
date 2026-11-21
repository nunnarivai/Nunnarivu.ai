import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import {
  getCaseStudyBySlug,
  PORTFOLIO_CASE_STUDIES,
} from '../data/portfolioData';
import type { ContactServiceOption } from '../data/enterpriseData';
import { usePageMeta } from '../../hooks/usePageMeta';
import { MegaFooter } from '../sections/MegaFooter';
import styles from './CaseStudyPage.module.css';

interface CaseStudyPageProps {
  onSelectService?: (service: ContactServiceOption) => void;
}

export const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ onSelectService }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const study = getCaseStudyBySlug(slug);

  usePageMeta({
    title: study ? study.seoTitle : 'Case Study Not Found · Nunnarivu.ai',
    description: study
      ? study.seoDescription
      : 'Explore verified Nunnarivu.ai AI creative production and enterprise case studies.',
    ogImage: study
      ? `https://www.nunnarivu.ai${study.heroImage}`
      : 'https://www.nunnarivu.ai/assets/images/og-cover.jpg',
    canonical: study
      ? `https://www.nunnarivu.ai/new-site/case-studies/${study.slug}`
      : 'https://www.nunnarivu.ai/new-site',
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  if (!study) {
    return (
      <div className={styles.page}>
        <main className={`hf-container ${styles.notFoundBox}`}>
          <span className={styles.eyebrow}>Case Study</span>
          <h1 className="hf-heading-lg">Project not found</h1>
          <p className={styles.overviewText}>
            The case study you requested does not exist or has been moved.
          </p>
          <Link to="/new-site#our-work" className={styles.primaryBtn}>
            <ArrowLeft size={15} />
            <span>Back to Our Work</span>
          </Link>
        </main>
        <MegaFooter />
      </div>
    );
  }

  const relatedStudies = study.relatedSlugs
    .map((s) => PORTFOLIO_CASE_STUDIES.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const handleStartProject = () => {
    onSelectService?.(study.serviceType);
    navigate('/new-site#enterprise-contact');
  };

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <div className={`hf-container ${styles.topBarInner}`}>
          <Link to="/new-site#our-work" className={styles.backLink}>
            <ArrowLeft size={15} />
            <span>Back to Our Work</span>
          </Link>

          <Link to="/new-site" className={styles.brandMini}>
            <img src="/assets/images/logo-emblem.png" alt="" className={styles.brandLogoImg} />
            <span>Nunnarivu.ai</span>
          </Link>

          <button type="button" className={styles.topCta} onClick={handleStartProject}>
            <span>Start Your Project</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </header>

      <main id="main" className={styles.main}>
        {/* A. PROJECT HERO (Section 1 — Dark Violet) */}
        <section className={`section--violet ${styles.heroSection}`}>
          <div className={`hf-container ${styles.heroInner}`}>
            <div className={styles.metaStrip}>
              <span className={styles.categoryPill}>
                <Sparkles size={12} />
                <span>{study.category}</span>
              </span>
              <span className={styles.metaText}>{study.clientLabel}</span>
              <span className={styles.metaDivider} aria-hidden="true">·</span>
              <span className={styles.metaText}>{study.year}</span>
            </div>

            <h1 className={`hf-heading-xl ${styles.heroTitle}`}>{study.title}</h1>
            <p className={styles.overviewText}>{study.overview}</p>

            <div className={styles.heroMediaFrame}>
              {study.heroVideo ? (
                <video
                  className={styles.heroMedia}
                  poster={study.heroImage}
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src={study.heroVideo} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={study.heroImage}
                  alt={study.title}
                  className={styles.heroMedia}
                />
              )}
            </div>
          </div>
        </section>

        {/* B. ABOUT THE PROJECT (Section 2 — White) */}
        <section className={`section--light ${styles.contentSection}`}>
          <div className={`hf-container ${styles.twoColGrid}`}>
            <div className={styles.infoCard}>
              <span className={styles.sectionLabel}>01 · About the Project</span>
              <h2 className={styles.cardHeading}>Problem &amp; Requirement</h2>
              <p className={styles.bodyText}>{study.problem}</p>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.sectionLabel}>02 · Objective</span>
              <h2 className={styles.cardHeading}>Project Goal</h2>
              <p className={styles.bodyText}>{study.objective}</p>
            </div>
          </div>
        </section>

        {/* C. OUR APPROACH (Section 3 — Dark Violet) */}
        <section className={`section--violet ${styles.contentSection}`}>
          <div className={`hf-container ${styles.approachCard}`}>
            <div className={styles.approachLeft}>
              <span className={styles.sectionLabel}>03 · Our Approach</span>
              <h2 className="hf-heading-md">Creative Strategy &amp; Production Workflow</h2>
              <p className={styles.bodyText}>{study.creativeStrategy}</p>
            </div>

            <div className={styles.approachRight}>
              <h3 className={styles.subListHeading}>Technology, Tools &amp; Workflow</h3>
              <ul className={styles.checkList}>
                {study.toolsAndWorkflow.map((item) => (
                  <li key={item} className={styles.checkRow}>
                    <CheckCircle2 size={15} className={styles.checkIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* D. PROJECT GALLERY (Section 4 — White) */}
        <section className={`section--light ${styles.contentSection}`}>
          <div className="hf-container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>04 · Project Gallery</span>
              <h2 className="hf-heading-md">Production Visuals &amp; Media</h2>
            </div>

            <div className={styles.galleryGrid}>
              {study.gallery.map((item, idx) => (
                <figure key={`${item.src}-${idx}`} className={styles.galleryCard}>
                  <div className={styles.galleryMediaWrap}>
                    {item.type === 'video' ? (
                      <video
                        className={styles.galleryMedia}
                        poster={item.poster}
                        controls
                        playsInline
                        preload="metadata"
                      >
                        <source src={item.src} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={item.src}
                        alt={item.alt}
                        className={styles.galleryMedia}
                        loading="lazy"
                      />
                    )}
                  </div>
                  <figcaption className={styles.galleryCaption}>{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* E. VERIFIED DELIVERABLES & OUTCOMES (Section 5 — Dark Violet) */}
        <section className={`section--violet ${styles.contentSection}`}>
          <div className={`hf-container ${styles.resultsBox}`}>
            <span className={styles.sectionLabel}>05 · Verified Deliverables &amp; Outcomes</span>
            <h2 className="hf-heading-md">What Was Delivered</h2>
            <ul className={styles.deliverablesGrid}>
              {study.deliverables.map((del) => (
                <li key={del} className={styles.deliverableItem}>
                  <CheckCircle2 size={16} className={styles.checkIcon} />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* F. RELATED WORK (Section 6 — White) */}
        {relatedStudies.length > 0 && (
          <section className={`section--light ${styles.contentSection}`}>
            <div className="hf-container">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionLabel}>06 · Related Work</span>
                <h2 className="hf-heading-md">More from Nunnarivu.ai</h2>
              </div>

              <div className={styles.relatedGrid}>
                {relatedStudies.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/new-site/case-studies/${rel.slug}`}
                    className={styles.relatedCard}
                  >
                    <div className={styles.relatedThumbWrap}>
                      <img
                        src={rel.thumbnail}
                        alt={rel.title}
                        className={styles.relatedThumb}
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.relatedBody}>
                      <span className={styles.relatedCategory}>{rel.category}</span>
                      <h3 className={styles.relatedTitle}>{rel.title}</h3>
                      <p className={styles.relatedSummary}>{rel.summary}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* G. CONTACT CTA (Section 7 — Dark Violet before Light Footer) */}
        <section className={`section--violet ${styles.ctaSection}`}>
          <div className={`hf-container ${styles.ctaCard}`}>
            <div>
              <span className={styles.sectionLabel}>Start Your Project</span>
              <h2 className="hf-heading-md">Ready to build something similar with Nunnarivu.ai?</h2>
              <p className={styles.bodyText}>
                Share your goals with our creative directors and AI engineers to scope a tailored production or enterprise rollout.
              </p>
            </div>
            <button type="button" className={styles.primaryBtn} onClick={handleStartProject}>
              <span>Start Your Project</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </section>
      </main>

      <MegaFooter />
    </div>
  );
};
