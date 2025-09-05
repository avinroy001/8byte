import express from "express";
import cors from "cors";
import yahooFinance from "yahoo-finance2";

const app = express();
app.use(cors());

app.get("/api/stocks/:symbol", async (req, res) => {
  const { symbol } = req.params;

  try {
    const data = await yahooFinance.quoteSummary(symbol, {
      modules: ["price", "summaryDetail", "defaultKeyStatistics", "earnings"],
    });

    res.json({
      cmp: data?.price?.regularMarketPrice || null,
      peRatio:
        data?.summaryDetail?.trailingPE ||
        data?.defaultKeyStatistics?.forwardPE ||
        "N/A",
      latestEarnings:
        data?.earnings?.earningsChart?.quarterly?.[0]?.date || "N/A",
    });
  } catch (err) {
    console.error("Error fetching data for", symbol, err);
    res.status(500).json({ error: "Failed to fetch stock data", cmp: null, peRatio: "N/A", latestEarnings: "N/A" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});