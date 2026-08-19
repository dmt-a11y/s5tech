import type { Token } from '../types';

export const exchangeTokens = (tokens: Token[], fromTokenSymbol: string) => {
  return tokens.find((token) => token.symbol === fromTokenSymbol);
};
