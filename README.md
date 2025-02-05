# Binance Spot Bot Node.js

An automated trading bot for Binance Spot, built with Node.js.  
This project enables automated buying and selling operations on Binance using the exchange's official API.

---

## 📌 Overview

The **Binance Spot Bot Node.js** is designed to simplify automated trading, allowing users to configure custom strategies and execute trades efficiently.  

### ✨ Key Features:
✅ Real-time price monitoring  
✅ Automatic execution of buy and sell orders  
✅ Trade logging for performance analysis  

---

## ⚙️ Features

- **🔗 Binance API Integration:** Secure connection and authentication via API keys.  
- **📈 Trading Strategies:** Customize buy and sell parameters.  
- **📊 Logging & Monitoring:** Record transactions for analysis and strategy optimization.  

---

## 🔧 Prerequisites

Before starting, make sure you have installed:

- [Node.js](https://nodejs.org/) (version 14 or later)  
- npm (Node.js package manager)  
- A [Binance](https://www.binance.com/) account with API keys enabled  

---

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/binance-spot-bot-nodejs.git
   cd binance-spot-bot-nodejs

Install dependencies:

    npm install

### 3. Set up environment variables:
Create a .env file in the project root and add your Binance credentials:

        BINANCE_API_KEY=your_api_key_here
        BINANCE_API_SECRET=your_api_secret_here

## ⚙️ Configuration

### 🔹 Trading Parameters

Edit the configuration files to adjust your strategy parameters, such as:

- Trading pair (e.g., BTC/USDT)
- Buy/Sell limits
- Entry/Exit strategy

### 🛠️ Testing Environment
It is recommended to test your strategy in simulation mode before trading with real funds.

## ▶️ Usage

To start the bot, run:

        npm start
The bot will connect to Binance and begin monitoring the markets based on your configuration.

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

## ⚠️ Disclaimer

This project is for educational purposes only.
Use it responsibly and always test your strategies before trading with real money.