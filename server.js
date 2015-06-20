var restify = require('restify');

var server = restify.createServer();
var getRates = require('./rates');

function rateResponse(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    getRates.year(req.params.year, function (err, rates) {
        res.send(rates);
        next();  
    });
}function rateRangeResponse(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var start = new Date(req.params.year, req.params.month-1, req.params.day);
    getRates.days(start, req.params.range, function (err, rates) {
        res.send(rates);
        next();  
    });
}


server.get('/rates/year/:year', rateResponse);
server.get('/rates/range/:day/:month/:year/:range', rateRangeResponse);
server.listen(4545, function() {
    console.log('%s listening at %s', server.name, server.url);
});