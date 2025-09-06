📊 Dynamic Portfolio Dashboard
A real-time stock portfolio tracker built with React, TypeScript, and Node.js that displays live market data from Yahoo Finance — including CMP, P/E Ratio, Gain/Loss, and Portfolio Allocation.

👉 Live App: https://8byte-pi.vercel.app
📘 Source Code: https://github.com/avinroy001/8byte

 ✨ Features
Live Market Data: Fetches current price (CMP), P/E ratio, earnings date, and more from Yahoo Finance
Real-Time Updates: Auto-refreshes every 15 seconds to keep your portfolio up to date
Add & Remove Stocks: Dynamically manage your investments
Smart Calculations:
Investment = Purchase Price × Quantity
Present Value = CMP × Quantity
Gain/Loss = Present Value − Investment
Portfolio % = (Investment / Total Investment) × 100
 Persistent Storage: Saves your portfolio to localStorage (survives page reloads)
Responsive Design: Works seamlessly on desktop and mobile
Error Resilience: Graceful fallbacks if data fails to load
Total Summary: Shows overall investment, value, and P&L at the bottom

 🚀 Technologies Used
Frontend: React, TypeScript, Tailwind CSS
State Management: React Context API
Backend: Node.js, Express, yahoo-finance2
Data Source: Yahoo Finance (via unofficial API)
Hosting:
Frontend: Vercel → https://8byte-pi.vercel.app
Backend: Render or Vercel Serverless Functions (in progress)
 Deployment: GitHub Actions, CI/CD

 📦 Getting Started

Prerequisites

Node.js (v16 or higher)
npm
Git
 Installation

Clone the repository
git clone https://github.com/avinroy001/8byte.git
cd 8byte
Install frontend dependencies
npm install
Set up the backend
The backend is currently in the same repo. Navigate to it:
cd backend
npm install


 🔧 Running the Application

Development Mode

Start the backend server
cd backend
npm run start
Backend runs on http://localhost:4000

Start the frontend
cd ..
npm start
Frontend runs on http://localhost:3000

Open your browser
 

1
http://localhost:3000
 🌐 Production Deployment

Frontend

Deployed on Vercel:
👉 https://8byte-pi.vercel.app

Backend

Currently uses a local or Render-hosted Express server.
To work in production, the backend must be:

Deployed separately (e.g., Render), or
Converted to Vercel Serverless Functions 


 🔌 API Endpoints

GET /api/stocks/:symbol

Fetches live stock data from Yahoo Finance.

Example Request



1
GET /api/stocks/AAPL
Example Response

json
{
  "cmp": 224.93,
  "peRatio": 34.08,
  "latestEarnings": "Oct 30, 2025"
}
⚠️ Note: This uses yahoo-finance2, an unofficial library, because: 

"API-level access to Yahoo Finance quotes data has been disabled."
— Yahoo Finance API Feedback 

 We scrape Yahoo Finance responsibly and include fallbacks for reliability.

 📈 Supported Stock Symbols

Use full Yahoo Finance symbols with .NS (NSE) or no suffix (US stocks):

TCS	
TCS.NS
HDFC Bank	
HDFCBANK.NS
Reliance	
RELIANCE.NS
Infosys	
INFY.NS
ICICI Bank	
ICICIBANK.NS
Suzlon Energy	
SUZLON.NS
(not SUZ.NS)
Apple	
AAPL
Google	
GOOGL
 
 🔍 Tip: Verify symbols at finance.yahoo.com

Example: Apple (AAPL) Data

From Yahoo Finance :

Current Price	
~$224.93
P/E Ratio (TTM)	
34.08
EPS (TTM)	
$6.60
Earnings Date	
Oct 30, 2025
Market Cap	
$3.35T
52 Week Range	
$169.21 - $260.10

 🛠 Development Notes

Yahoo Finance API Limitations

As of 2025, Yahoo has disabled official API access for quote data. Our solution:

Uses yahoo-finance2 to scrape Yahoo Finance pages
Handles cookies and security crumbs automatically
Includes retry logic and fallback values
Suppresses non-critical notices
 ts


1
yahooFinance.suppressNotices(['yahooSurvey']);
This method is fragile and may break if Yahoo changes their site structure.

 📂 Project Structure
8byte/
├── public/
├── src/
│   ├── components/
│   │   ├── PortfolioTable.tsx
│   │   └── AddStockForm.tsx
│   ├── context/
│   │   └── PortfolioContext.tsx
│   ├── types/
│   │   └── portfolio.ts
│   └── App.tsx
├── backend/
│   └── index.ts
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
 

We'd love your feedback! Please open an issue or PR on GitHub.

"I built a real-time stock portfolio tracker with live CMP, P/E ratio, and gain/loss tracking.
Deployed on Vercel: https://8byte-pi.vercel.app 📊
GitHub: https://github.com/avinroy001/8byte " 