const request = require('request')

const checkDuckDuckGo = (taskString) => {
  //replace all spaces with a + for API call
  const queryString = taskString.split(' ').join('+');

  request(`https://api.duckduckgo.com/?q=${queryString}&format=json`, function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log(body); // Print the HTML for the Google homepage.
  });


};

module.exports = {}
