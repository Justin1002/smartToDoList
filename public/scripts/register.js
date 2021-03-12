$(() => {
  // Handle the submission of the register form
  $(document).on('submit','#register-form', function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    register(serializedData);
  });
});

// Create and add header when user registers
const register = function(data) {
  $.ajax({
    	method: "POST",
    	url:'/users/',
    	data: data,
    })
    .then(data => {
      createHeaderDiv(data);
      appendMain(data);
    });
};
