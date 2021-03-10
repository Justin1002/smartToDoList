$(document).ready(function() {

  getUser()
    .then(userObj => {
      console.log(userObj)
      createHeaderDiv(userObj)
    })

    $(document).on('click', '#logout-button', function(event) {
      event.preventDefault()
      logout()
    })

    $(document).on('click','#register-button', function(event) {
      event.preventDefault()
      $main.empty()
      $('#tasks-container').hide();
      $('.button-group').hide();
      $('#new-task').hide();
    })

    $(document).on('click','#login-button', function(event) {
      event.preventDefault()
      $main.empty()
      $('#tasks-container').hide();
      $('.button-group').hide();
      $('#new-task').hide();
      $main.append($loginForm)
    })

});


// createHeaderDiv('');
// $('#login-button').click(function(event) {
//   console.log('login button clicked');
//   $.ajax({ method: "GET", url: "/login/1"})
//     .then(function() {
//       createHeaderDiv('Alice Le');
//     });
// });
// $('#logout-button').click(function(event) {
//   console.log('logout button clicked');
//   $.ajax({ method: "GET", url: "/logout"})
//     .then(function() {
//       createHeaderDiv('');
//     });
// });

const createHeaderDiv  = (user) => {
  const $pageHeader = $("#header")
  $pageHeader.empty();
  const $logo = $(`<i class="fas fa-check-circle"></i>`);
  $('#header').append($logo);
  if (Object.keys(user).length > 0){
    const $div = $(`
			<div>
				<h1>${user.name}</h1>
				<button id="logout-button"><i class="fas fa-sign-out-alt"></i></button>
			</div>
		`);
    $('#header').append($div);
  } else {
    const $div = $(`
      <div>
        <button id="register-button">Register</button>
      </div>
			<div>
			  <button id="login-button">Login</button>
			</div>
		`);
    $('#header').append($div);
  }
};

const getUser = function () {
  return $.ajax ({
    url: "/users/",
  })
    .then(userObj => {
      return userObj
    })
}


const logout = function() {
  $.ajax({
    method: "GET",
    url: '/logout',
  })
    .then( data => {
      $main.empty()
      createHeaderDiv({})
      appendMain({})

    })
}

