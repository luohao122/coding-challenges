export interface TokenPrice {
  currency: string;
  date: string;
  price: number;
}

export interface SwapRecord {
  fromCurrency: string
  toCurrency: string
  fromAmount: number
  toAmount: number
}
