import { useEffect, useMemo, useRef, useState } from 'react';
import type { Token } from '../types';

interface UseTokenSelectParams {
  tokens: Token[];
  value: string;
  onChange: (symbol: string) => void;
}

export const useTokenSelect = ({ tokens, value, onChange }: UseTokenSelectParams) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedToken = tokens.find((token) => token.symbol === value);

  const filteredTokens = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return tokens;
    return tokens.filter((token) =>
      token.symbol.toLowerCase().includes(normalizedQuery),
    );
  }, [tokens, query]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleSelect = (symbol: string) => {
    onChange(symbol);
    setIsOpen(false);
    setQuery('');
  };

  return {
    isOpen,
    query,
    setQuery,
    containerRef,
    selectedToken,
    filteredTokens,
    toggleOpen,
    handleSelect,
  };
};
