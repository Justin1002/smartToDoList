$(document).ready(function() {

    renderTasks();
    // Get the modal
    let modal = document.getElementById("edit-task-popup");

    // Get the button that opens the modal
    let button = document.getElementById("edit-task");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[1];

    // When the user clicks on the button, open the modal
    button.onclick = function() {
      modal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    };
});

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
  return newTask;
};

const renderTasks = () => {
  $("#tasks-container").empty();
  const url = "/task";
  $.get('/tasks')
    .then((tasks => {
      for (const task in tasks) {
        const task = tasks[task.id];
        createTaskElement(task);
        $('#tasks-container').append(task);
      }
    }))
};

// const submitNewTask = () => {
//   $('#new-task-form').submit((event) => {
//     event.preventDefault();
//     const url = "/task";
//     const $data = $("#text").val();
//     const dataSent = { text: $data };
//     $.post(url, dataSent).then((req, response) => {
//       //NEED TO BE POSTED TO DB
//       loadTasks(); // Ensures that Task gets posted
//     });
//   });
// };

const loadTask = () => {
  $('#new-task-form').submit((event) => {
    event.preventDefault();
    const url = "/task";
    let $formSubmit = $("#text").val();
    $formSubmit = $formSubmit.trim();
    $.get(url).then((req, response) => {
      renderTweets(req);
      $("#text").val(''); // clears the textarea
    });
  });
};

const submitTask = function(input) {
  const textObj = input.find('#task-description');
  const serializedText = textObj.serialize()
  const modal = $('#new-task-popup')
  $.ajax({
    type: "POST",
    url: '/tasks/',
    data: serializedText
  })
    .done(modal.toggleClass('show'))
  //renderTasksElements
}
