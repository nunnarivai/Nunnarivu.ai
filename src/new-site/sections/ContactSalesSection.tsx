import React, { useState, useRef, useId, useEffect } from 'react';
import {
  FileLock2,
  Sparkles,
  UserCog,
  Boxes,
  Cpu,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import {
  ENTERPRISE_CAPABILITIES_LIST,
  CONTACT_SERVICE_OPTIONS,
  NUNNARIVU_CAPABILITY_MARQUEE,
  type ContactServiceOption,
} from '../data/enterpriseData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './ContactSalesSection.module.css';

interface ContactSalesSectionProps {
  sectionId: string;
  preselectedService?: ContactServiceOption | null;
}

interface FormValues {
  firstName: string;
  lastName: string;
  companyName: string;
  jobTitle: string;
  businessEmail: string;
  phone: string;
  website: string;
  interest: string;
  message: string;
  companyFax: string; // hidden honeypot
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  businessEmail?: string;
  website?: string;
  interest?: string;
  message?: string;
}

const INITIAL_VALUES: FormValues = {
  firstName: '',
  lastName: '',
  companyName: '',
  jobTitle: '',
  businessEmail: '',
  phone: '',
  website: '',
  interest: '',
  message: '',
  companyFax: '',
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
  preselectedService,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const uid = useId();
  useScrollReveal(sectionRef);

  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [selectOpen, setSelectOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setValues((prev) => ({ ...prev, interest: preselectedService }));
      setErrors((prev) => ({ ...prev, interest: undefined }));
      setSubmitSuccess(null);
    }
  }, [preselectedService]);

  const validate = (vals: FormValues): FormErrors => {
    const next: FormErrors = {};
    if (!vals.firstName.trim()) next.firstName = 'First name is required';
    if (!vals.lastName.trim()) next.lastName = 'Last name is required';
    if (!vals.companyName.trim()) next.companyName = 'Company name is required';
    if (!vals.businessEmail.trim()) {
      next.businessEmail = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.businessEmail.trim())) {
      next.businessEmail = 'Enter a valid business email address';
    }
    if (vals.website.trim()) {
      const candidate = /^https?:\/\//i.test(vals.website.trim())
        ? vals.website.trim()
        : `https://${vals.website.trim()}`;
      try {
        new URL(candidate);
      } catch {
        next.website = 'Enter a valid website URL';
      }
    }
    if (!vals.interest) next.interest = 'Please select an interested service';
    if (!vals.message.trim() || vals.message.trim().length < 10) {
      next.message = 'Please describe your project requirements (at least 10 characters)';
    }
    return next;
  };

  const handleChange = (field: keyof FormValues, val: string) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitError(null);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          companyName: values.companyName.trim(),
          jobTitle: values.jobTitle.trim(),
          businessEmail: values.businessEmail.trim(),
          phone: values.phone.trim(),
          website: values.website.trim(),
          interest: values.interest,
          message: values.message.trim(),
          companyFax: values.companyFax,
          pageUrl: typeof window !== 'undefined' ? window.location.href : '/',
          consentGiven: true,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (response.ok && payload?.ok) {
        setSubmitSuccess(
          payload.message ||
            'Thank you for contacting Nunnarivu.ai. Our team has received your enquiry and will get back to you.'
        );
        setValues(INITIAL_VALUES);
        setErrors({});
      } else {
        if (payload?.fieldErrors && typeof payload.fieldErrors === 'object') {
          setErrors(payload.fieldErrors);
        }
        setSubmitError(
          payload?.error ||
            'We could not submit your enquiry right now. Please try again shortly.'
        );
      }
    } catch {
      setSubmitError(
        'Network error while reaching the enquiry service. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={sectionId} ref={sectionRef} className={`section--light ${styles.section}`}>
      <div className={`hf-container ${styles.grid}`}>
        {/* LEFT COLUMN: Nunnarivu Enterprise Capabilities */}
        <div className={styles.leftColumn} data-reveal>
          <div className={styles.topBlock}>
            <h2 className={`hf-heading-lg ${styles.heading}`}>
              <span>CONNECT WITH</span>
              <span className="hf-two-tone-muted">OUR AI EXPERTS</span>
            </h2>

            <p className={styles.featuresLabel}>What we build with you</p>

            <ul className={styles.featureList}>
              {ENTERPRISE_CAPABILITIES_LIST.map((feat) => (
                <li key={feat.id} className={styles.featureItem}>
                  <span className={styles.featureIcon}>{renderFeatureIcon(feat.icon)}</span>
                  <span>{feat.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.partnerBlock} aria-label="Nunnarivu.ai Capabilities">
            <p className={styles.partnerCaption}>
              Integrated AI media, automation, software, and training from Nunnarivu.ai
            </p>
            <div className={styles.marqueeViewport}>
              <div className={styles.marqueeTrack}>
                {[...NUNNARIVU_CAPABILITY_MARQUEE, ...NUNNARIVU_CAPABILITY_MARQUEE].map(
                  (label, idx) => (
                    <div
                      key={`${label}-${idx}`}
                      className={styles.partnerWordmark}
                      aria-hidden={idx >= NUNNARIVU_CAPABILITY_MARQUEE.length}
                    >
                      <span className={styles.wordmarkSans}>{label}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Production Contact Sales Form Card */}
        <div className={styles.formWrapper} data-reveal>
          {submitSuccess ? (
            <div className={styles.successCard} role="status" aria-live="polite">
              <CheckCircle2 size={36} className={styles.successIcon} />
              <h3 className={`hf-heading-md ${styles.formTitle}`}>ENQUIRY RECEIVED</h3>
              <p className={styles.successBody}>{submitSuccess}</p>
              <button
                type="button"
                className={styles.submitBtn}
                onClick={() => setSubmitSuccess(null)}
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form
              className={styles.formCard}
              onSubmit={handleSubmit}
              noValidate
              aria-label="Nunnarivu.ai Contact Sales Form"
            >
              <div className={styles.formHeader}>
                <h3 className={`hf-heading-md ${styles.formTitle}`}>CONTACT SALES</h3>
                <p className={styles.formSubtitle}>
                  Share your project goals and our team will respond directly
                </p>
              </div>

              {/* Hidden Honeypot for automated bot protection */}
              <div className={styles.honeypotField} aria-hidden="true">
                <label htmlFor={`${uid}-fax`}>Company Fax</label>
                <input
                  id={`${uid}-fax`}
                  name="companyFax"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.companyFax}
                  onChange={(e) => handleChange('companyFax', e.target.value)}
                />
              </div>

              {submitError && (
                <div className={styles.errorBanner} role="alert">
                  <AlertCircle size={16} className={styles.errorBannerIcon} />
                  <div>
                    <p>{submitError}</p>
                    <p className={styles.errorBannerFallback}>
                      Direct channels:{' '}
                      <a href="mailto:nunanrivu@gmail.com">nunanrivu@gmail.com</a> ·{' '}
                      <a
                        href="https://wa.me/917305484337"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp
                      </a>
                    </p>
                  </div>
                </div>
              )}

              <div className={styles.fieldsContainer}>
                <div className={styles.twoColRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor={`${uid}-first`} className={styles.label}>
                      First name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={`${uid}-first`}
                      name="firstName"
                      type="text"
                      required
                      placeholder="First name"
                      autoComplete="given-name"
                      value={values.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      aria-invalid={Boolean(errors.firstName)}
                      className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                    />
                    {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor={`${uid}-last`} className={styles.label}>
                      Last name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={`${uid}-last`}
                      name="lastName"
                      type="text"
                      required
                      placeholder="Last name"
                      autoComplete="family-name"
                      value={values.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      aria-invalid={Boolean(errors.lastName)}
                      className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                    />
                    {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
                  </div>
                </div>

                <div className={styles.twoColRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor={`${uid}-company`} className={styles.label}>
                      Company name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={`${uid}-company`}
                      name="companyName"
                      type="text"
                      required
                      placeholder="Your company or studio"
                      autoComplete="organization"
                      value={values.companyName}
                      onChange={(e) => handleChange('companyName', e.target.value)}
                      aria-invalid={Boolean(errors.companyName)}
                      className={`${styles.input} ${errors.companyName ? styles.inputError : ''}`}
                    />
                    {errors.companyName && (
                      <span className={styles.errorText}>{errors.companyName}</span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor={`${uid}-job`} className={styles.label}>
                      Job title
                    </label>
                    <input
                      id={`${uid}-job`}
                      name="jobTitle"
                      type="text"
                      placeholder="Role / title (optional)"
                      autoComplete="organization-title"
                      value={values.jobTitle}
                      onChange={(e) => handleChange('jobTitle', e.target.value)}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.twoColRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor={`${uid}-email`} className={styles.label}>
                      Business email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={`${uid}-email`}
                      name="businessEmail"
                      type="email"
                      required
                      placeholder="you@company.com"
                      autoComplete="email"
                      value={values.businessEmail}
                      onChange={(e) => handleChange('businessEmail', e.target.value)}
                      aria-invalid={Boolean(errors.businessEmail)}
                      className={`${styles.input} ${errors.businessEmail ? styles.inputError : ''}`}
                    />
                    {errors.businessEmail && (
                      <span className={styles.errorText}>{errors.businessEmail}</span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor={`${uid}-phone`} className={styles.label}>
                      Phone number
                    </label>
                    <input
                      id={`${uid}-phone`}
                      name="phone"
                      type="tel"
                      placeholder="+91 ... (optional)"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.twoColRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor={`${uid}-website`} className={styles.label}>
                      Company website
                    </label>
                    <input
                      id={`${uid}-website`}
                      name="website"
                      type="url"
                      placeholder="https://company.com (optional)"
                      autoComplete="url"
                      value={values.website}
                      onChange={(e) => handleChange('website', e.target.value)}
                      aria-invalid={Boolean(errors.website)}
                      className={`${styles.input} ${errors.website ? styles.inputError : ''}`}
                    />
                    {errors.website && <span className={styles.errorText}>{errors.website}</span>}
                  </div>

                  {/* Interested Service Dropdown */}
                  <div className={styles.fieldGroup}>
                    <span id={`${uid}-interest-label`} className={styles.label}>
                      Interested service <span aria-hidden="true">*</span>
                    </span>
                    <div className={styles.selectWrap}>
                      <button
                        type="button"
                        role="combobox"
                        aria-labelledby={`${uid}-interest-label`}
                        aria-expanded={selectOpen}
                        aria-haspopup="listbox"
                        className={`${styles.selectTrigger} ${
                          errors.interest ? styles.inputError : ''
                        }`}
                        onClick={() => setSelectOpen((v) => !v)}
                      >
                        <span className={values.interest ? styles.selectVal : styles.selectPlaceholder}>
                          {values.interest || 'Select a service'}
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
                          {CONTACT_SERVICE_OPTIONS.map((opt) => (
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
                    {errors.interest && <span className={styles.errorText}>{errors.interest}</span>}
                  </div>
                </div>

                {/* Project Requirements / Message */}
                <div className={styles.fieldGroup}>
                  <label htmlFor={`${uid}-message`} className={styles.label}>
                    Project requirements / message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id={`${uid}-message`}
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about your project, goals, deliverables, or timeline..."
                    value={values.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                  />
                  {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                </div>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 size={15} className={styles.spinner} />
                    <span>Sending enquiry...</span>
                  </>
                ) : (
                  <span>Send Enquiry</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
