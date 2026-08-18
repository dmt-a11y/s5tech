import { useContext, useMemo } from 'react';
import { ToastContext } from './ToastProvider';

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return useMemo(
    () => ({
      info: (message: string) => context.showToast(message, 'info'),
      success: (message: string) => context.showToast(message, 'success'),
      error: (message: string) => context.showToast(message, 'error'),
    }),
    [context],
  );
};
