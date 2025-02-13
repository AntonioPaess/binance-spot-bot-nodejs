/*
* 1 - Monitoramente
* 2 - Estrátegia
* 3 - Trade
*/

// Monitoramente do mercado
const web_socket = require("ws");

const ws = new web_socket(`${process.env.STREAM_URL}/${process.env.SYMBOL.toLocaleLowerCase()}@ticker`);


let sell_price = 0;

ws.onmessage = async (event) => {
    console.clear();
    const obj = JSON.parse(event.data);
    
    const current_price = parseFloat(obj.a);
    
    console.log("Symbol:" + obj.s);
    
    console.log("\nCurrent Price: " + current_price);
    
    
    // Estratégia

    // Média móvel simples de 20 períodos (exemplo)
    const periods = 20;
    let prices = [];
    prices.push(current_price);
    if (prices.length > periods) prices.shift();
    const sma = prices.reduce((a, b) => a + b, 0) / prices.length;

    // Stop loss e take profit
    const stopLoss = current_price * 0.98; // 2% abaixo
    const takeProfit = current_price * 1.05; // 5% acima
    const trailingStop = current_price * 0.99; // 1% trailing stop

    if (sell_price === 0 && current_price < sma) {
        // Fracionando a entrada em 3 partes
        console.log("🟢 BUYING 1/3");
        await newOrder(0.033, "BUY");
        
        if (current_price < sma * 0.99) {
            console.log("🟢 BUYING 2/3");
            await newOrder(0.033, "BUY");
        }
        
        if (current_price < sma * 0.98) {
            console.log("🟢 BUYING 3/3");
            await newOrder(0.034, "BUY");
        }
        
        sell_price = takeProfit;
    } else if (sell_price !== 0 && (current_price >= takeProfit || current_price <= stopLoss || current_price <= trailingStop)) {
        console.log("\n🔴 SELLING - Trigger:" + (current_price >= takeProfit ? "Take Profit ✨" : "Stop Loss/Trailing ⚠️"));
        await newOrder(0.1, "SELL");
        sell_price = 0;
    } else {
        console.log(`⏳ WAITING... Sell price: ${sell_price} | SMA: ${sma} | Stop Loss: ${stopLoss} | Take Profit: ${takeProfit}`);
    }
}

// Trade
const axios = require("axios");
const crypto = require("crypto"); // Biblioteca nativa do node de criptografia hmac-sha256
const { type } = require("os");

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