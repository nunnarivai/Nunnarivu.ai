import React, { useState, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { ENTERPRISE_FAQS } from '../data/enterpriseData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './FaqSection.module.css';

export const FaqSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'what-is-nunnarivu': true,
  });

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="faq" ref={sectionRef} className={`section--violet ${styles.section}`}>
      <div className={`hf-container ${styles.container}`}>
        <h2 className={`hf-heading-lg ${styles.heading}`} data-reveal>
          GOT ANY QUESTIONS LEFT?
        </h2>

        <div className={styles.accordionList} data-reveal>
          {ENTERPRISE_FAQS.map((item) => {
            const isOpen = Boolean(openIds[item.id]);
            return (
              <div
                key={item.id}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
              >
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  id={`faq-btn-${item.id}`}
                  onClick={() => toggleFaq(item.id)}
                >
                  <span className={styles.question}>{item.question}</span>
                  <span className={styles.iconWrap} aria-hidden="true">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  className={`${styles.panelOuter} ${
                    isOpen ? styles.panelOuterOpen : ''
                  }`}
                >
                  <div className={styles.panelInner}>
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
