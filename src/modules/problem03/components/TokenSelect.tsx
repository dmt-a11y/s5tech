import type { Token } from '../types';
import { styles } from '../styles';
import { useTokenSelect } from '../hooks/useTokenSelect';
import { TokenSelectTrigger } from './TokenSelectTrigger';
import { TokenOptionList } from './TokenOptionList';

interface TokenSelectProps {
  label: string;
  tokens: Token[];
  value: string;
  onChange: (symbol: string) => void;
  disabledSymbol?: string;
  error?: string;
}

export const TokenSelect = ({
  label,
  tokens,
  value,
  onChange,
  disabledSymbol,
  error,
}: TokenSelectProps) => {
  const {
    isOpen,
    query,
    setQuery,
    containerRef,
    selectedToken,
    filteredTokens,
    toggleOpen,
    handleSelect,
  } = useTokenSelect({ tokens, value, onChange });

  return (
    <div className={styles.tokenSelectRoot} ref={containerRef}>
      <span className={styles.tokenSelectLabel}>{label}</span>
      <TokenSelectTrigger
        selectedToken={selectedToken}
        isOpen={isOpen}
        onClick={toggleOpen}
      />
      {isOpen && (
        <div className={styles.tokenSelectPanel}>
          <input
            type="text"
            className={styles.tokenSelectSearch}
            placeholder="Search token..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoFocus
          />
          <TokenOptionList
            tokens={filteredTokens}
            value={value}
            disabledSymbol={disabledSymbol}
            onSelect={handleSelect}
          />
        </div>
      )}
      {error && <span className={styles.tokenSelectError}>{error}</span>}
    </div>
  );
};
