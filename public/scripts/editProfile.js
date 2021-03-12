$(() => {
  // Handle submission of update profile form
  $(document).on('submit','#update-profile-form', function(event) {
    event.preventDefault();
    const serializedData = $('#update-profile-form').serialize();
    editProfile(serializedData);
  });
});

// If user decides to edit their profile, make a put request and refresh the header and main page
const editProfile = function(data) {
  $.ajax({
    	method: "PUT",
    	url:'/users',
    	data: data,
    	success: alert('Profile changed!')
    })
    .then(() => {
      return getUser();
      })
    .then(userObj => {
      createHeaderDiv(userObj);
      appendMain(userObj);
    });
};
