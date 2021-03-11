$(document).ready(function() {

  // When the user clicks on the button, open the modal
  $(document).on('click', '.edit-task', function() {
    console.log('clicked')
    const $editTaskButton = $(this)
    const taskID = $editTaskButton.closest('.task').attr('id')
    console.log(taskID)
    const category = $editTaskButton.closest('.task').attr('class').split(' ')[1];
    $(".category-select").val(category);
    // $('#edit-task-popup').toggleClass('show')
    $('#edit-task-popup').fadeIn(500);
    setTimeout( () => {
      $('#edit-task-popup').toggleClass('show')
    }, 500);

    $('body').data('taskID',taskID)
  });

  $(document).on('click', '.close.edit', (event) => {
    $('#edit-task-popup').fadeOut(500);
    setTimeout( () => {
      $('#edit-task-popup').toggleClass('show')
    }, 500);

    //$('#edit-task-popup').toggleClass('show')
    });
  });
