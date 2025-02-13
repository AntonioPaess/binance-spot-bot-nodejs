# Binance Spot Bot Node.js

An automated trading bot for Binance Spot, built with Node.js.
This project enables automated buying and selling operations on Binance using the exchange's official API.

## 📌 Overview

The **Binance Spot Bot Node.js** implements a Simple Moving Average (SMA) strategy with advanced risk management features for automated cryptocurrency trading.

### ✨ Key Features:
✅ Real-time WebSocket market monitoring  
✅ SMA-based trading strategy with scaled entries  
✅ Complete risk management system  
✅ Secure Binance API integration  
✅ Automated trade execution

## 📊 Trading Strategy

### Technical Indicators
- SMA (Simple Moving Average) - 20 periods
- Dynamic entry points based on SMA
- Comprehensive risk management parameters

### Entry System
- First Entry: 0.033 BTC at SMA cross
- Second Entry: 0.033 BTC at 1% below SMA
- Third Entry: 0.034 BTC at 2% below SMA

### Risk Management
- Stop Loss: 2% below entry
- Take Profit: 5% above entry
- Trailing Stop: 1% for profit protection

## 🔧 Prerequisites

- Node.js (v14+)
- npm
- Binance account with API access

## ⚙️ Configuration

1. Create `.env` file:
```env
# Binance API Credentials
API_KEY= your_binance_api_key
SECRET_KEY= your_binance_secret_key

# API Endpoints (Use testnet for testing)
API_URL= https://testnet.binance.vision/api        # For testnet
# API_URL= https://api.binance.com/api             # For production

STREAM_URL= wss://stream.testnet.binance.vision/ws # For testnet
# STREAM_URL= wss://stream.binance.com/ws          # For production

# Trading Pair Configuration
SYMBOL= BTCUSDT    # Examples: SOLUSDT, ETHUSDT, BTCETH, etc.

```

## 🚀 Installation

```bash
git clone https://github.com/AntonioPaess/binance-spot-bot-nodejs.git
cd binance-spot-bot-nodejs
npm install
```

## ▶️ Usage

Start the bot:
```bash
node start 
or
node -r dotenv/config index.js
```

## 🤝 Contribution

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature:

        git checkout -b feature/your-feature-name

3. Make your changes and commit them:
    ```sh
        git commit -m "Add new feature"

4. Push your branch:
    ```sh
        git push origin feature/your-feature-name

5. Open a Pull Request.

## 📜 License

This project is licensed under the MIT License.

## ⚠️ Risk Warning

Trading cryptocurrencies involves substantial risk of loss. This bot:
- Is for educational purposes
- Should be tested in testnet first
- Requires understanding of trading concepts
- Does not guarantee profits