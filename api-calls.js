const request = require('request')

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

module.exports = {};
