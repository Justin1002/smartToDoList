require('dotenv').config();
const request = require('request-promise')
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_APIKEY);
const convert = require('xml-js');

// Request to DuckDuckGo's API. reutrns a abstract if the query is unambiguous
const checkDuckDuckGoAPI = (taskString) => {
  const queryString = taskString.split(' ').join('+');  //replace all spaces with a + for API call
  return request(`https://api.duckduckgo.com/?q=${queryString}&format=json`)
  .then((response) => {
    const obj = JSON.parse(response);
    // console.log(obj);
    if (obj.Abstract) {
      return obj.Abstract;
    } else {
      return null;
    }
  })
  .catch((error) => {
    console.log(error);
  });
};

// Request to wikipedia's API. Returns a summary, - Not used as DuckDuckGo's API will return the same thing if answer is unambiguous.
const checkWikipediaAPI = (taskString) => {
  //replace all spaces with a + for API call
  const queryString = taskString.split(' ').join('%20');
  return request(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${queryString}&format=json`)
  .then((response) => {
    const obj = JSON.parse(response);
    let descriptor = [];
    descriptor.push(obj.query.search[0].snippet)
    return descriptor;
  })
  .catch((error) => {
    console.log(error);
  });
};

//Request to MapQuest's API to get Longitude and Latitude - Not used at Yelp's API can query with just a city name.
const getCoords = (city) => {
  const cityString = city.split(' ').join('%20');
  return request(`http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MQ_APIKEY}&location=${cityString}`)
  .then((response) => {
      const obj = JSON.parse(response);
      const coords = [];
      coords.push(obj.results[0].locations[0].latLng.lat);
      coords.push(obj.results[0].locations[0].latLng.lng);
      return coords;
  })
  .catch((error) => {
    console.log(error);
  });
};

//Request to Yelp's API to check for local restaurants and cafes.
const checkYelp = (queryString,city) => {
  return client.search({
    term: queryString,
    location: city,
  }).then(response => {
    return response.jsonBody.businesses[0].name;
  }).catch(e => {
    console.log(e);
  });
};

//Request to wolframs API. Returns possiblitlities of what category the query may belong to.
const checkWolfram = (taskString) => {
  const queryString = taskString.split(' ').join('+');
  // `http://api.wolframalpha.com/v2/query?input=${queryString}&appid=${process.env.WAAPIKEY}`
  return request(`http://api.wolframalpha.com/v2/query?input=${queryString}&appid=${process.env.WAAPIKEY}`)
  .then((response) => {
    const obj = convert.xml2json(response);
    const JSONobj = JSON.parse(obj);
    return JSONobj.elements[0].attributes.datatypes;
    }
  )
  .catch((error) => {
    console.log(error);
  });
};

module.exports = {
  checkDuckDuckGoAPI,
  checkWikipediaAPI,
  getCoords,
  checkYelp,
  checkWolfram
};
