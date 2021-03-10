$(document).ready(function() {

  submitModal()

    $(document).on('click','.watch-category-btn', () => {
      renderTasks()
      categoryShow('watch');
    });

    $(document).on('click','.all-category-btn', () => {
      renderTasks();
      categoryShow('all');
    });

    $(document).on('click', '.eat-category-btn', () => {
      renderTasks();
      categoryShow('eat');
    });

    $(document).on('click', '.read-category-btn', () => {
      renderTasks();
      categoryShow('read');
    });

    $(document).on('click','.buy-category-btn', () => {
      renderTasks();
      categoryShow('buy');
    });

    $(document).on('click', '.null-category-btn', () => {
      renderTasks();
      categoryShow('null');
    });

    $(document).on('click', '.completed-category-btn', () => {
      renderCompletedTask();
      categoryShow('completed');
    });

    completeTask();
    updateTask();
    deleteTask();
    renderTasks();
    submitTask();
});

const escape =  function(str) {
  let a = document.createElement('a');
  a.appendChild(document.createTextNode(str));
  return a.innerHTML;
};

const createTaskElement = (taskObj) => {

  const $newTask =`
  <div class="task ${taskObj.category}" id=${taskObj.id}>
    <p>${escape(taskObj.description)}</p>
    <div class="task-buttons">
      <button class='completion' value=${taskObj.completed} type='submit'><i class="far fa-check-square"></i></button>
      <button class='delete' type='submit'><i class="fas fa-trash-alt"></i></button>
      <button class='edit-task' type='submit'><i class="fas fa-pencil-alt"></i></button>
    </div>
  </div>
  `
  return $newTask;
};

const completeTask = () => {
  $(document).on('click', '.completion', function() {
    console.log('clicked')
    const $completeButton = $(this);
    const taskID = $completeButton.closest('.task').attr('id');
    let currentValue = $(this).attr('value')
    if (currentValue === 'false') {
      $(this).attr('value','true')
    } else {
      $(this).attr('value','false')
    }

    $.ajax({
      type: 'PUT',
      url: `/tasks/${taskID}`,
      data: {completed: $(this).attr('value')}
    })
      .done(() => {
        console.log('Completed Task Successful');
        console.log($completeButton.closest('.taskContainer').children().length)
        if ($completeButton.closest('.taskContainer').children().length === 1) {
          $completeButton.closest('.taskContainer').siblings().hide()
          $completeButton.closest('.task').remove()
        }
        else {
        $completeButton.closest('.task').remove()
        }
      })
  })
};

const deleteTask = () => {
  $(document).on('click', '.delete', function() {
    const $deleteButton = $(this);
    const taskID = $deleteButton.closest('.task').attr('id');
    $.ajax({
      type: 'DELETE',
      url: `/tasks/${taskID}`,
    })
      .done(() => {
        console.log('Delete Successful');
        if ($deleteButton.closest('.taskContainer').children().length === 1) {
          $deleteButton.closest('.taskContainer').siblings().hide()
          $deleteButton.closest('.task').remove()
        }
        else {
        $deleteButton.closest('.task').remove()
        }
        $deleteButton.closest('.task').remove()
      })
  });
}

const updateTask = () => {
  // const submitEditForm = $('#edit-task-form')
  $(document).on('submit','#edit-task-form', (event) => {
    event.preventDefault();
    console.log('submit')
    const modal = $('#edit-task-popup')
    const taskID = $('body').data().taskID;
    const textObj = $('#edit-task-description')
    const serializeValue = $('#edit-task-form').serialize()

    console.log(serializeValue);
    $.ajax({
      type: 'PUT',
      url: `/tasks/${taskID}`,
      data: serializeValue
    })
      .done(() => {
        console.log('Put Successful');
        (modal.toggleClass('show'))
        textObj.val("")
        renderTasks();
      })

  })
}

const clearTasks = () => {
  $(".watch.taskContainer").empty();
  $(".eat.taskContainer").empty();
  $(".read.taskContainer").empty();
  $(".buy.taskContainer").empty();
  $(".null.taskContainer").empty();

  $('.h2.watch').hide()
  $('.h2.eat').hide()
  $('.h2.read').hide()
  $('.h2.buy').hide()
  $('.h2.null').hide()
};

const renderTasks = () => {
  clearTasks();
  $.get('/tasks')
    .then(data =>{
      for (const taskID in data) {
        const task = data[taskID]
        if(!task.completed){
          const newTask = createTaskElement(task);
          if(task.category === 'watch'){
            $('.h2.watch').show()
            $('.watch.taskContainer').append(newTask);
          } else if (task.category === 'eat') {
            $('.h2.eat').show()
            $('.eat.taskContainer').append(newTask);
          } else if (task.category === 'read') {
            $('.h2.read').show()
            $('.read.taskContainer').append(newTask);
          } else if (task.category === 'buy') {
            $('.h2.buy').show()
            $('.buy.taskContainer').append(newTask);
          } else {
            $('.h2.null').show()
            $('.null.taskContainer').append(newTask);
          }
        }
      }
    })
};

const renderCompletedTask = () => {
  clearTasks();
  $.get('/tasks')
    .then(data =>{
      for (const taskID in data) {
        const task = data[taskID]
        if(task.completed){
          const newTask = createTaskElement(task);
          if(task.category === 'watch'){
            $('.h2.watch').show()
            $('.watch.taskContainer').append(newTask);
          } else if (task.category === 'eat') {
            $('.h2.eat').show()
            $('.eat.taskContainer').append(newTask);
          } else if (task.category === 'read') {
            $('.h2.read').show()
            $('.read.taskContainer').append(newTask);
          } else if (task.category === 'buy') {
            $('.h2.buy').show()
            $('.buy.taskContainer').append(newTask);
          } else {
            $('.h2.null').show()
            $('.null.taskContainer').append(newTask);
          }
        }
      }
    })
}

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

const submitTask = () => {
  // const submitTaskForm = $('#new-task-form')
  $(document).on('submit', '#new-task-form', (event) => {
    event.preventDefault();
    console.log('click')

  const input = $('#new-task-form')
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
      textObj.val('')
      console.log('posted the task')
      renderTasks();
    })
  }

  });

};


const categoryShow = function(category) {
  switch(category) {
    case 'watch':
      $(".category-watch").show()
      $(".category-eat").hide()
      $(".category-read").hide()
      $(".category-buy").hide()
      $(".category-null").hide()
      break;
    case 'eat':
      $(".category-watch").hide()
      $(".category-eat").show()
      $(".category-read").hide()
      $(".category-buy").hide()
      $(".category-null").hide()
      break;
    case 'all':
      $(".category-watch").show()
      $(".category-eat").show()
      $(".category-read").show()
      $(".category-buy").show()
      $(".category-null").show()
      break;
    case 'read':
      $(".category-watch").hide()
      $(".category-eat").hide()
      $(".category-read").show()
      $(".category-buy").hide()
      $(".category-null").hide()
      break;
    case 'buy':
      $(".category-watch").hide()
      $(".category-eat").hide()
      $(".category-read").hide()
      $(".category-buy").show()
      $(".category-null").hide()
      break;
    case 'null':
      $(".category-watch").hide()
      $(".category-eat").hide()
      $(".category-read").hide()
      $(".category-buy").hide()
      $(".category-null").show()
      break;
    case 'completed':
      $(".category-watch").show()
      $(".category-eat").show()
      $(".category-read").show()
      $(".category-buy").show()
      $(".category-null").show()
      break;
  }
}

const submitModal = function() {
  // Get the button that opens the modal
   $(document).on('click',"#new-task", (event) => {
     console.log('click')
    $('#new-task-popup').toggleClass('show')
  });
  // Get the span element that closes the modal
  $(document).on('click','.close.new', (event) => {
    $('#new-task-popup').toggleClass('show')
  })

}

// // const noTasks = function(category) {
// //   $('.no-task').remove()
// //   if ($(`.${category}-tasks`).find(children().length === 0) {
// //     $('#tasks-container').append("<p class='no-task'>You have no tasks here!</p>")
// //   }
// }
