$(document).ready(function() {

  submitModal()
    $('.watch-category-btn').on('click', () => {
      categoryShow('watch');
    });

    $('.all-category-btn').on('click', () => {
      categoryShow('all');
    });

    $('.eat-category-btn').on('click', () => {
      categoryShow('eat');
    });

    $('.read-category-btn').on('click', () => {
      categoryShow('read');
    });

    $('.buy-category-btn').on('click', () => {
      categoryShow('buy');
    });

    $('.null-category-btn').on('click', () => {
      categoryShow('null');
    });
    completeTask();
    updateTask();
    deleteTask();
    renderTasks();
    submitEvent();
});

const createTaskElement = (taskObj) => {

  const $newTask =`
  <div class="task ${taskObj.category}" id=${taskObj.id}>
    <p>${taskObj.description}</p>
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
  $('#tasks-container').on('click', '.completion', function() {
    console.log('clicked')
    const $completeButton = $(this);
    const taskID = $completeButton.closest('.task').attr('id');
    // $.ajax({
    //   type: 'PUT',
    //   url: `/tasks/${taskID}`,
    // })
    //   .done(() => {
    //     console.log('Completed Task Successful');
    //     renderTasks();
    //   })
  })
};

const deleteTask = () => {
  $('#tasks-container').on('click', '.delete', function() {
    const $deleteButton = $(this);
    const taskID = $deleteButton.closest('.task').attr('id');
    $.ajax({
      type: 'DELETE',
      url: `/tasks/${taskID}`,
    })
      .done(() => {
        console.log('Delete Successful');
        renderTasks();
      })
  });
}

const updateTask = () => {
  const submitEditForm = $('#edit-task-form')
  submitEditForm.submit(function(event) {
    event.preventDefault();
    const modal = $('#edit-task-popup');
    const taskID = $('body').data().taskID;
    const textObj = $(this).find('#edit-task-description');
    const serializeValue = $(this).serialize()

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
    });
}

const clearTasks = () => {
  $(".watch-tasks").empty();
  $(".eat-tasks").empty();
  $(".read-tasks").empty();
  $(".buy-tasks").empty();
  $(".null-tasks").empty();
};

const renderTasks = () => {
  clearTasks();
  $.get('/tasks')
    .then(data =>{
      for (const taskID in data) {
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
  }
}

const submitModal = function() {
  // Get the button that opens the modal
  const button = document.getElementById("new-task");

  // When the user clicks on the button, open the modal
  button.onclick = function() {
    $('#new-task-popup').toggleClass('show')
    };

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    $('#new-task-popup').toggleClass('show')
  };
}

