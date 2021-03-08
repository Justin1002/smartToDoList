
// $(document).ready(function() {


// });  // Get the modal
//   let modal = document.getElementById("new-task-popup");

//   // Get the button that opens the modal
//   let button = document.getElementById("new-task");

//   // Get the <span> element that closes the modal
//   let span = document.getElementsByClassName("close")[0];

//   // When the user clicks on the button, open the modal
//   button.onclick = function() {
//     $('#new-task-popup').toggleClass('show')
//   };

//   // When the user clicks on <span> (x), close the modal
//   span.onclick = function() {
//     $('#new-task-popup').toggleClass('show')
//   };

//   const submitTaskForm = $('#new-task-form')

//   submitTaskForm.on('submit', function(event) {
//     event.preventDefault();
//     console.log('click')
//     const input = $(this);
//     submitTask(input);
//   })


// const submitTask = function(input) {
//   const textObj = input.find('#task-description');
//   const serializedText = textObj.serialize()
//   const textValue = textObj.val()
//   const error = input.find('.error')
//   const errorIcon = `<i class="fas fa-exclamation-triangle"></i>`
//   error.html("");

//   if(textValue === "" || textValue === null) {
//     error.append(`${errorIcon} Error: task description cannot be empty`);
//     textObj.focus()
//   }
//   else {
//   const modal = $('#new-task-popup')
//   $.ajax({
//     type: "POST",
//     url: '/tasks/',
//     data: serializedText
//   })
//     .done(modal.toggleClass('show'))
//     renderTasks()
//   }
// }
