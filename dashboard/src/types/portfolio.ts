export interface Stock {
  id: string;
  name: string;
  sector: string;
  purchasePrice: number;
  quantity: number;
  nseBseCode: string; 
}

export interface StockWithComputed extends Stock {
  cmp?: number;
  peRatio?: number | "N/A";
  latestEarnings?: string;
  investment: number;
  portfolioPercent: number;
  presentValue: number;
  gainLoss: number;
}