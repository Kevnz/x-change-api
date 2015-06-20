var oxr = require('open-exchange-rates'),
    fx = require('money');
var config = require('xtconf')();
var async = require('async');
var daylight = require('daylight');
var dateMath = require('date-arithmetic');
var utils = require('./utils');

var amount = 1;
oxr.set({ app_id: config.get('app_id')});
oxr.latest(function() {
    // Apply exchange rates and base rate to `fx` library object:
    fx.rates = oxr.rates;
    fx.base = oxr.base;
    
    // money.js is ready to use:
    console.log('latest', fx(amount).from('USD').to('NZD'));
});
var dates = ['2015-01-01','2015-01-15','2015-02-01','2015-02-15','2015-03-01','2015-03-15','2015-04-01','2015-04-15','2015-05-01','2015-05-15','2015-06-01','2015-06-15','2015-06-19'];


function getRate (date, callback) {
	oxr.historical(date, function() {
	    fx.rates = oxr.rates;
	    fx.base = oxr.base; 
		callback(null, {date: date, result: fx(amount).from('USD').to('NZD')});
	});
}

module.exports = {
    year: function (year, callback) {

    var dateRange =  utils.yearPoints(Number(year));
    console.log(dateRange);
	async.map(dateRange, getRate, callback);
},
    days: function (start, numberOfDays, callback) {
        var dateRange = utils.daysInARow(start, numberOfDays);
        async.map(dateRange, getRate, callback);
        
    }
}
