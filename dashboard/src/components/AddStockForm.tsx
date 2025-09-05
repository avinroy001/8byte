import React, { useState, useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";

const AddStockForm: React.FC = () => {
  const { addStock } = useContext(PortfolioContext);
  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [nseBseCode, setNseBseCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !nseBseCode || !purchasePrice || !quantity) return;

    addStock({
      name,
      sector,
      purchasePrice: parseFloat(purchasePrice),
      quantity: parseInt(quantity, 10),
      nseBseCode,
    });


    setName("");
    setSector("");
    setPurchasePrice("");
    setQuantity("");
    setNseBseCode("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-white shadow">
      <h3 className="text-lg font-bold mb-3 text-gray-800">Add New Stock</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Stock Name (e.g., TCS)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="NSE Code (e.g., TCS)"
          value={nseBseCode}
          onChange={(e) => setNseBseCode(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Purchase Price"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
          className="p-2 border rounded"
          step="0.01"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Sector (e.g., IT)"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded transition"
      >
        Add Stock
      </button>
    </form>
  );
};

export default AddStockForm;