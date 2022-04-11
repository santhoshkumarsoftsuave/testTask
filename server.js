var express = require('express');
const ical = require('node-ical');
const moment = require('moment');
var app = express();

// use the sync function parseFile() to parse this ics file
const events = ical.sync.parseFile('ical.ics');
// loop through events and log them
count = 0


app.get('/test', function (req, res) {
  try {
    let eventDates = []
    let dateArray = [];
    // const data = getDates(new Date(), '2022-04-18');
    // console.log(data)
    function getDates(startDate, stopDate) {
      var currentDate = moment(startDate);
      var stopDate = moment(stopDate);
      while (currentDate <= stopDate) {
          dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
          currentDate = moment(currentDate).add(1, 'days');
      }
      return dateArray
      ;
}
    
    for (const event of Object.values(events)) {
      eventDates = getDates(event.start, event.end);
    };
    console.log('Total event days===>',eventDates.length)
    dateArray=[]
    let TotalDaysInAYear = getDates('2022-01-01','2022-12-31')
    console.log(TotalDaysInAYear.length)
  
    TotalDaysInAYear = TotalDaysInAYear.filter(val => !eventDates.includes(val));
    console.log('total bookable days===>',TotalDaysInAYear.length)
    let response = [];
    for(let item of TotalDaysInAYear) {
      response.push({date:item,bookable: true})
    }
    console.log('response', response);
    res.status(200).json(response); 
  } catch (error) {
    res.status(400).json(error);
  }
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})



