$(document).ready(function() {

});


const editButton = () => {


}

const createTaskElement = (taskObj) => {
  const newTask = $('<li></li>');
  newTask.html(`
  <div class="task">
    <p>${taskObj.description}</p>
    <div class="task-buttons">
      <!-- <button><i class="far fa-square"></i></button> -->
      <button><i class="far fa-check-square"></i></button>
      <button><i class="fas fa-trash-alt"></i></button>
      <!-- Open The Modal -->
      <button id="edit-task"><i class="fas fa-pencil-alt"></i></button>
    </div>
    <!-- The Modal -->
    <div id="edit-task-popup" class="modal">

      <!-- Modal content -->
      <div class="modal-content">
        <span class="close">&times;</span>
        <form id="edit-task-form" method="POST" action="/tasks/:id">
          <div>
            <label for="category">Category:</label>
            <select id="categories" name="categories">
              <option value="Uncategorized">Uncategorized</option>
              <option value="To Watch">To Watch</option>
              <option value="To Eat">To Eat</option>
              <option value="To Read">To Read</option>
              <option value="To Buy">To Buy</option>
            </select>
            <textarea name="text" placeholder="New Description"></textarea>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  `)
};



const renderTasks = (tasks, category) => {
  $("#tasks-container").empty();
  if (category === 'all') {
    // for (const task of tasks)

  } else if (category === 'eat') {

  } else if (category === 'watch'){

  } else if (category === 'read') {

  } else if (category === 'buy') {

  } else {
    //completed

  }
  // for (let tweet of tweets) {
  //   let newTweet = createTweetElement(tweet);
  //   $("#tweet-list").prepend(newTweet);
  // }
};
