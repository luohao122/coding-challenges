import { WalletBalance } from "../types/react-messy.types";

export function useWalletBalances(): WalletBalance[] {
  return [
    { blockchain: "Osmosis", currency: "OSMO", amount: 100 },
    { blockchain: "Ethereum", currency: "ETH", amount: 0.5 },
    { blockchain: "Arbitrum", currency: "ARB", amount: 10 },
    { blockchain: "Zilliqa", currency: "ZIL", amount: 5000 },
    { blockchain: "Neo", currency: "NEO", amount: 20 },
  ];
}
