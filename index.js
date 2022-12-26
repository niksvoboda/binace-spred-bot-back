const https = require('https');
const express = require('express'),
app = express(),
request = require('request')

let bybitBTC='';
let binanceBTC='';


const getBybit = () =>{
    request(
        'https://api.bybit.com/spot/v3/public/quote/trades?symbol=BTCUSDT&limit=1',
        (err, response, body) => {
        if (err) return res.status(500).send({ message: err })
        const fromBybit = JSON.parse(body);
    
        bybitBTC = fromBybit.result.list[0].price
  
        console.log(bybitBTC)
        })
}

const getBinance = () =>{
    request(
        'https://api1.binance.com/api/v3/avgPrice?symbol=BTCUSDT',
        (err, response, body) => {
        if (err) return res.status(500).send({ message: err })
        const fromBinance = JSON.parse(body);
        binanceBTC = fromBinance.price;
        console.log(binanceBTC)
        })
}

app.get('/', (req, res) => {
    result = {
        bybit: bybitBTC,
        binance: binanceBTC,
        spread: Math.abs(binanceBTC - bybitBTC),
        spreadPercent: Math.abs((binanceBTC - bybitBTC)/binanceBTC*100)
    }
    return res.send(result)
  })
  
app.listen(5000, () =>{

})

setInterval(getBybit, 3000)
setInterval(getBinance, 3000)


