$(document).ready(function() {

  // When the user clicks on the button, open the modal
  $('#tasks-container').on('click', '.edit-task', function() {
    const $editTaskButton = $(this)
    const taskID = $editTaskButton.closest('.task').attr('id')
    const category = $editTaskButton.closest('.task').attr('class').split(' ')[1];
    $(".category-select").val(category);
    $('#edit-task-popup').toggleClass('show')
    $('body').data('taskID',taskID)
  });

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[1];
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    $('#edit-task-popup').toggleClass('show')
  };

});


