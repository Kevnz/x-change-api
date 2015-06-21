var rollbar = require("rollbar");
var config = require('xtconf')();
rollbar.init(config.get('rollbar'));
var options = {
  // Call process.exit(1) when an uncaught exception occurs but after reporting all
  // pending errors to Rollbar.
  //
  // Default: false
  exitOnUncaughtException: true
};
rollbar.handleUncaughtExceptions(config.get('rollbar'), options);

var restify = require('restify');

var server = restify.createServer(); 
server.use(restify.queryParser());
//////
var getRates = require('./rates');

function rateResponse(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log(req.params);
    var from = req.params.from || 'USD';
    var to = req.params.to || 'NZD';
    getRates.year(req.params.year, from, to, function (err, rates) {
        res.send(rates);
        next();  
    });
};

function rateRangeResponse(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var from = req.params.from || 'USD';
    var to = req.params.to || 'NZD';
    var start = new Date(req.params.year, req.params.month-1, req.params.day);
    getRates.days(start, req.params.range, function (err, rates) {
        res.send(rates);
        next();  
    });
};
function latestResponse(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log(req.params);
    var from = req.params.from || 'USD';
    var to = req.params.to || 'NZD';
    getRates.current(from, to, function (err, rates) {
        res.send(rates);
        next();  
    });
}
server.get('/rates/latest', latestResponse);
server.get('/rates/year/:year', rateResponse);
server.get('/rates/range/:day/:month/:year/:range', rateRangeResponse);
server.listen(process.env.PORT || 4545, function() {
    console.log('%s listening at %s', server.name, server.url);
});