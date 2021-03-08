$(document).ready(function() {
  // Get the modal
  let modal = document.getElementById("edit-task-popup");

  // Get the button that opens the modal
  let button = document.getElementsByClass("edit-task");

  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[1];

  // When the user clicks on the button, open the modal
  button.onclick = function() {
    $('.edit-task-popup').toggleClass('show')
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    $('.edit-task-popup').toggleClass('show')
  };

  const editTaskForm = $('.edit-task-popup modal')
  editTaskButton.on('submit')
});
