import type { Token } from '../types';
import { styles } from '../styles';
import { TokenIcon } from './TokenIcon';

interface TokenSelectTriggerProps {
  selectedToken?: Token;
  isOpen: boolean;
  onClick: () => void;
}

export const TokenSelectTrigger = ({
  selectedToken,
  isOpen,
  onClick,
}: TokenSelectTriggerProps) => {
  return (
    <button
      type="button"
      className={styles.tokenSelectTrigger}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
    >
      {selectedToken ? (
        <>
          <TokenIcon symbol={selectedToken.symbol} iconUrl={selectedToken.iconUrl} />
          <span>{selectedToken.symbol}</span>
        </>
      ) : (
        <span className={styles.tokenSelectPlaceholder}>Select token</span>
      )}
      <span className={styles.tokenSelectChevron} aria-hidden="true">
        ▾
      </span>
    </button>
  );
};
