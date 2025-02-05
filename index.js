/*
* 1 - Monitoramente
* 2 - Estrátegia
* 3 - Trade
*/

// Monitoramente do mercado
const web_socket = require("ws");

const ws = new web_socket(`${process.env.STREAM_URL}/${process.env.SYMBOL.toLocaleLowerCase()}@ticker`);

ws.onmessage = (event) => {
    console.log(event.data);
}
