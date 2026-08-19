import { useEffect, useState } from 'react';

export const usePrices = () => {
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('/api/prices');
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        // toast.error('Error fetching prices:', error);
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
  }, []);

  return prices;
};
