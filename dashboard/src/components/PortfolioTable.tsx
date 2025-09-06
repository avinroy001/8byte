import React, { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";

const PortfolioTable: React.FC = () => {
  const { stocks, loading, error, removeStock } = useContext(PortfolioContext);

  // Group by sector
  const grouped = stocks.reduce((acc, stock) => {
    const sector = stock.sector;
    if (!acc[sector]) acc[sector] = [];
    acc[sector].push(stock);
    return acc;
  }, {} as Record<string, any[]>);

  const totalInvestment = stocks.reduce((acc, s) => acc + s.investment, 0);
  const totalValue = stocks.reduce((acc, s) => acc + s.presentValue, 0);
  const totalGainLoss = totalValue - totalInvestment;

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="overflow-x-auto shadow rounded-lg">
      {Object.entries(grouped).map(([sector, stocksInSector]) => {
        const inv = stocksInSector.reduce((acc, s) => acc + s.investment, 0);
        const val = stocksInSector.reduce((acc, s) => acc + s.presentValue, 0);
        const gl = val - inv;

        return (
          <div key={sector} className="mb-6">
            <h3 className="text-lg font-bold bg-gray-100 p-3 rounded-t-lg">
              {sector} ({stocksInSector.length} stocks)
            </h3>
            <table className="min-w-full border border-t-0 rounded-b-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2">Action</th>
                  <th className="p-2">Stock</th>
                  <th className="p-2">Purchase</th>
                  <th>Qty</th>
                  <th>Investment</th>
                  <th>%</th>
                  <th>CMP</th>
                  <th>Value</th>
                  <th>Gain/Loss</th>
                  <th>P/E</th>
                  <th>Earnings</th>
                </tr>
              </thead>
              <tbody>
                {stocksInSector.map((s) => (
                  <tr key={s.id} className="text-center border-b hover:bg-gray-50">
                    <td className="p-2">
                      <button onClick={() => removeStock(s.id)} className="text-red-600">✕</button>
                    </td>
                    <td className="p-2 font-medium">{s.name}</td>
                    <td>{s.purchasePrice.toFixed(2)}</td>
                    <td>{s.quantity}</td>
                    <td>{s.investment.toFixed(2)}</td>
                    <td>{((s.investment / totalInvestment) * 100).toFixed(2)}%</td>
                    <td>{s.cmp?.toFixed(2)}</td>
                    <td>{s.presentValue.toFixed(2)}</td>
                    <td className={s.gainLoss >= 0 ? "text-green-600" : "text-red-600"}>
                      {s.gainLoss.toFixed(2)}
                    </td>
                    <td>{s.peRatio}</td>
                    <td>{s.latestEarnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Sector Summary */}
            <div className="bg-gray-100 p-3 text-sm font-semibold">
              <strong>{sector} Total:</strong> Invested: ₹{inv.toFixed(2)} | 
              Value: ₹{val.toFixed(2)} | 
              <span className={gl >= 0 ? "text-green-600" : "text-red-600"}>
                {" "}Gain/Loss: ₹{gl.toFixed(2)}
              </span>
            </div>
          </div>
        );
      })}

      {/* Overall Summary */}
      <div className="mt-6 bg-gray-200 p-4 font-bold rounded">
        <strong>Overall Total:</strong> Invested: ₹{totalInvestment.toFixed(2)} | 
        Value: ₹{totalValue.toFixed(2)} | 
        <span className={totalGainLoss >= 0 ? "text-green-600" : "text-red-600"}>
          {" "}Gain/Loss: ₹{totalGainLoss.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default PortfolioTable;