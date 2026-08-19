import type { BLOCKCHAINS } from "./constants";

export type TypeBlockchain = (typeof BLOCKCHAINS)[keyof typeof BLOCKCHAINS];

export interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: TypeBlockchain;
}
export interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

