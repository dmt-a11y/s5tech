export const styles = {
  viewport:
    'fixed top-4 right-4 z-50 flex flex-col items-end gap-2 pointer-events-none',
  toast:
    'pointer-events-auto w-full max-w-sm rounded-xl border px-4 py-3 text-sm font-medium shadow-lg transition-all duration-300 ease-out',
  toastEnter: 'opacity-0 translate-x-4 scale-95',
  toastEntered: 'opacity-100 translate-x-0 scale-100',
  toastLeaving: 'opacity-0 translate-x-4 scale-95',
  toastContent: 'flex items-start gap-3',
  toastMessage: 'flex-1',
  dismissButton: 'shrink-0 leading-none opacity-60 hover:opacity-100 cursor-pointer',
  variant: {
    info: 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100',
    success:
      'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200',
    error:
      'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  },
} as const;
