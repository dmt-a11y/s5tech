import { Controller, type Control } from 'react-hook-form';
import type { SwapFormValues } from '../schema';
import type { Token } from '../types';
import { styles } from '../styles';
import { TokenSelect } from './TokenSelect';
import { AmountField, type AmountFieldProps } from './AmountField';

interface SwapFieldProps {
  name: 'fromToken' | 'toToken';
  control: Control<SwapFormValues>;
  label: string;
  tokens: Token[];
  disabledSymbol?: string;
  error?: string;
  amountProps: AmountFieldProps;
}

export const SwapField = ({
  name,
  control,
  label,
  tokens,
  disabledSymbol,
  error,
  amountProps,
}: SwapFieldProps) => {
  return (
    <div className={styles.field}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className={styles.fieldRow}>
            <TokenSelect
              label={label}
              tokens={tokens}
              value={field.value}
              onChange={field.onChange}
              disabledSymbol={disabledSymbol}
              error={error}
            />
            <AmountField {...amountProps} />
          </div>
        )}
      />
    </div>
  );
};
