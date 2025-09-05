// src/context/PortfolioContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import type { Stock, StockWithComputed } from "../types/portfolio";

interface PortfolioContextType {
  stocks: StockWithComputed[];
  refreshData: () => void;
  addStock: (stock: Omit<Stock, "id">) => void;
  removeStock: (id: string) => void;
  loading: boolean;
  error: string | null;
}

export const PortfolioContext = createContext<PortfolioContextType>({
  stocks: [],
  refreshData: () => {},
  addStock: () => {},
  removeStock: () => {},
  loading: false,
  error: null,
});

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stocks, setStocks] = useState<StockWithComputed[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load initial portfolio from localStorage or default
  const getInitialStocks = (): Stock[] => {
    const saved = localStorage.getItem("portfolio_stocks");
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: "1", name: "TCS", sector: "IT", purchasePrice: 3500, quantity: 5, nseBseCode: "TCS" },
      { id: "2", name: "HDFC Bank", sector: "Financials", purchasePrice: 1500, quantity: 10, nseBseCode: "HDFCBANK" },
      { id: "3", name: "Reliance", sector: "Energy", purchasePrice: 2500, quantity: 8, nseBseCode: "RELIANCE" },
      { id: "4", name: "Infosys", sector: "IT", purchasePrice: 1600, quantity: 12, nseBseCode: "INFY" },
      { id: "5", name: "ICICI Bank", sector: "Financials", purchasePrice: 1000, quantity: 15, nseBseCode: "ICICIBANK" },
    ];
  };

  const saveToStorage = (stocksList: Stock[]) => {
    const saveList = stocksList.map(({ id, name, sector, purchasePrice, quantity, nseBseCode }) => ({
      id,
      name,
      sector,
      purchasePrice,
      quantity,
      nseBseCode,
    }));
    localStorage.setItem("portfolio_stocks", JSON.stringify(saveList));
  };

  // Fetch live data for a stock
  const fetchStockData = async (s: Stock): Promise<StockWithComputed> => {
    try {
      const res = await fetch(`http://localhost:4000/api/stocks/${s.nseBseCode}.NS`).then(r => r.json());
      const cmp = res.cmp || s.purchasePrice;
      const investment = s.purchasePrice * s.quantity;
      const presentValue = cmp * s.quantity;
      return {
        ...s,
        cmp,
        peRatio: res.peRatio || "N/A",
        latestEarnings: res.latestEarnings || "N/A",
        investment,
        presentValue,
        gainLoss: presentValue - investment,
        portfolioPercent: 0,
      };
    } catch {
      return {
        ...s,
        cmp: s.purchasePrice,
        peRatio: "N/A",
        latestEarnings: "N/A",
        investment: s.purchasePrice * s.quantity,
        presentValue: s.purchasePrice * s.quantity,
        gainLoss: 0,
        portfolioPercent: 0,
      };
    }
  };

  // Load or refresh data for all stocks
  const loadPortfolio = async () => {
    setLoading(true);
    setError(null);

    try {
      const storedStocks = getInitialStocks();
      const withData: StockWithComputed[] = await Promise.all(
        storedStocks.map(fetchStockData)
      );

      const totalInvestment = withData.reduce((acc, s) => acc + s.investment, 0);
      withData.forEach(s => {
        s.portfolioPercent = totalInvestment > 0 ? (s.investment / totalInvestment) * 100 : 0;
      });

      setStocks(withData);
    } catch (err) {
      setError("Failed to load data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new stock
  const addStock = (stock: Omit<Stock, "id">) => {
    const newStock: Stock = {
      ...stock,
      id: Date.now().toString(),
    };

    // Save to localStorage
    const current = getInitialStocks();
    const updated = [...current, newStock];
    saveToStorage(updated);

    // Trigger refresh to load live data
    loadPortfolio(); // Re-fetch all with live data
  };

  // Remove a stock
  const removeStock = (id: string) => {
    const current = getInitialStocks();
    const updated = current.filter(s => s.id !== id);
    saveToStorage(updated);
    loadPortfolio(); // Refresh
  };

  // Initial load
  useEffect(() => {
    loadPortfolio();
    const interval = setInterval(loadPortfolio, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PortfolioContext.Provider value={{ stocks, refreshData: loadPortfolio, addStock, removeStock, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};