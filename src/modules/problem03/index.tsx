import { SwapField } from './components/SwapField';
import { useSwapForm } from './hooks/useSwapForm';
import './theme.css';
import { styles } from './styles';

export const SwapForm = () => {
  const {
    tokens,
    isLoading,
    tokensError,
    control,
    register,
    errors,
    fromTokenSymbol,
    toTokenSymbol,
    toAmountTransferred,
    submitState,
    handleFlip,
    onSubmit,
  } = useSwapForm();

  if (tokensError) {
    return (
      <div className={styles.errorContainer}>
        Failed to load token prices: {tokensError}
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <h2 className={styles.title}>Swap</h2>
      <SwapField
        name='fromToken'
        control={control}
        label='From'
        tokens={tokens}
        disabledSymbol={toTokenSymbol}
        error={errors.fromToken?.message}
        amountProps={{
          disabled: isLoading,
          error: errors.fromAmount?.message,
          ...register('fromAmount', { valueAsNumber: true }),
        }}
      />
      <button
        type='button'
        className={styles.flipButton}
        onClick={handleFlip}
        aria-label='Flip tokens'
      >
        ⇅
      </button>
      <SwapField
        name='toToken'
        control={control}
        label='To'
        tokens={tokens}
        disabledSymbol={fromTokenSymbol}
        error={errors.toToken?.message}
        amountProps={{
          readOnly: true,
          value: toAmountTransferred > 0 ? toAmountTransferred.toFixed(6) : '0.0',
        }}
      />
      <button
        type='submit'
        className={styles.submitButton}
        disabled={isLoading || submitState.status === 'submitting'}
      >
        {submitState.status === 'submitting' ? 'Processing...' : 'Swap'}
      </button>
      {submitState.status === 'success' && (
        <p className={styles.successMessage} role='status'>
          {submitState.message}
        </p>
      )}
    </form>
  );
};
