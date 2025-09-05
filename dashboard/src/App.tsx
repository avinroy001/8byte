import React from "react";
import PortfolioTable from "./components/PortfolioTable";
import AddStockForm from "./components/AddStockForm";
import { PortfolioProvider } from "./context/PortfolioContext";

const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <main className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">📊 Dynamic Portfolio Dashboard</h1>
        <AddStockForm />
        <PortfolioTable />
      </main>
    </PortfolioProvider>
  );
};

export default App;