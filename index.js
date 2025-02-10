/*
* 1 - Monitoramente
* 2 - Estrátegia
* 3 - Trade
*/

// Monitoramente do mercado
const web_socket = require("ws");

const ws = new web_socket(`${process.env.STREAM_URL}/${process.env.SYMBOL.toLocaleLowerCase()}@ticker`);
const PROFITABILLITY = parseFloat(process.env.PROFITABILLITY);

let sell_price = 0;

ws.onmessage = (event) => {
    console.clear();
    const obj = JSON.parse(event.data);
    
    console.log("Symbol:" + obj.s);
    console.log("Best Ask:" + obj.a);
    
    
    // Estratégia

    const current_price = parseFloat(obj.a);
    const best_price = current_price - (current_price * 0.02);
    
    console.log(best_price);
    

    if(sell_price === 0 && current_price < 202.00)
    {
        console.log("Comprar");
        sell_price = current_price * PROFITABILLITY
    }
    else if (sell_price !== 0 && current_price >= sell_price)
    {
        console.log("Vender");
        sell_price = 0;
    }
    else{
        console.log("Esperando... Sell price: " + sell_price);
    }

}



