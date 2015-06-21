var oxr = require('open-exchange-rates'),
    fx = require('money');
var config = require('xtconf')();
var async = require('async');
var daylight = require('daylight');
var dateMath = require('date-arithmetic');
var utils = require('./utils');

var base_amount = 1;
oxr.set({ app_id: config.get('app_id')});
oxr.latest(function() {
    // Apply exchange rates and base rate to `fx` library object:
    fx.rates = oxr.rates;
    fx.base = oxr.base;
    
    // money.js is ready to use:
    console.log('latest', fx(base_amount).from('USD').to('NZD'));
});
var dates = ['2015-01-01','2015-01-15','2015-02-01','2015-02-15','2015-03-01','2015-03-15','2015-04-01','2015-04-15','2015-05-01','2015-05-15','2015-06-01','2015-06-15','2015-06-19'];


function getRate (date, callback) {
	oxr.historical(date, function() {
	    fx.rates = oxr.rates;
	    fx.base = oxr.base; 
		callback(null, {date: date, result: fx(base_amount).from('USD').to('NZD')});
	});
}


function getRateFuncForCurrencies(from, to) {
    return function (date, callback) {
    	oxr.historical(date, function() {
    	    fx.rates = oxr.rates;
    	    fx.base = oxr.base; 
    		callback(null, {date: date, result: fx(base_amount).from(from).to(to)});
    	});
    }
}

module.exports = {
    year: function (year,from,to, callback) {

        var dateRange =  utils.yearPoints(Number(year));
        console.log(dateRange);
        var rateFunc = getRateFuncForCurrencies(from,to);
        var ymd = utils.yearMonthDay(Date.now());
        if (year === ymd.year) {
            var _oldCallback = callback;
            callback =  function (err, rates) {
                oxr.latest(function() {
                    // Apply exchange rates and base rate to `fx` library object:
                    fx.rates = oxr.rates;
                    fx.base = oxr.base;
                	console.log('in latest cb');
                    var result = { rate: fx(base_amount).from(from).to(to)};
                    rates.push(result);
                    _oldCallback(null, rates);
                    
                });
            };
        } 
    	async.map(dateRange, rateFunc, callback);
    },
    days: function (start, numberOfDays, from, to,  callback) {
        var dateRange = utils.daysInARow(start, numberOfDays);
        
        var rateFunc = getRateFuncForCurrencies(from, to)
        async.map(dateRange, rateFunc, callback);
        
    },
    current: function (from, to, callback) {
        oxr.latest(function() {
            // Apply exchange rates and base rate to `fx` library object:
            fx.rates = oxr.rates;
            fx.base = oxr.base;
        	console.log('in latest cb');
            var result = { rate: fx(base_amount).from(from).to(to)};
            console.log(result);
            callback(null, result);
            
        });
    }
}
