$(document).ready(function() {
    // Get the modal
    let modal = document.getElementById("new-task-popup");

    // Get the button that opens the modal
    let button = document.getElementById("new-task");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    button.onclick = function() {
      $('#new-task-popup').toggleClass('show')
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      $('#new-task-popup').toggleClass('show')
    };

    // Get the modal
    // let modal = document.getElementById("edit-task-popup");

    // // Get the button that opens the modal
    // let button = document.getElementById("edit-task");

    // // Get the <span> element that closes the modal
    // let span = document.getElementsByClassName("close")[1];

    // // When the user clicks on the button, open the modal
    // button.onclick = function() {
    //   modal.style.display = "block";
    // };

    // // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    //   modal.style.display = "none";
    // };
    renderTasks();
    submitEvent();
});

const createTaskElement = (taskObj) => {
  const $newTask =`
  <div class="task">
    <p>${taskObj.description}</p>
    <div class="task-buttons">
      <button class='completion'><i class="far fa-check-square"></i></button>
      <button class='delete'><i class="fas fa-trash-alt"></i></button>
      <button id="edit-task"><i class="fas fa-pencil-alt"></i></button>
    </div>
  </div>
  `
  return $newTask;
};

const clearTasks= () => {

}

const renderTasks = () => {
  $(".watch-tasks").empty();
  $(".eat-tasks").empty();
  $(".read-tasks").empty();
  $(".buy-tasks").empty();
  $(".null-tasks").empty();

  $.get('/tasks')
    .then(data =>{
      for (const taskID in data) {
        console.log('taskID', taskID);
        const task = data[taskID]
        const newTask = createTaskElement(task);
        if(task.category === 'watch'){
          $('.watch-tasks').append(newTask);
        } else if (task.category === 'eat') {
          $('.eat-tasks').append(newTask);
        } else if (task.category === 'read') {
          $('.read-tasks').append(newTask);
        } else if (task.category === 'buy') {
          $('.buy-tasks').append(newTask);
        } else {
          $('.null-tasks').append(newTask);
        }
      }
    })
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
    console.log("in loadTask()");
    const url = "/task";
    $.get(url).then((req, response) => {
      console.log('showing req:', req);
      renderTasks();
      $("#text").val(''); // clears the textarea
    });
  });
};

// const submitTask = function(input) {
//   const textObj = input.find('#task-description');
//   const serializedText = textObj.serialize()
//   const modal = $('#new-task-popup')
//   $.ajax({
//     type: "POST",
//     url: '/tasks/',
//     data: serializedText
//   })
//     .done(modal.toggleClass('show'))
//   //renderTasksElements
// }

const submitEvent = () => {
  const submitTaskForm = $('#new-task-form')
  submitTaskForm.submit(function(event) {
    event.preventDefault();
    console.log('click')
    const input = $(this);
    submitTask(input);
  })
};

const submitTask = function(input) {

  const textObj = input.find('#task-description');
  const serializedText = textObj.serialize()
  const textValue = textObj.val()
  const error = input.find('.error')
  const errorIcon = `<i class="fas fa-exclamation-triangle"></i>`
  error.html("");

  if(textValue === "" || textValue === null) {
    error.append(`${errorIcon} Error: task description cannot be empty`);
    textObj.focus()
  }
  else {
  const modal = $('#new-task-popup')
  $.ajax({
    type: "POST",
    url: '/tasks/',
    data: serializedText
  })
    .done(() => {
      (modal.toggleClass('show'))
      console.log('posted the task')
      renderTasks();
    })
  }
}
