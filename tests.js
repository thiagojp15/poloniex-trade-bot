// Habilitar modo estrito do Javascript
"use strict";

// Importar os módulos
var bot = require('./core.js')
var config = require('./config.js');
 
bot.setCredential(config.trader.key, config.trader.secret);
bot.setPair(config.watch.currency + '_' + config.watch.asset);



 // Configurar o BOT
 bot.setCredential(config.trader.key, config.trader.secret);
 bot.setPair(config.watch.currency + '_' + config.watch.asset);
 
 var minTradeUsd = 10;
 
 bot.balance(function(err, usd, btc) {
 	console.log('aaaaaaaa')
 	if (err) {
 		return console.log(err)
 	}
 	if (usd < minTradeUsd) {
 		return console.log("Você precisa ter " + minTradeUsd + ". Mas você tem " + usd + " USDT")
 	}
 	
 	var cotSell = 924
 	var cotBuy = 916
 	var amount = usd / cotBuy
 	
 	bot.buycoin(cotBuy, amount, function(err, data) {
 		if (err) {
 			return console.log(err)
 		}
 		var orderid = data.orderNumber;
 		console.log("ORDER: BUY | RATE: %f | ID: %f | Amount: %f", cotBuy, orderid, amount)
 		setInterval(function() {
 			if (!bot.isOpen(orderid)) {
 				bot.sellcoin(cotSell, usd * cotBuy, function(err, data) {
 					if (err) {
 						return console.log(err)
 					}
 					console.log("ORDER: SELL | RATE: %f | ID: %f", cotSell, orderid)
 					var orderid = data.orderNumber;
 					setInterval(function() {
 						if (!bot.isOpen(orderid)) {
 							console.log("TRADE EFETUADO")
 						}
 					}, 1000)
 				})
 			}
 		}, 10000)
 	})
 })
 
 
 