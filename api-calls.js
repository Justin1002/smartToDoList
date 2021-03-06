const request = require('request')
require('dotenv').config();

const checkDuckDuckGoAPI = (taskString, callback) => {
  //replace all spaces with a + for API call
  const queryString = taskString.split(' ').join('+');
  request(`https://api.duckduckgo.com/?q=${queryString}&format=json`, function (error, response, body) {
    const obj = JSON.parse(body);
    // console.log(obj);
    if (obj.AbstractURL.includes('disambiguation')) {
      console.log('ambiguous');
      //DuckDuckGO has no idea what were querying and we can't categorize accurately.
      let descriptors = [];
      for(const element in obj.RelatedTopics)
      {
        descriptors.push(obj.RelatedTopics[element].Text);
      }
      callback(descriptors);
    } else {
      //To be implemented
      console.log('Not Ambiguous');
    }
  });
};

const checkWikipediaAPI = (taskString, callback) => {
  //replace all spaces with a + for API call
  const queryString = taskString.split(' ').join('%20');
  request(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${queryString}&format=json`, function (error, response, body) {
    const obj = JSON.parse(body);
    // console.log(obj);
    let descriptor = [];
    descriptor.push(obj.query.search[0].snippet)
    callback(descriptor);
  });
};

const getCoords = (city,callback) => {
  const cityString = city.split(' ').join('%20');
  request(`http://www.mapquestapi.com/geocoding/v1/address?key=${MQ_APIKEY}&location=${cityString}`, function (error, response, body) {
    const obj = JSON.parse(body);
    const coords = [];
    coords.push(obj.results[0].locations[0].latLng.lat);
    coords.push(obj.results[0].locations[0].latLng.lng);
    callback(coords);
  });
};

module.exports = {};
