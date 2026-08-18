import type { Token } from '../types';
import { styles } from '../styles';
import { TokenIcon } from './TokenIcon';

interface TokenOptionListProps {
  tokens: Token[];
  value: string;
  disabledSymbol?: string;
  onSelect: (symbol: string) => void;
}

export const TokenOptionList = ({
  tokens,
  value,
  disabledSymbol,
  onSelect,
}: TokenOptionListProps) => {
  return (
    <ul className={styles.tokenSelectList} role="listbox">
      {tokens.length === 0 && (
        <li className={styles.tokenSelectEmpty}>No tokens found</li>
      )}
      {tokens.map((token) => (
        <li key={token.symbol}>
          <button
            type="button"
            className={styles.tokenSelectOption}
            disabled={token.symbol === disabledSymbol}
            onClick={() => onSelect(token.symbol)}
            aria-selected={token.symbol === value}
          >
            <TokenIcon symbol={token.symbol} iconUrl={token.iconUrl} />
            <span className={styles.tokenSelectOptionSymbol}>{token.symbol}</span>
            <span className={styles.tokenSelectOptionPrice}>
              ${token.price.toFixed(2)}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};
