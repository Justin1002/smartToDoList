$(document).ready(function() {
  $main = $("main");
  getUser()
    .then(userData => {
      appendMain(userData);
    });
});

// Shows main page depending on if user is logged in or not
const appendMain = function(user) {
  $main = $("main");
  $main.empty();
  $main.css('display','none');
  if (Object.keys(user).length > 0) {
    $('main').prepend($newTaskModal);
    $('main').append($editTaskModal);
    $('main').append($buttonGroup);
    $('main').append($newTask);
    $('main').append($taskContainer);
    renderTasks();
  } else {
    $main.append($loginForm);
    $main.fadeIn(1000);
  }
};

// HTML content to be dynamically added
const $taskContainer = `
<section id="tasks-container">
  <div class="category-watch">
    <h2 class='h2 watch'>To Watch:</h2>
    <div class='watch taskContainer'></div>
  </div>
  <div class="category-eat">
    <h2 class='h2 eat'>To Eat:</h2>
    <div class='eat taskContainer'></div>
  </div>
  <div class="category-read">
    <h2 class='h2 read'>To Read:</h2>
    <div class='read taskContainer'></div>
  </div>
  <div class="category-buy">
    <h2 class='h2 buy'>To Buy:</h2>
    <div class='buy taskContainer'></div>
  </div>
  <div class="category-null">
    <h2 class='h2 null'>Uncategorized:</h2>
    <div class='null taskContainer'></div>
  </div>
</section>`;

const $newTask = `<button id="new-task">Add a new task</button>`;

const $buttonGroup = `
<div class="button-group">
  <button class='all-category-btn'>All</button>
  <button class='null-category-btn'>Other</button>
  <button class='watch-category-btn'><i class="fas fa-tv"></i></button>
  <button class='eat-category-btn'><i class="fas fa-utensils"></i></button>
  <button class='read-category-btn'><i class="fas fa-book"></i></button>
  <button class='buy-category-btn'><i class="fas fa-shopping-cart"></i></button>
  <button class='completed-category-btn'><i class="fas fa-check-square"></i></button>
</div>`;

const $newTaskModal = `
<!-- The Modal -->
<div id="new-task-popup" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close new">&times;</span>
    <form id="new-task-form">
      <div>
        <textarea name="text_description" id="task-description" placeholder="Enter task description"></textarea>
        <button type="submit" class='submit-task'>Submit</button>
        <div id="error"></div>
      </div>
    </form>
  </div>
</div>`;

const $editTaskModal = `
<div id="edit-task-popup" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <span class="close edit">&times;</span>
    <form id="edit-task-form">
      <div>
        <label id="category-modal" for="category">Category:</label>
        <select class="category-select" name="category">
          <option value="null">Uncategorized</option>
          <option value="watch">To Watch</option>
          <option value="eat">To Eat</option>
          <option value="read">To Read</option>
          <option value="buy">To Buy</option>
        </select>
        <textarea name="text_description" id='edit-task-description' placeholder="New Description (optional)"></textarea>
        <button type="submit">Submit</button>
        <div class="error"></div>
      </div>
    </form>
  </div>
</div>`;
