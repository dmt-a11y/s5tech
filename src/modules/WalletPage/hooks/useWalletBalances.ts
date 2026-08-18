import { useEffect, useState } from 'react';
import type { WalletBalance } from '../types';
import { processBalances } from '../helpers/processBalances';

export const useWalletBalances = () => {
  const [balances, setBalances] = useState<WalletBalance[]>([]);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const response = await fetch('/api/wallet/balances');
        const data = await response.json();
        setBalances(data);
      } catch (error) {
        // toast.error('Error fetching wallet balances:', error);
        console.error('Error fetching wallet balances:', error);
      }
    };

    fetchBalances();
  }, []);

  return processBalances(balances);
};
