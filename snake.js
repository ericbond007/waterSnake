var getWater = require('./getWater')
var schedule = require('node-schedule');

var stream = schedule.scheduleJob('0 05,12,19 * * *', function() {
  getWater(false);
});
