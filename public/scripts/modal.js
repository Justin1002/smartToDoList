$(document).ready(() => {
  submitModal();
  editModal();
});

const submitModal = function() {
  // Get the button that opens the modal
  $(document).on('click',"#new-task", () => {
    $('#new-task-popup').fadeIn(500);
    $('#new-task-form').find('#task-description').focus();
  });
  // Get the span element that closes the modal
  $(document).on('click','.close.new', () => {
    $('#new-task-popup').fadeOut(500);
  });
};


const editModal = function() {
	$(document).on('click', '.edit-task', function() {
  	const $editTaskButton = $(this)
  	const taskID = $editTaskButton.closest('.task').attr('id')
  	const category = $editTaskButton.closest('.task').attr('class').split(' ')[1];
  	$(".category-select").val(category);
  	$('#edit-task-popup').fadeIn(500);
  	setTimeout(() => {
    	$('#edit-task-popup').toggleClass('show')
  	}, 500);
  	$('body').data('taskID',taskID)
	});

	// Close modal
	$(document).on('click', '.close.edit', (event) => {
  	$('#edit-task-popup').fadeOut(500);
  	setTimeout(() => {
    	$('#edit-task-popup').toggleClass('show');
  	}, 500);
	});
}
