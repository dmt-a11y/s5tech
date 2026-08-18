import { useState } from 'react';
import { styles } from '../styles';

interface TokenIconProps {
  symbol: string;
  iconUrl: string;
  size?: number;
}

export const TokenIcon = ({ symbol, iconUrl, size = 24 }: TokenIconProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <span
        className={styles.tokenIconFallback}
        style={{ width: size, height: size, fontSize: size * 0.5 }}
        aria-hidden="true"
      >
        {symbol.slice(0, 1)}
      </span>
    );
  }

  return (
    <img
      className={styles.tokenIcon}
      src={iconUrl}
      alt={symbol}
      width={size}
      height={size}
      onError={() => setHasError(true)}
    />
  );
};
