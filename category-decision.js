// const apiCall = require('api-calls');
const {
  checkDuckDuckGoAPI,
  checkWikipediaAPI,
  getCoords,
  checkYelp,
  checkWolfram
} = require("./api-calls");

const simpleTaskCheck = (taskString) => {
  //Going to lowercase the entie string to make for easy checking.
  const lowerCaseTask = taskString.toLowerCase();
  let category = null;
  if (
    lowerCaseTask.includes("eat") ||
    lowerCaseTask.includes("food") ||
    lowerCaseTask.includes("dish") ||
    lowerCaseTask.includes("recipe") ||
    lowerCaseTask.includes("meat") ||
    lowerCaseTask.includes("vegetable") ||
    lowerCaseTask.includes("fruit") ||
    lowerCaseTask.includes("dairy") ||
    lowerCaseTask.includes('restaurant') ||
    lowerCaseTask.includes('cafe')
  ) {
    category = "eat";
  } else if (
    lowerCaseTask.includes("watch") ||
    lowerCaseTask.includes("movie") ||
    lowerCaseTask.includes("film") ||
    lowerCaseTask.includes("tv")
  ) {
    category = "watch";
  } else if (
    lowerCaseTask.includes("read") ||
    lowerCaseTask.includes("book") ||
    lowerCaseTask.includes("journal") ||
    lowerCaseTask.includes('novel') ||
    lowerCaseTask.includes('textbooks')
  ) {
    category = "read";
  } else if (
    lowerCaseTask.includes("buy") ||
    lowerCaseTask.includes("store") ||
    lowerCaseTask.includes("retail") ||
    lowerCaseTask.includes("grocer") ||
    lowerCaseTask.includes("purchase")
  ) {
    category = "buy";
  }
  return category;
};

const categoryDecision = (taskString, city) => {
  //NEED TO IMPLEMENT OTHER ARGUMENT WHICH IS CITY FOR YELP CHECK
  //Check obvious keywords
  //If obvious keywords fail, start calling APIS.
  let category = null;
  category = simpleTaskCheck(taskString);
  if (category) {
    return category;
  } else {
    //Time to start querying the API's
    return checkWolfram(taskString).then((response) => {
      if (response.includes("Book") ||
          response.includes("FictionalCharacter")) {
        //add to Book
        category = "read";
        return category;
      } else if (
        response.includes("Movie") ||
        response.includes("TelevisionProgram")
      ) {
        category = "watch";
        return category;
      } else if (
        response.includes("ConsumerPTE") ||
        response.includes("Invention")
      ) {
        //Add to Product
        category = "buy";
        return category;
      } else if (response.includes("RetailLocation")) {
        //Add to Eat
        category = "eat";
        return category;
      } else {
        // Cannot categorize - Lets try DuckDuckGo
        return checkDuckDuckGoAPI(taskString).then((responseDDG) => {
          if (responseDDG) {
            // function call to 'read abstract
            category = simpleTaskCheck(responseDDG);
            return category;
          } else {
            return checkYelp(taskString, city).then((responseYelp) => {
              if (responseYelp) {
                category = "eat";
                return category;
              } else {
                return null;
              }
            });
          }
        });
      }
    });
  }
};

module.exports = {categoryDecision}
