$(() => {
  // Handle the submission of the login form
  $(document).on('submit','#login-form', function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    login(serializedData);
  });
});

// Create the appropriate header when a user logs in or alert them if incorrect login info
const login = function(data) {
  $.ajax({
    method: "POST",
    url:'/login',
    data: data,
    statusCode: {
      401: function() {
        alert('Wrong email or password')
      },
    },
  })
    .then( data => {
      createHeaderDiv(data)
      appendMain(data)
    });
};

