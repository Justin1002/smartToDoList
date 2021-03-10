$(document).ready(function() {

  // When the user clicks on the button, open the modal
  $(document).on('click', '.edit-task', function() {
    console.log('clicked')
    const $editTaskButton = $(this)
    const taskID = $editTaskButton.closest('.task').attr('id')
    console.log(taskID)
    const category = $editTaskButton.closest('.task').attr('class').split(' ')[1];
    $(".category-select").val(category);
    $('#edit-task-popup').toggleClass('show')
    $('body').data('taskID',taskID)
  });

  $(document).on('click', '.close.edit', (event) => {
    $('#edit-task-popup').toggleClass('show')
  })
  // const span = document.getElementsByClassName("close")[1];
  // // When the user clicks on <span> (x), close the modal
  // span.onclick = function() {
  //   $('#edit-task-popup').toggleClass('show')
  // };

});


