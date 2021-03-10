$(document).ready(function() {

  getUser()
    .then(userData => {
      appendMain(userData);
    });
});






//See if user is logged in
//-- If logged in append to main div class = "button group"
// tasks container


//otherwise append to main login page
//
const appendMain = function(user) {
  $main = $('main');

  if (Object.keys(user).length > 0) {
    $('$login-form').remove();
    $('#tasks-container').show();
    $('.button-group').show();
    $('#new-task').show();
  } else {

    $('#tasks-container').hide();
    $('.button-group').hide();
    $('#new-task').hide();

    $loginForm = `<form id="login-form">
    <div>
			<div class="container">
				<div>
					<label for="email"><b>Email</b></label>
      		<input type="text" placeholder="Enter Email" name="email" required>
				</div>
				<div>
					<label for="psw"><b>Password</b></label>
      		<input type="password" placeholder="Enter Password" name="password" required>
				</div>
      	<button type="submit">Login</button>
      </div>
    </div>
  </form>`;
    $main.append($loginForm);
  }
};
