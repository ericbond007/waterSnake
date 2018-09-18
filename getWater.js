var Twit = require('twit');
var config = require('./config');
var axios = require('axios');

let fixedPool = '';

var T = new Twit(config);

const sendTwit = (poolLevel, single) => {
  let fixedPool = (poolLevel - 0).toFixed(2);
  let levels = (fixedPool - 538).toFixed(2);
  let preTweet = 'Lake Monroe Pool Level is currently ';
  let tweet = '';

  if (fixedPool === 538.00) {
     tweet = preTweet + fixedPool + 'ft which is right at pool level!';
   } else if (fixedPool < 538) {
     tweet = pretTweet + fixedPool + 'ft which is ' + levels + 'ft below pool level';
   } else {
     tweet = preTweet + fixedPool + 'ft which is ' + levels + 'ft above pool level';
   }

  if (single) {
    console.log("single? " + single);
    console.log(fixedPool);
    console.log(tweet);
    return;
  }

  if (!single) {
    T.post('statuses/update', { status: tweet }, function(err, data, response) {
      console.log(tweet);
    })
  }
}

const getWater = (single) => {
  return axios.get(`https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03372400&siteStatus=all`)
     .then(res => {
         res = res.data
         let poolLevel = res.value.timeSeries[0].values[0].value[0].value;

         sendTwit(poolLevel, single);
      })
      .catch(err => {
          console.log(err);
          console.log("shits fucked");
          return 'error';
      });
}

module.exports = getWater;
