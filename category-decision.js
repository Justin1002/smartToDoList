const apiCall = require('api-calls');

const simpleTaskCheck = (taskString) => {
  //Going to lowercase the entie string to make for easy checking.
  const lowerCaseTask = taskString.toLowerCase();
  let category = null;

  if (lowerCaseTask.includes("eat")) {
    category = "food";
  } else if (lowerCaseTask.includes("watch")) {
    category = "film";
  } else if (lowerCaseTask.includes("read")) {
    category = "book";
  } else if (lowerCaseTask.includes("buy")) {
    category = "product";
  }
  return category;
};

const categoryDecision = (taskString) => {
  //Check obvious keywords
  //If obvious keywords fail, start calling APIS.
  let category = null;
  category = simpleTaskCheck(taskString);
  if(category)
  {
    return category;
  } else {
  //API checks

  //General search


  }
};
