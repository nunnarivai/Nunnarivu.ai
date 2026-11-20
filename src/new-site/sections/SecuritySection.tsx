import React, { useRef, useState } from 'react';
import {
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  MicOff,
  Mic,
  VideoOff,
  Video,
  PhoneOff,
  KeyRound,
  User,
} from 'lucide-react';
import { SOC2_COMPLIANCE_ITEMS } from '../data/enterpriseData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './SecuritySection.module.css';

interface SecuritySectionProps {
  onDemoNotice: (msg: string) => void;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({ onDemoNotice }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  const [educatorTab, setEducatorTab] = useState<'lessons' | 'keypoints'>('lessons');
  const [expandedSocId, setExpandedSocId] = useState<string>('change-management');
  const [ssoEmail, setSsoEmail] = useState('knightstyle@higgsfield.com');
  const [micMuted, setMicMuted] = useState(true);
  const [camOff, setCamOff] = useState(true);

  return (
    <section id="security" ref={sectionRef} className={styles.section}>
      <div className={`hf-container ${styles.container}`}>
        <h2 className={`hf-heading-lg ${styles.heading}`} data-reveal>
          YOUR DATA AND IP ARE PROTECTED
        </h2>

        {/* ROW 1: 3 Cards (1fr : 1.9fr : 1fr) */}
        <div className={styles.rowTop} data-reveal>
          {/* 1. No training on your data */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>No training on your data</h3>
              <p className={styles.cardSub}>Private by default</p>
            </div>

            <div className={styles.noTrainStage}>
              <div className={styles.eyeCircle}>
                <EyeOff size={18} />
              </div>

              <svg
                viewBox="0 0 260 110"
                className={styles.dashedPaths}
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M130 6 C130 56 38 66 34 106"
                  stroke="rgba(255,255,255,0.22)"
                  strokeDasharray="3 3"
                />
                <path
                  d="M130 6 C130 58 98 72 96 106"
                  stroke="rgba(255,255,255,0.26)"
                  strokeDasharray="3 3"
                />
                <path
                  d="M130 6 C130 58 162 72 164 106"
                  stroke="rgba(255,255,255,0.26)"
                  strokeDasharray="3 3"
                />
                <path
                  d="M130 6 C130 56 222 66 226 106"
                  stroke="rgba(255,255,255,0.22)"
                  strokeDasharray="3 3"
                />
              </svg>

              <div className={styles.fannedCards}>
                <div className={`${styles.fanCard} ${styles.fan1}`} />
                <div className={`${styles.fanCard} ${styles.fan2}`} />
                <div className={`${styles.fanCard} ${styles.fan3}`} />
                <div className={`${styles.fanCard} ${styles.fan4}`} />
              </div>
            </div>
          </article>

          {/* 2. Centralized provisioning */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Centralized provisioning</h3>
              <p className={styles.cardSub}>
                Role-based seat permissions and shared credit pools across sub-teams
              </p>
            </div>

            <div className={styles.provisioningStage}>
              <div className={styles.ownerNode}>
                <span className={styles.memberName}>
                  <User size={12} /> Gary
                </span>
                <span className={styles.roleGreen}>Owner ⌄</span>
              </div>

              <svg
                viewBox="0 0 520 38"
                className={styles.provConnectorSvg}
                fill="none"
                aria-hidden="true"
              >
                <circle cx="260" cy="4" r="3.5" fill="#ffffff" />
                <path
                  d="M260 4 C260 22 96 14 96 34"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="1.2"
                />
                <path
                  d="M260 4 L260 34"
                  stroke="rgba(209,254,23,0.35)"
                  strokeWidth="1.2"
                />
                <path
                  d="M260 4 C260 22 424 14 424 34"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="1.2"
                />
                <circle cx="96" cy="34" r="3" fill="#ffffff" />
                <circle cx="260" cy="34" r="3" fill="#d1fe17" />
                <circle cx="424" cy="34" r="3" fill="#ffffff" />
              </svg>

              <div className={styles.provColumns}>
                <div className={styles.memberList}>
                  {[
                    { name: 'Emily', role: 'Admin', lime: true },
                    { name: 'Michael', role: 'Member', lime: false },
                    { name: 'Sara', role: 'Member', lime: false },
                    { name: 'Emma', role: 'Member', lime: false },
                    { name: 'Layana', role: 'Member', lime: false },
                  ].map((m) => (
                    <div key={m.name} className={styles.memberRow}>
                      <span className={styles.memberName}>
                        <User size={11} /> {m.name}
                      </span>
                      <span className={m.lime ? styles.roleLime : styles.roleMuted}>
                        {m.role} ⌄
                      </span>
                    </div>
                  ))}
                </div>

                <div className={styles.creditPoolCenter}>
                  <span className={styles.creditPoolPill}>Credit pool</span>
                </div>

                <div className={styles.allocationList}>
                  {[
                    { team: 'Brand', pct: '40%' },
                    { team: 'Studio', pct: '35%' },
                    { team: 'Agency', pct: '25%' },
                  ].map((alloc) => (
                    <div key={alloc.team} className={styles.allocNode}>
                      <span>{alloc.team}</span>
                      <span className={styles.roleLime}>{alloc.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* 3. Personal Account Manager */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Personal Account Manager</h3>
              <p className={styles.cardSub}>With prompts, assets and generations</p>
            </div>

            <div className={styles.managerCallBox}>
              <span className={styles.managerBadge}>Higgsfield manager</span>

              <svg viewBox="0 0 260 210" className={styles.managerSvg} aria-hidden="true">
                <defs>
                  <linearGradient id="officeBg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#cfc7be" />
                    <stop offset="100%" stopColor="#7a746e" />
                  </linearGradient>
                </defs>
                <rect width="260" height="210" fill="url(#officeBg)" />
                <rect x="18" y="22" width="76" height="92" rx="4" fill="rgba(255,255,255,0.28)" />
                {/* Suit & shoulders */}
                <path d="M52 210 C64 146 196 146 208 210 Z" fill="#18181b" />
                {/* Headset band */}
                <path
                  d="M96 95 A34 34 0 0 1 164 95"
                  stroke="#111"
                  strokeWidth="4"
                  fill="none"
                />
                <rect x="91" y="88" width="8" height="18" rx="4" fill="#111" />
                {/* Portrait face */}
                <ellipse cx="130" cy="96" rx="30" ry="37" fill="#ecc4ad" />
                <path
                  d="M100 88 C102 52 158 52 160 88 C148 70 112 70 100 88 Z"
                  fill="#1c1917"
                />
                <circle cx="119" cy="95" r="2.5" fill="#1c1917" />
                <circle cx="141" cy="95" r="2.5" fill="#1c1917" />
                <path
                  d="M123 112 Q130 116 137 112"
                  stroke="#b45346"
                  strokeWidth="2.2"
                  fill="none"
                />
              </svg>

              <div className={styles.callControls}>
                <button
                  type="button"
                  className={styles.callBtnDark}
                  aria-label="Toggle microphone"
                  onClick={() => setMicMuted((v) => !v)}
                >
                  {micMuted ? <MicOff size={13} color="#ef4444" /> : <Mic size={13} />}
                </button>
                <button
                  type="button"
                  className={styles.callBtnDark}
                  aria-label="Toggle camera"
                  onClick={() => setCamOff((v) => !v)}
                >
                  {camOff ? <VideoOff size={13} /> : <Video size={13} />}
                </button>
                <button
                  type="button"
                  className={styles.callBtnHangup}
                  aria-label="End demo call preview"
                  onClick={() =>
                    onDemoNotice('Demo UI illustration: Dedicated Account Manager call preview.')
                  }
                >
                  <PhoneOff size={13} />
                </button>
              </div>
            </div>
          </article>
        </div>

        {/* ROW 2: 3 Cards (1fr : 1.42fr : 1.42fr) */}
        <div className={styles.rowBottom} data-reveal>
          {/* 4. Dedicated AI Educator */}
          <article className={`${styles.card} ${styles.educatorCard}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Dedicated AI Educator</h3>
              <p className={styles.cardSub}>
                Onboarding on your real project, plus 180h of Academy
              </p>
            </div>

            <div className={styles.lessonsPanel}>
              <div className={styles.lessonTabs} role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={educatorTab === 'lessons'}
                  className={
                    educatorTab === 'lessons' ? styles.lessonTabActive : styles.lessonTab
                  }
                  onClick={() => setEducatorTab('lessons')}
                >
                  Lessons
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={educatorTab === 'keypoints'}
                  className={
                    educatorTab === 'keypoints' ? styles.lessonTabActive : styles.lessonTab
                  }
                  onClick={() => setEducatorTab('keypoints')}
                >
                  Keypoints
                </button>
              </div>

              {educatorTab === 'lessons' ? (
                <div className={styles.lessonRows}>
                  <div className={styles.lessonItem}>
                    <div className={styles.lessonThumb} />
                    <div>
                      <span className={styles.lessonMeta}>Lesson 1</span>
                      <p className={styles.lessonTitleMuted}>The pipeline, end to end</p>
                    </div>
                  </div>
                  <div className={styles.lessonItem}>
                    <div className={styles.lessonThumbActive} />
                    <div>
                      <span className={styles.lessonMetaLime}>● Lesson 2</span>
                      <p className={styles.lessonTitleBright}>
                        Gain insight into a topic and learn the fundamentals.
                      </p>
                    </div>
                  </div>
                  <div className={styles.lessonItem}>
                    <div className={styles.lessonThumb} />
                    <div>
                      <span className={styles.lessonMeta}>Lesson 3</span>
                      <p className={styles.lessonTitleMuted}>Working in Claude</p>
                    </div>
                  </div>
                </div>
              ) : (
                <ul className={styles.keypointsList}>
                  <li>Custom brand LoRA & Soul character lock</li>
                  <li>Shot-by-shot camera direction & lighting LUTs</li>
                  <li>Team review workflows & Adobe/Figma handoff</li>
                </ul>
              )}
            </div>
          </article>

          {/* 5. SOC 2 & GDPR */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>SOC 2</h3>
              <p className={styles.cardSub}>
                SOC 2 &amp; GDPR Compliant. Documentation available.
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
                  <circle cx="4" cy="110" r="3.5" fill="#ffffff" />
                  {[22, 66, 110, 154, 198].map((ty) => (
                    <g key={ty}>
                      <path
                        d={`M4 110 C38 110 36 ${ty} 70 ${ty}`}
                        stroke="rgba(255,255,255,0.22)"
                        strokeWidth="1.2"
                      />
                      <circle cx="70" cy={ty} r="2.8" fill="#ffffff" />
                    </g>
                  ))}
                </svg>
              </div>

              <div className={styles.socChecklist}>
                {SOC2_COMPLIANCE_ITEMS.map((item) => {
                  const isOpen = expandedSocId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`${styles.socItem} ${isOpen ? styles.socItemOpen : ''}`}
                      onClick={() => setExpandedSocId(item.id)}
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

          {/* 6. SSO */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>SSO</h3>
              <p className={styles.cardSub}>Single sign-on through your identity provider</p>
            </div>

            <div className={styles.ssoStage}>
              <div className={styles.ssoModal}>
                <div>
                  <div className={styles.ssoBrand}>Higgsfield</div>
                  <div className={styles.ssoSub}>Enter the Workspace</div>
                </div>

                <div className={styles.ssoField}>
                  <label htmlFor="sso-demo-email" className={styles.ssoLabel}>
                    Email
                  </label>
                  <input
                    id="sso-demo-email"
                    type="email"
                    value={ssoEmail}
                    onChange={(e) => setSsoEmail(e.target.value)}
                    className={styles.ssoInput}
                  />
                </div>

                <div className={styles.ssoEnabledPill}>
                  <CheckCircle2 size={12} />
                  <span>SSO is enabled</span>
                </div>

                <button
                  type="button"
                  className={styles.ssoContinueBtn}
                  onClick={() =>
                    onDemoNotice(
                      `Demo UI illustration: SAML/OIDC SSO handshake simulated for ${ssoEmail}.`
                    )
                  }
                >
                  <KeyRound size={13} />
                  <span>Continue via SSO</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
