import React, { useMemo } from "react";

import { BlockChainType, FormattedWalletBalance, Props } from "./types/react-messy.types"; // added import for mocked BoxProps interface
import { useWalletBalances } from "./hooks/useWalletBalances";
import { usePrices } from "./hooks/usePrices";

import WalletRow from './wallet-row'
import classes from './react-messy.module.css'

const getPriority = (blockchain: BlockChainType): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
    case "Neo":
      return 20;
    default:
      return -99;
  }
};

export const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props;

  const balances = useWalletBalances(); // Suppose this returns WalletBalance[]
  const prices = usePrices(); // Suppose this returns Record<string, number>

  /**
   * Memoized array of sorted, formatted balances.
   * Example filtering logic: only show recognized blockchains (priority > -99) with amount > 0.
   */
  const sortedAndFormattedBalances = useMemo(() => {
    // 1) Filter for only blockchains (priority > -99) with amount > 0.
    const filtered = balances.filter((b) => {
      const priority = getPriority(b.blockchain);
      return priority > -99 && b.amount > 0;
    });

    // 2) Sort by either descending or ascending order using .sort(a, b)
    const sorted = filtered.sort((lhs, rhs) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);

      // Descending priority (higher first)
      if (leftPriority > rightPriority) return -1;
      if (leftPriority < rightPriority) return 1;
      return 0; 
    });

    // 3) Format
    return sorted.map((balance) => ({
      ...balance,
      formatted: balance.amount.toFixed(),
    }));
  }, [balances]); // Only re-run if `balances` changes, remove used prices dependency

  // Map to rows
  const rows = sortedAndFormattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = (prices[balance.currency] ?? 0) * balance.amount; // render 0 to avoid NaN issue
      return (
        <WalletRow
          key={index}
          className={classes.row}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return (
    <div {...rest}>
      {rows}
    </div>
  );
};
