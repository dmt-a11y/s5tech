import { useEffect, useState } from 'react';
import type { ToastItem } from './types';
import { styles } from './styles';

const AUTO_DISMISS_MS = 4000;
const EXIT_DURATION_MS = 300;

interface ToastProps {
  toast: ToastItem;
  onDismiss: () => void;
}

export const Toast = ({ toast, onDismiss }: ToastProps) => {
  const [isEntered, setIsEntered] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLeaving(true), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLeaving) return;
    const timer = setTimeout(onDismiss, EXIT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [isLeaving, onDismiss]);

  return (
    <div
      role="status"
      className={`${styles.toast} ${styles.variant[toast.variant]} ${
        isLeaving
          ? styles.toastLeaving
          : isEntered
            ? styles.toastEntered
            : styles.toastEnter
      }`}
    >
      <div className={styles.toastContent}>
        <span className={styles.toastMessage}>{toast.message}</span>
        <button
          type="button"
          onClick={() => setIsLeaving(true)}
          aria-label="Dismiss notification"
          className={styles.dismissButton}
        >
          ✕
        </button>
      </div>
    </div>
  );
};
