import React, { useEffect } from 'react';
import { X, Info } from 'lucide-react';
import styles from './DemoToast.module.css';

interface DemoToastProps {
  message: string | null;
  onClose: () => void;
}

export const DemoToast: React.FC<DemoToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(onClose, 4200);
    return () => window.clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={styles.toast} role="status" aria-live="polite">
      <span className={styles.iconWrap}>
        <Info size={16} />
      </span>
      <span className={styles.text}>{message}</span>
      <button
        type="button"
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
};
