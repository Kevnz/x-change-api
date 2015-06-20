var daylight = require('daylight');
var dateMath = require('date-arithmetic');
var moment = require('moment');

function shimDate(d) {
    return moment(d, 'DD/MM/YYYY').toDate();
}

function ymd (d) {
    var date = daylight('n j Y', d).split(' ');
    return {
        year: Number(date[2]),
        month: Number(date[0]),
        day: Number(date[1])
    }
}
function daysInARow (startDate, numberOfDays) {
    var results=[];
    for (var index = 0; index < numberOfDays; index++) {
        var d = dateMath.add(startDate, index, 'day');
        console.log(d);
        var split = ymd(d);
        console.log(split);
        results.push(split.year + '-' +(split.month < 10 ? ('0'+ split.month ) : split.month )+ '-' +(split.day < 10 ? ('0'+ split.day ) : split.day ))
    }
    return results;
}

function yearPoints (year) {
    var now = ymd(Date.now());
    var month = now.month;
    var day = now.day;
    var thisYear = now.year;
    var dateRange = [];
    
    if (thisYear === year) {
        for (var index = 1; index <= month; index++) {
            dateRange.push(year+ '-' + (index < 10 ? ('0'+ index) : index) + '-01');
            if (!((index+1) === month && day > 15) ) {
                dateRange.push(year+ '-' + (index < 10 ? ('0'+ index) : index) + '-15');
            }
        }
        dateRange.push(year+ '-' + (month < 10 ? ('0'+ month) : month) + '-' + (day < 10 ? ('0'+ day) : day) );
    } else {
        for (var index = 1; index <= 12; index++) {
            dateRange.push(year+ '-' + (index < 10 ? ('0'+ index) : index) + '-01');
            dateRange.push(year+ '-' + (index < 10 ? ('0'+ index) : index) + '-15');
        }
    }
    return dateRange;
}
module.exports.yearMonthDay = ymd; 
module.exports.daysInARow = daysInARow;
module.exports.shimDate = shimDate;
module.exports.yearPoints = yearPoints;