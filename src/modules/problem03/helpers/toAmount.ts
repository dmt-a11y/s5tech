import type { Token } from '../types';

export const toAmount = ({
  fromToken,
  toToken,
  fromAmount,
}: {
  fromToken: Token | undefined;
  toToken: Token | undefined;
  fromAmount: number;
}) => {
  if (!fromToken || !toToken || !fromAmount || fromAmount <= 0) return 0;
  return (fromAmount * fromToken.price) / toToken.price;
};
