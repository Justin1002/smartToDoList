$(document).ready(function() {

  getUser()
    .then(userObj => {
      console.log(userObj);
      createHeaderDiv(userObj);
    });

  $(document).on('click','#main-page-button', function(event) {
    event.preventDefault();

    $main.children().fadeOut(1000).promise().then(function() {
      $main.empty();
    getUser()
      .then(userObj => {
        createHeaderDiv(userObj);
        appendMain(userObj);
      })
    })
  })

  $(document).on('click', '#logout-button', function(event) {
    event.preventDefault();
    $main.children().fadeOut(1000).promise().then(function() {
      logout()
    })
  });

  $(document).on('click','#register-button', function(event) {
    event.preventDefault();
    $main.children().fadeOut(1000).promise().then(function() {
      $main.empty();
      $main.css('display','none')
      $main.append($registerForm)
      $main.fadeIn(1000)
    })
  });

  $(document).on('click','#login-button', function(event) {
    event.preventDefault();
    $main.children().fadeOut(1000).promise().then(function() {
      $main.empty();
      $main.css('display','none')
      $main.append($loginForm);
      $main.fadeIn(1000)
    })
  });

  $(document).on('click','#update-profile-button', function(event) {
    event.preventDefault();
    // $main.empty();
    // $main.append($updateProfileForm);
    $main.children().fadeOut(1000).promise().then(function() {
      $main.empty();
      $main.css('display','none')
      $main.append($updateProfileForm);
      $main.fadeIn(1000)
    })
  })

  // $(document).on('click', 'header button', function () {

  //   let $visible = $('main:visible')
  //   if ($visible.length === 1) {
  //     $visible.fadeOut(500 , () => {
  //       $visible.fadeIn(500)
  //     })
  //   }
  //   else {
  //     $visible.fadeIn(5000)
  //   }
  // })

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
  const $pageHeader = $("#header");
  $pageHeader.empty();
  const $logo = $(`<button id=main-page-button>To Do <i class="fas fa-list"></i></button>`);
  $('#header').append($logo);
  if (Object.keys(user).length > 0) {
    const $div = $(`
			<div>
        <h1>Hello,</h1>
      <button id ="update-profile-button">
			  ${user.name}
      </button>
				<button id="logout-button">logout</i></button>
			</div>
		`);
    $('#header').append($div);
  } else {
    const $div = $(`
      <div>
        <button id="register-button">Register</button>
			  <button id="login-button">Login</button>
			</div>
		`);
    $('#header').append($div);
  }
};

const getUser = function() {
  return $.ajax({
    url: "/users/",
  })
    .then(userObj => {
      return userObj;
    });
};


const logout = function() {
  $.ajax({
    method: "GET",
    url: '/logout',
  })
    .then(data => {
      $main.empty();
      $main.css('display','none')
      createHeaderDiv({});
      appendMain({});
      $main.fadeIn(1000)
    });
};

$registerForm = `<form id=register-form class="form">
<div>
  <div class="container">
    <div>
      <label for="Name"><b>Name</b></label>
      <input type="text" placeholder="Enter Name (required)" name="name" required>
    </div>
    <div>
      <label for="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email (required)" name="email" required>
    </div>
    <div>
      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password (required)" name="password" required>
    </div>
    <div>
    <label for="location"><b>Location</b></label>
    <input type="text" placeholder="Enter Location (required)" name="location" required>
  </div>
    <button type="submit">Register</button>
  </div>
</div>
</form>`

$loginForm = `<form id =login-form class="form">
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

$updateProfileForm = `<form id=update-profile-form class="form">
<div>
  <div class="container">
    <div>
      <label for="Name"><b>Name</b></label>
      <input type="text" placeholder="Enter New Name (optional)" name="name">
    </div>
    <div>
      <label for="email"><b>Email</b></label>
      <input type="text" placeholder="Enter New Email (optional)" name="email">
    </div>
    <div>
      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter New Password (optional)" name="password">
    </div>
    <div>
    <label for="location"><b>Location</b></label>
    <input type="text" placeholder="Enter New Location (optional)" name="location">
  </div>
    <button type="submit">Update Profile</button>
  </div>
</div>
</form>`
