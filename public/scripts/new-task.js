$(document).ready(function() {
  // Get the modal
  let modal = document.getElementById("new-task-popup");

  // Get the button that opens the modal
  let button = document.getElementById("new-task");

  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  button.onclick = function() {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  };
});