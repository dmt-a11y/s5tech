import { TOKEN_ICON_BASE_URL } from '../constants';
import type { Token, TokenPrice } from '../types';

// prices.json has duplicate/stale entries per currency; keep only the
// latest quote per symbol and drop non-positive prices (unusable for swap math).
export const processTokenPrices = (prices: TokenPrice[]): Token[] => {
  const latestByCurrency = new Map<string, TokenPrice>();

  for (const entry of prices) {
    if (!(entry.price > 0)) continue;

    const existing = latestByCurrency.get(entry.currency);
    if (!existing || new Date(entry.date) > new Date(existing.date)) {
      latestByCurrency.set(entry.currency, entry);
    }
  }

  return Array.from(latestByCurrency.values())
    .map((entry) => ({
      symbol: entry.currency,
      price: entry.price,
      iconUrl: `${TOKEN_ICON_BASE_URL}/${entry.currency}.svg`,
    }))
    .sort((a, b) => a.symbol.localeCompare(b.symbol));
};
