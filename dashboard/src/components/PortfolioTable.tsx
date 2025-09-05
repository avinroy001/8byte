import React, { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";

const PortfolioTable: React.FC = () => {
  const { stocks, loading, error, removeStock } = useContext(PortfolioContext);

  const totalInvestment = stocks.reduce((acc, s) => acc + s.investment, 0);
  const totalValue = stocks.reduce((acc, s) => acc + s.presentValue, 0);
  const totalGainLoss = totalValue - totalInvestment;

  if (loading) return <p className="text-center py-4">Loading portfolio data...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (stocks.length === 0) return <p className="text-center py-4">No stocks in portfolio.</p>;

  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="min-w-full border rounded-lg divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Action</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Purchase Price</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Investment</th>
            <th className="p-2">Portfolio %</th>
            <th className="p-2">CMP</th>
            <th className="p-2">Present Value</th>
            <th className="p-2">Gain/Loss</th>
            <th className="p-2">P/E Ratio</th>
            <th className="p-2">Latest Earnings</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((s) => (
            <tr key={s.id} className="text-center border-b hover:bg-gray-50">
              <td className="p-2">
                <button
                  onClick={() => removeStock(s.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-bold"
                >
                  ✕
                </button>
              </td>
              <td className="p-2 font-medium">{s.name}</td>
              <td className="p-2">{s.purchasePrice.toFixed(2)}</td>
              <td className="p-2">{s.quantity}</td>
              <td className="p-2 font-semibold">{s.investment.toFixed(2)}</td>
              <td className="p-2">{s.portfolioPercent.toFixed(2)}%</td>
              <td className="p-2">{s.cmp ? s.cmp.toFixed(2) : "N/A"}</td>
              <td className="p-2 font-semibold">{s.presentValue.toFixed(2)}</td>
              <td className={`font-bold ${s.gainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                {s.gainLoss.toFixed(2)}
              </td>
              <td className="p-2">{s.peRatio || "N/A"}</td>
              <td className="p-2">{s.latestEarnings || "N/A"}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-bold bg-gray-50">
            <td colSpan={4} className="p-2 text-right">Total:</td>
            <td className="p-2">{totalInvestment.toFixed(2)}</td>
            <td className="p-2">100%</td>
            <td></td>
            <td className="p-2">{totalValue.toFixed(2)}</td>
            <td className={totalGainLoss >= 0 ? "text-green-600" : "text-red-600"}>
              {totalGainLoss.toFixed(2)}
            </td>
            <td colSpan={2}></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PortfolioTable;