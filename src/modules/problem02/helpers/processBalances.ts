import { LEAST_PRIORITY } from '../constants';
import type { WalletBalance } from '../types';
import { getPriority } from './getPriority';

export const processBalances = (balances: WalletBalance[]): WalletBalance[] => {
  return balances
    .filter((balance) => {
      const balancePriority = getPriority(balance.blockchain);
      return balancePriority > LEAST_PRIORITY && balance.amount > 0;
    })
    .sort(
      (lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain),
    );
};
