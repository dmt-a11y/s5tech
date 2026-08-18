export interface TokenPrice {
  currency: string;
  date: string;
  price: number;
}

export interface Token {
  symbol: string;
  price: number;
  iconUrl: string;
}

export type TypeSubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; message: string };
