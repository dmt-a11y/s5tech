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
