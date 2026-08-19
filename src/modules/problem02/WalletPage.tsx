import type { ComponentPropsWithoutRef } from 'react';
import { useWalletBalances } from './hooks/useWalletBalances';
import { usePrices } from './hooks/usePrices';
import { WalletRow } from './components/WalletRow';

export interface WalletPageProps extends ComponentPropsWithoutRef<'div'> {}

export const WalletPage = ({ ...rest }: WalletPageProps) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  return (
    <div {...rest}>
      {balances.map((balance) => (
        <WalletRow
          key={`${balance.blockchain}-${balance.currency}`}
          amount={balance.amount}
          price={prices[balance.currency] ?? 0}
        />
      ))}
    </div>
  );
};
