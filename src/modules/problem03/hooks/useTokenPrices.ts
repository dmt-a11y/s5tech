import { useEffect, useState } from 'react';
import { PRICES_URL } from '../constants';
import { processTokenPrices } from '../helpers/processTokenPrices';
import type { Token, TokenPrice } from '../types';

interface UseTokenPricesResult {
  tokens: Token[];
  isLoading: boolean;
  error: string | null;
}

export const useTokenPrices = (): UseTokenPricesResult => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchPrices = async () => {
      try {
        const response = await fetch(PRICES_URL);
        if (!response.ok) {
          throw new Error(`Failed to load token prices (${response.status})`);
        }
        const data: TokenPrice[] = await response.json();
        if (!isCancelled) {
          setTokens(processTokenPrices(data));
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load token prices');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchPrices();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { tokens, isLoading, error };
};
