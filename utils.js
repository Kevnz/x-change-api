var daylight = require('daylight');
var dateMath = require('date-arithmetic');
var moment = require('moment');

function shimDate(d) {
    return moment(d, 'DD/MM/YYYY').toDate();
}

var ymd = require('year-month-day');

 

module.exports.yearMonthDay = ymd; 
module.exports.daysInARow = require('days-in-a-row');
module.exports.shimDate = shimDate;
module.exports.yearPoints = require('1stand15th');