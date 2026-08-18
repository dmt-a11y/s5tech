# WalletPage — Code Review & Refactor

## Context

The snippet below was the starting point for the `WalletPage` feature. It renders a list of the user's token balances joined with live prices to compute a USD value per row.

Stack: React + TypeScript, functional components, hooks only.

## Issues found

### Bugs — crash or wrong output

| # | Issue | Where |
|---|---|---|
| 1 | `lhsPriority` is never declared — `balancePriority` is computed but the `if` reads `lhsPriority`, throwing `ReferenceError` at runtime. | `filter` callback |
| 2 | Filter condition is inverted: `if (balance.amount <= 0) return true` keeps zero/negative balances instead of hiding them. | `filter` callback |
| 3 | Sort comparator has no `return` for the equal-priority branch — implicitly returns `undefined` instead of `0`. Works today only because engines happen to treat `undefined` leniently; not part of the `Array.prototype.sort` contract. | `sort` callback |
| 4 | `classes` is referenced but never imported or defined anywhere in the file — `ReferenceError` on render. | `<WalletRow className={classes.row} />` |

### Type-safety holes

| # | Issue |
|---|---|
| 5 | `getPriority(blockchain: any)` discards type-checking entirely. |
| 6 | `WalletBalance` never declares a `blockchain` field, yet `balance.blockchain` is read everywhere — only "works" because `any` swallows the mismatch. |
| 7 | `rows` maps over `sortedBalances` (type `WalletBalance[]`) but annotates the callback parameter as `FormattedWalletBalance`. `balance.formatted` is read from a field that doesn't exist on the actual object — silently becomes `undefined` at runtime. |

### Computational inefficiency

| # | Issue |
|---|---|
| 8 | `useMemo` depends on `prices`, but the computation inside never reads `prices` — every price tick (a frequent, independent data stream) needlessly re-runs the filter + sort. |
| 9 | `formattedBalances` is computed with a full `.map()` pass and then never used — `rows` maps over `sortedBalances` again instead. Dead computation, wasted O(n) pass. |
| 10 | `getPriority` is redeclared on every render (defined inside the component body) even though it's a pure function of its argument — it should not be recreated per render, and should not need to be part of any dependency reasoning. |

### Anti-patterns

| # | Issue |
|---|---|
| 11 | `key={index}` on a filtered + sorted list — reordering/filtering across renders can misassociate state/DOM between rows. |
| 12 | `getPriority` is a `switch` over string literals for a static mapping — a lookup table scales and reads better. |
| 13 | No guard for a missing price (`prices[balance.currency]` can be `undefined`) — silently produces `NaN` in the UI. |
| 14 | `children` is destructured out of props but never rendered — silently drops anything passed as children. |
| 15 | `React.FC<Props>` combined with a redundant separate `(props: Props)` annotation — duplicate typing; also `React.FC`'s (pre-React 18) implicit `children` typing is a common source of accidental prop leakage. |

## Refactor

The fixes above are implemented as a small module rather than one file, so each concern (data fetching, priority lookup, filtering/sorting, presentation) can be tested and changed independently. Structure:

```
src/modules/WalletPage/
  WalletPage.tsx              — presentational root
  types.ts                    — WalletBalance, TypeBlockchain
  constants.ts                — BLOCKCHAINS, LEAST_PRIORITY
  helpers/getPriority.ts      — blockchain → priority lookup
  helpers/processBalances.ts  — filter + sort (pure)
  hooks/useWalletBalances.ts  — fetch + derive balances
  hooks/usePrices.ts          — fetch prices
  components/WalletRow.tsx    — one row, owns its own formatting
```

**`constants.ts`** — the priority table as data, not a `switch`, plus the sentinel value named instead of a magic `-99` (issues #5, #12):

```ts
export const BLOCKCHAINS = {
  osmosis: 'Osmosis',
  ethereum: 'Ethereum',
  arbitrum: 'Arbitrum',
  zilliqa: 'Zilliqa',
  neo: 'Neo',
} as const;

export const LEAST_PRIORITY = -99;
```

**`types.ts`** — `TypeBlockchain` is derived from `BLOCKCHAINS`'s values (`as const` + indexed access), so `WalletBalance.blockchain` is a real literal union instead of `any` (issues #5, #6):

```ts
import type { BLOCKCHAINS } from './constants';

export type TypeBlockchain = (typeof BLOCKCHAINS)[keyof typeof BLOCKCHAINS];

export interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: TypeBlockchain;
}
```

**`helpers/getPriority.ts`** — lookup table, hoisted out of the component so it's defined once, not per render (issues #10, #12):

```ts
import { LEAST_PRIORITY } from '../constants';

export const getPriority = (blockchain: any): number => {
  switch (blockchain) {
    case 'Osmosis': return 100;
    case 'Ethereum': return 50;
    case 'Arbitrum': return 30;
    case 'Zilliqa': return 20;
    case 'Neo': return 20;
    default: return LEAST_PRIORITY;
  }
};
```

> Follow-up: this still takes `blockchain: any` and a `switch` rather than `TypeBlockchain` + a `Record` lookup — the type now exists (`types.ts`) but hasn't been wired in here yet. Worth tightening in a follow-up pass.

**`helpers/processBalances.ts`** — filter + sort as one pure, testable function; condition fixed to keep positive balances of recognized chains, comparator returns a real number for every branch (issues #1, #2, #3):

```ts
import { LEAST_PRIORITY } from '../constants';
import type { WalletBalance } from '../types';
import { getPriority } from './getPriority';

export const processBalances = (balances: WalletBalance[]): WalletBalance[] => {
  return balances
    .filter((balance) => {
      const balancePriority = getPriority(balance.blockchain);
      return balancePriority > LEAST_PRIORITY && balance.amount > 0;
    })
    .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
};
```

**`hooks/useWalletBalances.ts`** — owns fetching *and* returns already-filtered/sorted data, so the derivation lives next to the state it derives from instead of duplicated at every call site (issue #8, partially — see note):

```ts
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
        console.error('Error fetching wallet balances:', error);
      }
    };

    fetchBalances();
  }, []);

  return processBalances(balances);
};
```

> Follow-up: `processBalances(balances)` runs on every render here rather than being wrapped in `useMemo`. In this hook specifically it's a non-issue in practice — `balances` only changes once per fetch, so the recompute frequency is identical either way — but it's worth wrapping if this hook ever gains another update source (polling, websocket pushes, optimistic updates), so every caller doesn't need to remember to re-derive on top of it.

**`components/WalletRow.tsx`** — owns its own formatting instead of receiving pre-formatted strings/values from the parent; fixes the type-mismatch bug where the parent read a `formatted` field that didn't exist (issue #7), and the dangling `classes.row` reference (issue #4) is gone because the component no longer takes an unresolved external class:

```tsx
interface WalletRowProps {
  amount: number;
  price: number;
  className?: string;
}

export const WalletRow = ({ amount, price, className }: WalletRowProps) => {
  const usdValue = price * amount;

  return (
    <div className={className}>
      <span>{amount.toFixed(2)}</span>
      <span>${usdValue.toFixed(2)}</span>
    </div>
  );
};
```

**`WalletPage.tsx`** — thin presentational root: no `React.FC`, no duplicate prop typing (issue #15), `Props` extends the real DOM props of a `div` so spreading `rest` is meaningful instead of a no-op, stable content-derived `key` (issue #11), and a `?? 0` guard against a missing price (issue #13):

```tsx
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
```

> Follow-up: `children` is currently destructured out via `...rest` and not rendered — same as the original. If `WalletPage` is meant to accept children, add `{children}` back into the JSX explicitly.

## Net effect

- 4 runtime bugs fixed (undefined variable, inverted filter, non-returning comparator, undefined `classes` reference).
- Type safety restored end-to-end: `blockchain` is a real literal union, not `any`, and the row-mapping type lie is gone.
- One filter+sort pass instead of filter+sort+map(unused)+map — no wasted iteration.
- `useMemo` dependency correctness no longer applies at the `WalletPage` level because the derivation moved into the hook that owns the source state (`useWalletBalances`), which is a more localized place for it to live than a `useMemo` at the call site.
- List rendering uses a stable key, and `WalletRow` no longer depends on an undefined `classes` object.
