import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  User,
  GraduationCap,
} from 'lucide-react';
import { SECURITY_PRACTICE_ITEMS, type ContactServiceOption } from '../data/enterpriseData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { BrandLogo } from '../../components/common/BrandLogo';
import styles from './SecuritySection.module.css';

interface SecuritySectionProps {
  onRequestService: (service: ContactServiceOption) => void;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({ onRequestService }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  const [trainingTab, setTrainingTab] = useState<'workshops' | 'workflows'>('workshops');
  const [expandedPracticeId, setExpandedPracticeId] = useState<string>('encrypted-transfer');

  return (
    <section id="security" ref={sectionRef} className={`section--light ${styles.section}`}>
      <div className={`hf-container ${styles.container}`}>
        <h2 className={`hf-heading-lg ${styles.heading}`} data-reveal>
          YOUR DATA AND IP ARE PROTECTED
        </h2>

        {/* ROW 1: 3 Cards (1fr : 1.9fr : 1fr) */}
        <div className={styles.rowTop} data-reveal>
          {/* CARD 1 — DATA PRIVACY */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Data Privacy</h3>
              <p className={styles.cardSub}>
                Isolated client workflows and controlled handling for your brand assets and scripts
              </p>
            </div>

            <div className={styles.mediaVisualBox}>
              <img
                src="/assets/new-site/enterprise/security/data-privacy.webp"
                alt="Nunnarivu encrypted creative asset vault"
                className={styles.cardImage}
                loading="lazy"
              />
              <div className={styles.visualBadgeOverlay}>
                <Lock size={12} />
                <span>Private Project Vault</span>
              </div>
            </div>
          </article>

          {/* CARD 2 — TEAM MANAGEMENT (Wide Center Card) */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Team Management</h3>
              <p className={styles.cardSub}>
                Structured roles, project streams, and human review checkpoints across your workspace
              </p>
            </div>

            <div className={styles.provisioningStage}>
              <div className={styles.ownerNode}>
                <span className={styles.memberName}>
                  <BrandLogo variant="compact" decorative />
                  Nunnarivu Workspace
                </span>
                <span className={styles.roleGreen}>Project Lead</span>
              </div>

              <svg
                viewBox="0 0 520 38"
                className={styles.provConnectorSvg}
                fill="none"
                aria-hidden="true"
              >
                <circle cx="260" cy="4" r="3.5" fill="#5D4BD8" />
                <path
                  d="M260 4 C260 22 96 14 96 34"
                  stroke="#C5BCE0"
                  strokeWidth="1.4"
                />
                <path
                  d="M260 4 L260 34"
                  stroke="#5D4BD8"
                  strokeWidth="1.5"
                />
                <path
                  d="M260 4 C260 22 424 14 424 34"
                  stroke="#C5BCE0"
                  strokeWidth="1.4"
                />
                <circle cx="96" cy="34" r="3" fill="#5D4BD8" />
                <circle cx="260" cy="34" r="3" fill="#5D4BD8" />
                <circle cx="424" cy="34" r="3" fill="#5D4BD8" />
              </svg>

              <div className={styles.provColumns}>
                <div className={styles.memberList}>
                  {[
                    { name: 'Creative Director', role: 'Approval', lime: true },
                    { name: 'AI Engineer', role: 'Integration', lime: false },
                    { name: 'Media Producer', role: 'Delivery', lime: false },
                    { name: 'Client Lead', role: 'Review', lime: true },
                  ].map((m) => (
                    <div key={m.name} className={styles.memberRow}>
                      <span className={styles.memberName}>
                        <User size={11} /> {m.name}
                      </span>
                      <span className={m.lime ? styles.roleLime : styles.roleMuted}>
                        {m.role}
                      </span>
                    </div>
                  ))}
                </div>

                <div className={styles.creditPoolCenter}>
                  <span className={styles.creditPoolPill}>Scoped Access</span>
                </div>

                <div className={styles.allocationList}>
                  {[
                    { team: 'AI Media Studio', status: 'Active' },
                    { team: 'Automation Ops', status: 'Active' },
                    { team: 'Brand Assets', status: 'Protected' },
                  ].map((alloc) => (
                    <div key={alloc.team} className={styles.allocNode}>
                      <span>{alloc.team}</span>
                      <span className={styles.roleLime}>{alloc.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* CARD 3 — EXPERT SUPPORT */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Expert Support</h3>
              <p className={styles.cardSub}>
                Direct consultation with Nunnarivu AI specialists on creative &amp; engineering delivery
              </p>
            </div>

            <div className={styles.supportPhotoBox}>
              <img
                src="/assets/new-site/enterprise/security/expert-support-team-v2.webp"
                alt="Representative studio visual of AI engineers and creative specialists collaborating in a Nunnarivu.ai-branded enterprise workspace"
                className={`${styles.cardImage} ${styles.supportTeamImg}`}
                loading="lazy"
              />
              <span className={styles.managerBadge}>Nunnarivu Specialist Team</span>

              <button
                type="button"
                className={styles.consultBtn}
                onClick={() => onRequestService('Enterprise AI Solutions')}
              >
                <span>Book Consultation</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </article>
        </div>

        {/* ROW 2: 3 Cards (1fr : 1.45fr : 1.45fr) */}
        <div className={styles.rowBottom} data-reveal>
          {/* CARD 4 — AI TRAINING */}
          <article className={`${styles.card} ${styles.educatorCard}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>AI Training</h3>
              <p className={styles.cardSub}>
                Practical team enablement and real-project workflows via Nunnarivu.ai Academy
              </p>
            </div>

            <div className={styles.lessonsPanel}>
              <div className={styles.lessonTabs} role="tablist" aria-label="AI Training views">
                <button
                  type="button"
                  role="tab"
                  aria-selected={trainingTab === 'workshops'}
                  className={
                    trainingTab === 'workshops' ? styles.lessonTabActive : styles.lessonTab
                  }
                  onClick={() => setTrainingTab('workshops')}
                >
                  Workshops
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={trainingTab === 'workflows'}
                  className={
                    trainingTab === 'workflows' ? styles.lessonTabActive : styles.lessonTab
                  }
                  onClick={() => setTrainingTab('workflows')}
                >
                  Workflows
                </button>
              </div>

              {trainingTab === 'workshops' ? (
                <div className={styles.lessonRows}>
                  <div className={styles.lessonItem}>
                    <img
                      src="/assets/images/Concept.jpeg"
                      alt="Concept to final frame training track"
                      className={styles.lessonImgThumb}
                      loading="lazy"
                    />
                    <div>
                      <span className={styles.lessonMeta}>Module 01</span>
                      <p className={styles.lessonTitleBright}>
                        Generative film &amp; visual direction
                      </p>
                    </div>
                  </div>
                  <div className={styles.lessonItem}>
                    <img
                      src="/assets/images/Generative AI Media.jpeg"
                      alt="Campaign production studio track"
                      className={styles.lessonImgThumb}
                      loading="lazy"
                    />
                    <div>
                      <span className={styles.lessonMetaLime}>● Module 02</span>
                      <p className={styles.lessonTitleBright}>
                        Brand-consistent video, image &amp; voice workflows
                      </p>
                    </div>
                  </div>
                  <div className={styles.lessonItem}>
                    <img
                      src="/assets/images/Flagship Products.jpeg"
                      alt="Business automation operations track"
                      className={styles.lessonImgThumb}
                      loading="lazy"
                    />
                    <div>
                      <span className={styles.lessonMeta}>Module 03</span>
                      <p className={styles.lessonTitleMuted}>
                        Operational AI automation for teams
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <ul className={styles.keypointsList}>
                  <li>Hands-on prompt &amp; storyboarding discipline</li>
                  <li>Character, lighting, and brand continuity checks</li>
                  <li>Practical workflow automation with human oversight</li>
                </ul>
              )}

              <Link to="/academy" className={styles.academyInlineLink}>
                <GraduationCap size={13} />
                <span>Explore Nunnarivu.ai Academy</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </article>

          {/* CARD 5 — SECURITY PRACTICES */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Security Practices</h3>
              <p className={styles.cardSub}>
                Clear delivery safeguards, scoped permissions, and transparent client IP terms
              </p>
            </div>

            <div className={styles.socStage}>
              <div className={styles.shieldBridgeCol}>
                <div className={styles.shieldNode}>
                  <ShieldCheck size={20} />
                </div>
                <svg
                  viewBox="0 0 74 220"
                  className={styles.socCurvesSvg}
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="4" cy="110" r="3.5" fill="#5D4BD8" />
                  {[22, 66, 110, 154, 198].map((ty) => (
                    <g key={ty}>
                      <path
                        d={`M4 110 C38 110 36 ${ty} 70 ${ty}`}
                        stroke="#C5BCE0"
                        strokeWidth="1.3"
                      />
                      <circle cx="70" cy={ty} r="2.8" fill="#5D4BD8" />
                    </g>
                  ))}
                </svg>
              </div>

              <div className={styles.socChecklist}>
                {SECURITY_PRACTICE_ITEMS.map((item) => {
                  const isOpen = expandedPracticeId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-expanded={isOpen}
                      className={`${styles.socItem} ${isOpen ? styles.socItemOpen : ''}`}
                      onClick={() => setExpandedPracticeId(item.id)}
                    >
                      <div className={styles.socItemTitleRow}>
                        <CheckCircle2 size={13} className={styles.socCheckIcon} />
                        <span>{item.title}</span>
                      </div>
                      {isOpen && <p className={styles.socItemDetail}>{item.detail}</p>}
                    </button>
                  );
                })}
              </div>
            </div>
          </article>

          {/* CARD 6 — ENTERPRISE ACCESS */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Enterprise Access</h3>
              <p className={styles.cardSub}>
                Dedicated client onboarding and tailored workspace provisioning for your organization
              </p>
            </div>

            <div className={styles.accessVisualStage}>
              <div className={styles.accessArtWrap}>
                <img
                  src="/assets/new-site/enterprise/security/enterprise-access.webp"
                  alt="Nunnarivu.ai Enterprise workspace access illustration"
                  className={styles.cardImage}
                  loading="lazy"
                />
              </div>

              <div className={styles.accessFooterCard}>
                <div className={styles.accessBrandRow}>
                  <BrandLogo variant="compact" decorative />
                  <div>
                    <div className={styles.ssoBrand}>Nunnarivu.ai Workspace</div>
                    <div className={styles.ssoSub}>Dedicated enterprise onboarding</div>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.ssoContinueBtn}
                  onClick={() => onRequestService('Enterprise AI Solutions')}
                >
                  <span>Request Enterprise Access</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
