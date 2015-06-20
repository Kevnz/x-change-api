var tap = require('tap');

var utils = require('../utils');

var dateToTest = new Date('01/01/2015');
var secondDateToTest =  utils.shimDate('16/01/2015') ;
console.log(secondDateToTest);
var result = utils.yearMonthDay(secondDateToTest);


console.log(result);
tap.equal(result.year, 2015, 'check if year is 2015');
tap.equal(result.month, 1, 'check if month is 1st');
tap.equal(result.day, 16, 'check if day is 16th');

var dayResults = utils.daysInARow(dateToTest, 45);

tap.equal(dayResults.length, 45);

tap.equal(dayResults[1], '2015-01-02');
tap.equal(dayResults[30], '2015-01-31');
tap.equal(dayResults[31], '2015-02-01');


var year2014 = utils.yearPoints(2014);
var year2015 = utils.yearPoints(2015);
tap.equal(year2014.length, 24);
tap.notEqual(year2014, year2015);
tap.notEqual(year2014.length, year2015.length);
console.log(year2015);
