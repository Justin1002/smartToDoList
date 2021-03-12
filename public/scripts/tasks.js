$(document).ready(function() {
  // click disabled function prevents form/rendering of data from being submitted multiple times
  let clickDisabled = false;

  //-- Category buttons to render and animate the view of the list --//
  $(document).on('click','.watch-category-btn', (event) => {
    if (clickDisabled) {
      return;
    }
    clickDisabled = true;
    setTimeout(function() {clickDisabled = false; },1000);
    animateCategoryDisplay(categoryShow,'watch');
  });

  $(document).on('click', '.all-category-btn', () => {
    if (clickDisabled) {
      return;
    }
    clickDisabled = true;
    setTimeout(function() {clickDisabled = false; },1000);
    animateCategoryDisplay(categoryShow,'all');
  });

  $(document).on('click', '.eat-category-btn', () => {
    if (clickDisabled) {
      return;
    }
    clickDisabled = true;
    setTimeout(function() {clickDisabled = false; },1000);
    animateCategoryDisplay(categoryShow,'eat');
  });

  $(document).on('click', '.read-category-btn', () => {
    if (clickDisabled) {
      return;
    }
    clickDisabled = true;
    setTimeout(function() {clickDisabled = false; },1000);
    animateCategoryDisplay(categoryShow,'read');
  });

  $(document).on('click','.buy-category-btn', () => {
    if (clickDisabled) {
      return;
    }
    clickDisabled = true;
    setTimeout(function() {clickDisabled = false; },1000);
    animateCategoryDisplay(categoryShow,'buy');
  });

  $(document).on('click', '.null-category-btn', () => {
    if (clickDisabled) {
      return;
    }
    clickDisabled = true;
    setTimeout(function() {clickDisabled = false; },1000);
    animateCategoryDisplay(categoryShow,'null');
  });

  $(document).on('click', '.completed-category-btn', () => {
    if (clickDisabled) {
      return;
    }
    clickDisabled = true;
    setTimeout(function() {clickDisabled = false;},2000);
    animateCategoryDisplay(categoryShow,'all',true);
  });

  //--Functions that get run upon clicking complete task, update task, delete task and submit task buttons/forms--//
  completeTask();
  updateTask();
  deleteTask();
  submitTask();
});

// Escape function to prevent CORS
const escape =  function(str) {
  let a = document.createElement('a');
  a.appendChild(document.createTextNode(str));
  return a.innerHTML;
};

// Animation function for category display
const animateCategoryDisplay = function(callback, category, boolean = false) {
  $('#tasks-container').fadeOut(1000).promise().then(function() {
    $('#tasks-container').css('display','none');
    callback(category);
    renderTasks(boolean)
    $('#tasks-container').fadeIn(1000);
  });
};

// Creates an HTML task element
const createTaskElement = (taskObj) => {
  let $newTask = null;
  if (taskObj.completion_date) {
    const date = new Date(taskObj.completion_date);
    $newTask = `
    	<div class="task ${taskObj.category}" id=${taskObj.id}>
      	<p>&bull; ${escape(taskObj.description)}</p>
      	<div class="task-buttons">
        	<a class='show-completion-date'>Completed: ${date.toLocaleDateString()}</a>
        	<button class='completion' value=${taskObj.completed} type='submit'><i class="far fa-check-square"></i></button>
        	<button class='delete' type='submit'><i class="fas fa-trash-alt"></i></button>
        	<button class='edit-task' type='submit'><i class="fas fa-pencil-alt"></i></button>
      	</div>
    	</div>
    `;
  } else {
    $newTask = `
    	<div class="task ${taskObj.category}" id=${taskObj.id}>
      	<p>&bull;${escape(taskObj.description)}</p>
      	<div class="task-buttons">
        	<button class='completion' value=${taskObj.completed} type='submit'><i class="far fa-check-square"></i></button>
        	<button class='delete' type='submit'><i class="fas fa-trash-alt"></i></button>
        	<button class='edit-task' type='submit'><i class="fas fa-pencil-alt"></i></button>
      	</div>
   		</div>
    `;
  }
  return $newTask;
};

// When a task is completed, it gets added to the 'completed category'
const completeTask = () => {
  $(document).on('click', '.completion', function() {
    const $completeButton = $(this);
    const taskID = $completeButton.closest('.task').attr('id');
    let currentValue = $(this).attr('value');
    if (currentValue === 'false') {
      $(this).attr('value','true');
    } else {
      $(this).attr('value','false');
    }

    $.ajax({
      type: 'PUT',
      url: `/tasks/${taskID}`,
      data: {completed: $(this).attr('value')}
    })
      .done(() => {
        // If task container only contains one element, fade out the header before removal from current list view
        if ($completeButton.closest('.taskContainer').children().length === 1) {

          // fade out the header and the task
          $completeButton.closest('.taskContainer').siblings().fadeOut(500);
          $completeButton.closest('.task').animate({
            height: '5px',
            opacity: 0
          }, 500);
          // set a timeout to remove the HTML of the task after its been faded out
          setTimeout(()=> {
            $completeButton.closest('.task').remove();
            $completeButton.closest('.taskContainer').siblings().hide();
            checkTask();
          },500);

        } else {
          // fades out the task
          $completeButton.closest('.task').animate({
            height: '0px',
            opacity: 0
          }, 500);
          // sets a timeout to remove the HTML of the task after its been faded out
          setTimeout(()=> {
            $completeButton.closest('.task').remove();
          },500);
        }
      });
  });
};

// Function that takes care of deleting a task
const deleteTask = () => {
  $(document).on('click', '.delete', function() {
    const $deleteButton = $(this);
    const taskID = $deleteButton.closest('.task').attr('id');
    $.ajax({
      type: 'DELETE',
      url: `/tasks/${taskID}`,
    })
      .done(() => {
        // If task container only contains one element, fade out the header before removal from current list view
        if ($deleteButton.closest('.taskContainer').children().length === 1) {

          // fade out the header and the task
          $deleteButton.closest('.taskContainer').siblings().fadeOut(500);

          // set a timeout to remove the HTML of the task after its been faded out
          setTimeout(() => {
            $deleteButton.closest('.taskContainer').siblings().hide();
            $deleteButton.closest(".task").remove();
            checkTask();
          },500);

          // removes the task in a collapsing way.
          $deleteButton.closest('.task').animate({
            fontSize: '0.1em',
            opacity: 0
          }, 500);

        } else {

          // removes the task in a collapsing way.
          $deleteButton.closest('.task').animate({
            fontSize: '0.1em',
            opacity: 0
          }, 500);
          //sets a timeout to remove the HTML of the task after its been faded out
          setTimeout(() => {
            $deleteButton.closest(".task").remove();
          },500);
        }
      });
  });
};

// This function takes care of editing a task if it is miscategorized
const updateTask = () => {
  $(document).on('submit','#edit-task-form', (event) => {
    event.preventDefault();

    const modal = $('#edit-task-popup');
    const taskID = $('body').data().taskID;
    const textObj = $('#edit-task-description');
    const serializeValue = $('#edit-task-form').serialize();

    $.ajax({
      type: 'PUT',
      url: `/tasks/${taskID}`,
      data: serializeValue
    })
      .done(() => {
        $('#edit-task-popup').fadeOut(500);
        setTimeout(() => {
          $('#edit-task-popup').toggleClass('show');
        }, 500);
        textObj.val("");
        renderTasks();
      });
  });
};

// Assister function to clear containers prior to rendering
const clearTasks = () => {
  $(".watch.taskContainer").empty();
  $(".eat.taskContainer").empty();
  $(".read.taskContainer").empty();
  $(".buy.taskContainer").empty();
  $(".null.taskContainer").empty();

  $('.h2.watch').hide();
  $('.h2.eat').hide();
  $('.h2.read').hide();
  $('.h2.buy').hide();
  $('.h2.null').hide();
};

// created the list of tasks - assister function for renderTasks
const taskListBuilder = (task) => {
  const newTask = createTaskElement(task);
  if (task.category === 'watch') {
    $('.h2.watch').show();
    $('.watch.taskContainer').append(newTask);
  } else if (task.category === 'eat') {
    $('.h2.eat').show();
    $('.eat.taskContainer').append(newTask);
  } else if (task.category === 'read') {
    $('.h2.read').show();
    $('.read.taskContainer').append(newTask);
  } else if (task.category === 'buy') {
    $('.h2.buy').show();
    $('.buy.taskContainer').append(newTask);
  } else {
    $('.h2.null').show();
    $('.null.taskContainer').append(newTask);
  }
};

// function thats takes care of rendering tasks to the webpage
const renderTasks = (completedTask = false) => {
  clearTasks();
  $.get('/tasks')
    .then(data => {
      for (const taskID in data) {
        const task = data[taskID];
        if (!completedTask && !task.completed) {
          taskListBuilder(task);
        } else if (completedTask && task.completed) {
          taskListBuilder(task);
        }
      }
      checkTask();
    });
  $main.fadeIn(1000);
};

// function that assists when a new task is submitted
const submitTask = () => {

  let clickDisabled = false;

  $(document).on('submit', '#new-task-form', (event) => {
    event.preventDefault();
    if (clickDisabled) {
      return;
    }
    clickDisabled = true;
    setTimeout(function() {
      clickDisabled = false;
    },2000);

    const input = $('#new-task-form');
    const textObj = input.find('#task-description');

    const serializedText = textObj.serialize();
    const textValue = textObj.val();

    const error = input.find('#error');
    const errorIcon = `<i class="fas fa-exclamation-triangle"></i>`;
    error.html("");
    // client-side error checking prior to posting the value
    if (textValue === "" || textValue === null) {
      error.append(`${errorIcon}  Error: task description cannot be empty`);
      textObj.focus();
    } else {
      const modal = $('#new-task-popup');
      $.ajax({
        type: "POST",
        url: '/tasks/',
        data: serializedText
      })
        .done(() => {
          $('#new-task-popup').fadeOut(500);
          (modal.toggleClass('show'));
          textObj.val('');
          renderTasks();
        });
    }
  });
};

// function that takes care of category display based on category button clicked.
const categoryShow = function(category) {
  switch (category) {
  case 'watch':
    $(".category-watch").show();
    $(".category-eat").hide();
    $(".category-read").hide();
    $(".category-buy").hide();
    $(".category-null").hide();
    break;
  case 'eat':
    $(".category-watch").hide();
    $(".category-eat").show();
    $(".category-read").hide();
    $(".category-buy").hide();
    $(".category-null").hide();
    break;
  case 'all':
    $(".category-watch").show();
    $(".category-eat").show();
    $(".category-read").show();
    $(".category-buy").show();
    $(".category-null").show();
    break;
  case 'read':
    $(".category-watch").hide();
    $(".category-eat").hide();
    $(".category-read").show();
    $(".category-buy").hide();
    $(".category-null").hide();
    break;
  case 'buy':
    $(".category-watch").hide();
    $(".category-eat").hide();
    $(".category-read").hide();
    $(".category-buy").show();
    $(".category-null").hide();
    break;
  case 'null':
    $(".category-watch").hide();
    $(".category-eat").hide();
    $(".category-read").hide();
    $(".category-buy").hide();
    $(".category-null").show();
    break;
  case 'completed':
    $(".category-watch").show();
    $(".category-eat").show();
    $(".category-read").show();
    $(".category-buy").show();
    $(".category-null").show();
    break;
  }
};

// function that assists with displaying 'No tasks on page'
const checkTask = function() {
  let count = 0;
  let count2 = 0;
  // execute fadeout, then execute check for tasks
  $('#no-task-msg').fadeOut(1000, () => {
    $('#no-task-msg').remove();
    $('#tasks-container').show();

    $('#tasks-container').children('div').each(function() {
      if ($(this).css('display') !== 'none' && $(this).find('.taskContainer').children().length === 0) {
        count++;
      }
    });
    $('#tasks-container').children('div').each(function() {
      if ($(this).css('display') !== 'none') {
        count2++;
      }
    });

    if (count === count2) {
      $('#tasks-container').hide();
      $('main').append(`<p id="no-task-msg">There are no tasks here!</p>`);
      $('#no-task-msg').fadeIn(1000);
    }
  });

  // executes code if no task message does not already exist

  $('#tasks-container').children('div').each(function() {
    if ($(this).css('display') !== 'none' && $(this).find('.taskContainer').children().length === 0) {
      count++;
    }
  });
  $('#tasks-container').children('div').each(function() {
    if ($(this).css('display') !== 'none') {
      count2++;
    }
  });
  // If current displayed task category has no tasks, append the no tasks message
  if (count === count2) {
    $('#tasks-container').hide();
    $('main').append(`<p id="no-task-msg">There are no tasks here!</p>`);
    $('#no-task-msg').fadeIn(1000);
  }
};
