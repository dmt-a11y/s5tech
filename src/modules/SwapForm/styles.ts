export const styles = {
  errorContainer: 'swap-form text-(--swap-danger) text-center p-8',
  form: 'swap-form w-[min(380px,100%-2rem)] mx-auto my-6 sm:my-8 p-5 sm:p-6 flex flex-col gap-3 rounded-[20px] border border-(--swap-border) bg-(--swap-bg) text-(--swap-text) font-sans shadow-[0_12px_32px_rgba(20,22,26,0.08)]',
  title: 'm-0 mb-1 text-xl font-bold',
  fieldError: 'text-(--swap-danger) text-[0.8125rem]',
  flipButton:
    'self-center w-10 h-10 -my-2 z-1 rounded-full border border-(--swap-border) bg-(--swap-bg) text-(--swap-text) cursor-pointer hover:border-(--swap-accent) hover:text-(--swap-accent)',
  submitButton:
    'mt-2 p-3.5 rounded-2xl border-0 bg-(--swap-accent) text-(--swap-accent-contrast) font-semibold cursor-pointer transition-opacity duration-150 disabled:opacity-50 disabled:cursor-not-allowed',
  successMessage:
    'm-0 p-3 rounded-[10px] text-sm text-center text-(--swap-success) bg-[color-mix(in_srgb,var(--swap-success)_15%,transparent)]',

  // SwapField
  field:
    'flex flex-col gap-2 p-3.5 rounded-2xl border border-(--swap-border) bg-(--swap-surface)',
  fieldRow: 'grid grid-cols-[auto_1fr] items-center gap-3',

  // AmountField
  amountInputWrapper: 'flex flex-col items-end gap-1',
  amountInput:
    'w-full p-0 border-0 bg-transparent outline-none font-sans text-[1.375rem] sm:text-2xl tabular-nums text-right text-(--swap-text) [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
  amountOutput:
    'text-right text-[1.375rem] sm:text-2xl tabular-nums text-(--swap-text-muted)',

  // TokenIcon
  tokenIcon: 'shrink-0 rounded-full object-contain',
  tokenIconFallback:
    'inline-flex items-center justify-center shrink-0 rounded-full font-bold bg-(--swap-accent) text-(--swap-accent-contrast)',

  // TokenSelect
  tokenSelectRoot: 'relative flex flex-col gap-1',
  tokenSelectLabel: 'text-xs text-(--swap-text-muted)',
  tokenSelectTrigger:
    'self-start flex items-center gap-2 min-h-10 px-3 py-2 rounded-full border border-(--swap-border) bg-(--swap-bg) text-(--swap-text) text-[0.9375rem] font-semibold cursor-pointer',
  tokenSelectPlaceholder: 'font-medium text-(--swap-text-muted)',
  tokenSelectChevron: 'text-xs text-(--swap-text-muted)',
  // Fixed width (clamped to the viewport) rather than stretching to the
  // trigger's own width — the trigger sits in an `auto` grid column, so
  // matching its width would squeeze the token list/search too narrow.
  tokenSelectPanel:
    'absolute top-[calc(100%+0.375rem)] left-0 z-10 w-[min(17rem,calc(100vw-2.5rem))] flex flex-col max-h-80 overflow-hidden rounded-2xl border border-(--swap-border) bg-(--swap-bg) shadow-xl',
  tokenSelectSearch:
    'm-2.5 px-3 py-2 rounded-lg border border-(--swap-border) bg-(--swap-surface) text-(--swap-text) text-base outline-none font-sans focus:border-(--swap-accent)',
  tokenSelectList: 'list-none m-0 px-1.5 pb-1.5 overflow-y-auto',
  tokenSelectEmpty: 'p-3 text-center text-sm text-(--swap-text-muted)',
  tokenSelectOption:
    'w-full flex items-center gap-2 min-h-10 p-2 rounded-lg border-0 bg-transparent text-(--swap-text) text-sm text-left cursor-pointer enabled:hover:bg-(--swap-surface) disabled:opacity-35 disabled:cursor-not-allowed',
  tokenSelectOptionSymbol: 'flex-1 font-semibold',
  tokenSelectOptionPrice: 'tabular-nums text-(--swap-text-muted)',
  tokenSelectError: 'text-xs text-(--swap-danger)',
} as const;
