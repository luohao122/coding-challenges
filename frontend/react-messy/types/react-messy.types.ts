import { ReactNode } from "react";

export interface BoxProps {}

export type BlockChainType =
  | "Osmosis"
  | "Ethereum"
  | "Arbitrum"
  | "Zilliqa"
  | "Neo";

export interface WalletBalance {
  blockchain: BlockChainType; // renamed key from 'currency' to 'blockchain', if that's what's intended
  currency: string;
  amount: number;
}

export interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

export interface Props extends BoxProps {
  // Additional props if needed
  children: ReactNode;
}
