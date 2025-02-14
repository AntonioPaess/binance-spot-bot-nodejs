/*
* 1 - Monitoramente
* 2 - Estrátegia
* 3 - Trade
*/

const WebSocket = require("ws");

const ws = new WebSocket(
  `${process.env.STREAM_URL}/${process.env.SYMBOL.toLocaleLowerCase()}@ticker`
);

// Configurações iniciais
const periods = 20;
let prices = []; // Acumula os últimos "periods" preços para o cálculo da SMA

// Variáveis para a posição
let positionOpen = false;
let entryPrice = 0;
let takeProfit = 0;
let stopLoss = 0;
let trailingStop = 0;
let maxPrice = 0;

ws.onmessage = async (event) => {
  console.clear();
  const obj = JSON.parse(event.data);
  const currentPrice = parseFloat(obj.a);

  console.log("Symbol: " + obj.s);
  console.log("Current Price: " + currentPrice);

  // Atualiza o array de preços para a SMA
  prices.push(currentPrice);
  if (prices.length > periods) {
    prices.shift();
  }
  // Calcula a SMA se tivermos dados suficientes; caso contrário, usa o currentPrice
  const sma =
    prices.length > 0
      ? prices.reduce((sum, price) => sum + price, 0) / prices.length
      : currentPrice;
  console.log("SMA: " + sma.toFixed(2));

  // Se não há posição aberta e o preço atual está abaixo da SMA, inicia a compra
  if (!positionOpen && currentPrice < sma) {
    // Fraciona a entrada em 3 partes
    console.log("🟢 BUYING 1/3 at " + currentPrice);
    await newOrder(0.033, "BUY");

    if (currentPrice < sma * 0.99) {
      console.log("🟢 BUYING 2/3 at " + currentPrice);
      await newOrder(0.033, "BUY");
    }

    if (currentPrice < sma * 0.98) {
      console.log("🟢 BUYING 3/3 at " + currentPrice);
      await newOrder(0.034, "BUY");
    }

    // Registra o preço de entrada e define os níveis fixos de saída
    entryPrice = currentPrice;
    stopLoss = entryPrice * 0.98;   // 2% abaixo do preço de entrada
    takeProfit = entryPrice * 1.05; // 5% acima do preço de entrada
    trailingStop = entryPrice * 0.99; // Inicialmente 1% abaixo do preço de entrada
    maxPrice = entryPrice;
    positionOpen = true;

    console.log(
      `Posição aberta | Entry: ${entryPrice.toFixed(
        2
      )} | Stop Loss: ${stopLoss.toFixed(
        2
      )} | Take Profit: ${takeProfit.toFixed(2)} | Trailing Stop: ${trailingStop.toFixed(2)}`
    );
  }
  // Se há posição aberta, verifica as condições de saída
  else if (positionOpen) {
    // Atualiza o preço máximo após a entrada e ajusta o trailing stop
    if (currentPrice > maxPrice) {
      maxPrice = currentPrice;
      trailingStop = maxPrice * 0.99; // 1% abaixo do máximo atingido
    }

    // Condições de saída: Take Profit, Stop Loss ou Trailing Stop
    if (currentPrice >= takeProfit) {
      console.log("\n🔴 SELLING - Trigger: Take Profit at " + currentPrice);
      await newOrder(0.1, "SELL");
      positionOpen = false;
    } else if (currentPrice <= stopLoss) {
      console.log("\n🔴 SELLING - Trigger: Stop Loss at " + currentPrice);
      await newOrder(0.1, "SELL");
      positionOpen = false;
    } else if (currentPrice <= trailingStop) {
      console.log("\n🔴 SELLING - Trigger: Trailing Stop at " + currentPrice);
      await newOrder(0.1, "SELL");
      positionOpen = false;
    } else {
      console.log(
        `⏳ WAITING... Entry: ${entryPrice.toFixed(
          2
        )} | Current: ${currentPrice.toFixed(2)} | Max: ${maxPrice.toFixed(
          2
        )}\nStop Loss: ${stopLoss.toFixed(
          2
        )} | Take Profit: ${takeProfit.toFixed(
          2
        )} | Trailing Stop: ${trailingStop.toFixed(2)}`
      );
    }
  } else {
    console.log(`⏳ WAITING... Sem posição aberta. SMA: ${sma.toFixed(2)}`);
  }
};


// Trade
const axios = require("axios");
const crypto = require("crypto"); // Biblioteca nativa do node de criptografia hmac-sha256

async function newOrder(quantity, side){ // quantity = quantidade de btc; side = compra ou venda

        const data = {
            symbol: process.env.SYMBOL,
            type: "MARKET",
            side: side,
            quantity: quantity,

        };

        const timestamp = Date.now(); // Pega o horário atual do pc
        const recvWindow = 60000; // Tempo de resposta da api -> ideal é estar baixo mas coloco esse valor para caso exista problemas na internet

        const signature = crypto
            .createHmac("sha256", process.env.SECRET_KEY)
            .update(`${new URLSearchParams({...data, timestamp, recvWindow})}`)
            .digest("hex");

        const newData = {...data, timestamp, recvWindow, signature};
        const qs = `?${new URLSearchParams(newData).toString()}`;

        try{
            const result = await axios({
                method: "POST",
                url: `${process.env.API_URL}/v3/order${qs}`,
                headers:{'X-MBX-APIKEY': process.env.API_KEY},
            })
            console.log(result.data);
        }
        catch(err){
            console.error(err);
        }
}