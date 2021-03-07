// const apiCall = require('api-calls');
const {
  checkDuckDuckGoAPI,
  checkWikipediaAPI,
  getCoords,
  checkYelp,
  checkWolfram
} = require("api-calls");


const simpleTaskCheck = (taskString) => {
  //Going to lowercase the entie string to make for easy checking.
  const lowerCaseTask = taskString.toLowerCase();
  let category = null;
  if (lowerCaseTask.includes("eat") || lowerCaseTask.includes('food')) {
    category = "food";
  } else if (lowerCaseTask.includes("watch") || lowerCaseTask.includes('movie')) {
    category = "film";
  } else if (lowerCaseTask.includes("read") || lowerCaseTask.includes('book')) {
    category = "book";
  } else if (lowerCaseTask.includes("buy") || lowerCaseTask.includes('store')) {
    category = "product";
  }
  return category;
};

const categoryDecision = (taskString) => {
  //Check obvious keywords
  //If obvious keywords fail, start calling APIS.
  let category = null;
  category = simpleTaskCheck(taskString);
  if(category) {
    return category;
  } else {
    //Time to start querying the API's
    checkWolfram(taskString)
    .then((response) => {
      if (response.includes('Book')){
        //add to Book
      }
      else if (response.includes('Movie') || response.includes('TelevisionProgram')) {
        //Add to Films
      }
      else if (response.includes('ConsumerPTE') || response.includes('Invention'))
      {
        //Add to Product
      }
      else if (response.includes('RetailLocation'))
      {
        //Add to Eat
      }
      else{
        // Cannot categorize - Lets try DuckDuckGo


      }
    });
  }
};
