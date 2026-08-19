import type { ComponentPropsWithoutRef } from 'react';
import { styles } from '../styles';

export interface AmountFieldProps extends Omit<
  ComponentPropsWithoutRef<'input'>,
  'value'
> {
  readOnly?: boolean;
  value?: string;
  error?: string;
}

export const AmountField = ({
  readOnly,
  value,
  error,
  ...inputProps
}: AmountFieldProps) => {
  if (readOnly) {
    return <div className={styles.amountOutput}>{value}</div>;
  }

  return (
    <div className={styles.amountInputWrapper}>
      <input
        type='number'
        step='any'
        inputMode='decimal'
        placeholder='0.0'
        className={styles.amountInput}
        {...inputProps}
      />
    </div>
  );
};
