import React, { FC } from "react";

import { WalletRowProps } from "./types/wallet-row.types";

const WalletRow: FC<WalletRowProps> = ({ className, amount, usdValue, formattedAmount }) => {
  return (
    <div className={className}>
      <div>Amount: {formattedAmount}</div>
      <div>USD Value: {usdValue.toFixed(2)}</div>
      <div>Raw Amount: {amount}</div>
    </div>
  );
};

export default WalletRow