import React, { useState, useRef, useId } from 'react';
import {
  FileLock2,
  Sparkles,
  UserCog,
  Boxes,
  Cpu,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import {
  ENTERPRISE_FEATURES_LIST,
  CONTACT_INTEREST_OPTIONS,
  PARTNER_LOGOS,
} from '../data/enterpriseData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './ContactSalesSection.module.css';

interface ContactSalesSectionProps {
  sectionId: string;
  onDemoNotice: (msg: string) => void;
}

interface FormValues {
  firstName: string;
  lastName: string;
  companyName: string;
  jobTitle: string;
  businessEmail: string;
  website: string;
  interest: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  jobTitle?: string;
  businessEmail?: string;
  interest?: string;
}

const INITIAL_VALUES: FormValues = {
  firstName: '',
  lastName: '',
  companyName: '',
  jobTitle: '',
  businessEmail: '',
  website: '',
  interest: '',
};

const renderFeatureIcon = (icon: string) => {
  switch (icon) {
    case 'shield':
      return <FileLock2 size={15} />;
    case 'sparkles':
      return <Sparkles size={15} />;
    case 'users':
      return <UserCog size={15} />;
    case 'layers':
      return <Boxes size={15} />;
    default:
      return <Cpu size={15} />;
  }
};

export const ContactSalesSection: React.FC<ContactSalesSectionProps> = ({
  sectionId,
  onDemoNotice,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const uid = useId();
  useScrollReveal(sectionRef);

  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [selectOpen, setSelectOpen] = useState(false);
  const [submittedDemo, setSubmittedDemo] = useState(false);

  const validate = (vals: FormValues): FormErrors => {
    const next: FormErrors = {};
    if (!vals.firstName.trim()) next.firstName = 'First name is required';
    if (!vals.lastName.trim()) next.lastName = 'Last name is required';
    if (!vals.companyName.trim()) next.companyName = 'Company name is required';
    if (!vals.jobTitle.trim()) next.jobTitle = 'Job title is required';
    if (!vals.businessEmail.trim()) {
      next.businessEmail = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.businessEmail.trim())) {
      next.businessEmail = 'Enter a valid business email';
    }
    if (!vals.interest) next.interest = 'Please select an area of interest';
    return next;
  };

  const handleChange = (field: keyof FormValues, val: string) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmittedDemo(true);
    onDemoNotice(
      'Demo mode only: Form validated locally. No customer data was sent or stored.'
    );
  };

  return (
    <section id={sectionId} ref={sectionRef} className={styles.section}>
      <div className={`hf-container ${styles.grid}`}>
        {/* LEFT COLUMN: Enterprise Value Props + Partner Trust Marquee */}
        <div className={styles.leftColumn} data-reveal>
          <div className={styles.topBlock}>
            <h2 className={`hf-heading-lg ${styles.heading}`}>
              <span>CONNECT WITH</span>
              <span className="hf-two-tone-muted">OUR AI EXPERTS</span>
            </h2>

            <p className={styles.featuresLabel}>Features</p>

            <ul className={styles.featureList}>
              {ENTERPRISE_FEATURES_LIST.map((feat) => (
                <li key={feat.id} className={styles.featureItem}>
                  <span className={styles.featureIcon}>{renderFeatureIcon(feat.icon)}</span>
                  <span>{feat.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 04 — PARTNERS AND TRUST */}
          <div className={styles.partnerBlock} aria-label="Enterprise Technology Partners">
            <p className={styles.partnerCaption}>
              Partnering with global industry leaders to power your creative output
            </p>
            <div className={styles.marqueeViewport}>
              <div className={styles.marqueeTrack}>
                {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((partner, idx) => (
                  <div
                    key={`${partner.id}-${idx}`}
                    className={styles.partnerWordmark}
                    aria-hidden={idx >= PARTNER_LOGOS.length}
                  >
                    {partner.style === 'stack' && (
                      <span className={styles.wordmarkBfl}>
                        <span className={styles.lambdaGlyph}>λ</span>
                        <span>
                          Black
                          <br />
                          Forest Labs
                        </span>
                      </span>
                    )}
                    {partner.style === 'caps' && (
                      <span className={styles.wordmarkCaps}>{partner.name}</span>
                    )}
                    {partner.style === 'geometric' && (
                      <span className={styles.wordmarkFal}>
                        <span className={styles.falDiamond} />
                        {partner.name}
                      </span>
                    )}
                    {partner.style === 'sans' && (
                      <span className={styles.wordmarkSans}>{partner.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Contact Sales Form Card */}
        <div className={styles.formWrapper} data-reveal>
          {submittedDemo ? (
            <div className={styles.demoSuccessCard} role="status" aria-live="polite">
              <CheckCircle2 size={36} className={styles.successIcon} />
              <h3 className={`hf-heading-md ${styles.formTitle}`}>DEMO REQUEST VALIDATED</h3>
              <p className={styles.successBody}>
                Thank you, <strong>{values.firstName}</strong> ({values.companyName}). Because
                this is an independent local frontend reconstruction study, form submissions
                remain strictly in <strong>local demo mode</strong> and no personal or company
                information was transmitted.
              </p>
              <button
                type="button"
                className={styles.submitBtn}
                onClick={() => {
                  setSubmittedDemo(false);
                  setValues(INITIAL_VALUES);
                }}
              >
                Reset demo form
              </button>
            </div>
          ) : (
            <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
              <div className={styles.formHeader}>
                <h3 className={`hf-heading-md ${styles.formTitle}`}>CONTACT SALES</h3>
                <p className={styles.formSubtitle}>
                  Tell us about your needs and we&apos;ll get back to you
                </p>
              </div>

              <div className={styles.fieldsContainer}>
                <div className={styles.twoColRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor={`${uid}-firstName`} className={styles.label}>
                      First name
                    </label>
                    <input
                      id={`${uid}-firstName`}
                      type="text"
                      placeholder="John"
                      value={values.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                      aria-invalid={Boolean(errors.firstName)}
                    />
                    {errors.firstName && (
                      <span className={styles.errorText}>{errors.firstName}</span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor={`${uid}-lastName`} className={styles.label}>
                      Last name
                    </label>
                    <input
                      id={`${uid}-lastName`}
                      type="text"
                      placeholder="Doe"
                      value={values.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                      aria-invalid={Boolean(errors.lastName)}
                    />
                    {errors.lastName && (
                      <span className={styles.errorText}>{errors.lastName}</span>
                    )}
                  </div>
                </div>

                <div className={styles.twoColRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor={`${uid}-company`} className={styles.label}>
                      Company name
                    </label>
                    <input
                      id={`${uid}-company`}
                      type="text"
                      placeholder="Higgsfield AI"
                      value={values.companyName}
                      onChange={(e) => handleChange('companyName', e.target.value)}
                      className={`${styles.input} ${errors.companyName ? styles.inputError : ''}`}
                      aria-invalid={Boolean(errors.companyName)}
                    />
                    {errors.companyName && (
                      <span className={styles.errorText}>{errors.companyName}</span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor={`${uid}-jobTitle`} className={styles.label}>
                      Job title
                    </label>
                    <input
                      id={`${uid}-jobTitle`}
                      type="text"
                      placeholder="VP of Marketing"
                      value={values.jobTitle}
                      onChange={(e) => handleChange('jobTitle', e.target.value)}
                      className={`${styles.input} ${errors.jobTitle ? styles.inputError : ''}`}
                      aria-invalid={Boolean(errors.jobTitle)}
                    />
                    {errors.jobTitle && (
                      <span className={styles.errorText}>{errors.jobTitle}</span>
                    )}
                  </div>
                </div>

                <div className={styles.twoColRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor={`${uid}-email`} className={styles.label}>
                      Business email
                    </label>
                    <input
                      id={`${uid}-email`}
                      type="email"
                      placeholder="john@higgsfield.ai"
                      value={values.businessEmail}
                      onChange={(e) => handleChange('businessEmail', e.target.value)}
                      className={`${styles.input} ${
                        errors.businessEmail ? styles.inputError : ''
                      }`}
                      aria-invalid={Boolean(errors.businessEmail)}
                    />
                    {errors.businessEmail && (
                      <span className={styles.errorText}>{errors.businessEmail}</span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor={`${uid}-website`} className={styles.label}>
                      Website
                    </label>
                    <input
                      id={`${uid}-website`}
                      type="text"
                      placeholder="www.higgsfield.ai"
                      value={values.website}
                      onChange={(e) => handleChange('website', e.target.value)}
                      className={styles.input}
                    />
                  </div>
                </div>

                {/* Full-width custom Interest Combobox */}
                <div className={styles.fieldGroup}>
                  <label id={`${uid}-interest-label`} className={styles.label}>
                    What are you interested in
                  </label>
                  <div className={styles.selectWrap}>
                    <button
                      type="button"
                      role="combobox"
                      aria-labelledby={`${uid}-interest-label`}
                      aria-expanded={selectOpen}
                      className={`${styles.selectTrigger} ${
                        errors.interest ? styles.inputError : ''
                      }`}
                      onClick={() => setSelectOpen((v) => !v)}
                    >
                      <span
                        className={
                          values.interest ? styles.selectValue : styles.selectPlaceholder
                        }
                      >
                        {values.interest || 'Select a reason'}
                      </span>
                      <ChevronDown
                        size={15}
                        className={`${styles.selectChevron} ${
                          selectOpen ? styles.selectChevronOpen : ''
                        }`}
                      />
                    </button>

                    {selectOpen && (
                      <ul className={styles.selectMenu} role="listbox">
                        {CONTACT_INTEREST_OPTIONS.map((opt) => (
                          <li key={opt} role="option" aria-selected={values.interest === opt}>
                            <button
                              type="button"
                              className={`${styles.selectOption} ${
                                values.interest === opt ? styles.selectOptionActive : ''
                              }`}
                              onClick={() => {
                                handleChange('interest', opt);
                                setSelectOpen(false);
                              }}
                            >
                              {opt}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {errors.interest && (
                    <span className={styles.errorText}>{errors.interest}</span>
                  )}
                </div>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Continue
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
