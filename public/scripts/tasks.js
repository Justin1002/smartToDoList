const animateCategoryDisplay = function(callback, category) {
  $('#tasks-container').fadeOut(1000).promise().then(function() {
    $('#tasks-container').css('display','none');
    callback(category);
    $('#tasks-container').fadeIn(1000);
    checkTask();
  });
};
// let clickDisabled = false;
// if (clickDisabled) {
//   return;
// }
// clickDisabled = true
// setTimeout(function(){clickDisabled = false;},2000);

$(document).ready(function() {
  $(document).on('click','.watch-category-btn', (event) => {
    animateCategoryDisplay(categoryShow,'watch');
  });

  $(document).on('click', '.all-category-btn', () => {
    animateCategoryDisplay(categoryShow,'all');
  });

  $(document).on('click', '.eat-category-btn', () => {
    animateCategoryDisplay(categoryShow,'eat');
  });

  $(document).on('click', '.read-category-btn', () => {
    animateCategoryDisplay(categoryShow,'read');
  });

  $(document).on('click','.buy-category-btn', () => {
    animateCategoryDisplay(categoryShow,'buy');
  });

  $(document).on('click', '.null-category-btn', () => {
    animateCategoryDisplay(categoryShow,'null');
  });

  let clickDisabled = false;

  $(document).on('click', '.completed-category-btn', () => {
    if (clickDisabled) {
      return;
    }
    clickDisabled = true;
    setTimeout(function() {
      clickDisabled = false;
    },2000);
    $('#tasks-container').fadeOut(1000).promise().then(function() {
      $('#tasks-container').css('display','none');
      categoryShow('completed');
      renderTasks(true);
      $('#tasks-container').fadeIn(1000);
    });
  });

  completeTask();
  updateTask();
  deleteTask();
  submitTask();
});

const escape =  function(str) {
  let a = document.createElement('a');
  a.appendChild(document.createTextNode(str));
  return a.innerHTML;
};

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
        if ($completeButton.closest('.taskContainer').children().length === 1) {
          $completeButton.closest('.taskContainer').siblings().fadeOut(500);
          $completeButton.closest('.task').animate({
            height: '5px',
            opacity: 0
          }, 500);

          setTimeout(()=> {
            $completeButton.closest('.task').remove();
            $completeButton.closest('.taskContainer').siblings().hide();
            checkTask();
          },500);

        } else {
          $completeButton.closest('.task').animate({
            height: '0px',
            opacity: 0
          }, 500);

          setTimeout(()=> {
            $completeButton.closest('.task').remove();
          },500);
        }
      });
  });
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
        if ($deleteButton.closest('.taskContainer').children().length === 1) {
          $deleteButton.closest('.taskContainer').siblings().fadeOut(500);
          setTimeout(() => {
            $deleteButton.closest('.taskContainer').siblings().hide();
            checkTask();
          },500);

          setTimeout(() => {
            $deleteButton.closest(".task").remove();
            checkTask();
          },500);

          $deleteButton.closest('.task').animate({
            fontSize: '0.1em',
            opacity: 0
          }, 500);

        } else {
          $deleteButton.closest('.task').animate({
            fontSize: '0.1em',
            opacity: 0
          }, 500);

          setTimeout(() => {
            $deleteButton.closest(".task").remove();
          },500);
        }
      });
  });
};

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

const checkTask = function() {
  let count = 0;
  let count2 = 0;
  //execute fadeout, then execute code
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

  //executes code if msg does not exist
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
};
