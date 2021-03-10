$(() => {
  $(document).on('submit','#register-form', function(event) {
    event.preventDefault();

    const serializedData = $(this).serialize();
    login(serializedData)
  })

})

const register = function(data) {

  $.ajax({
    method: "POST",
    url:'/users/',
    data: data,
    statusCode: {
      401: function() {
        alert('Wrong email or password')
      },
    },
  })
    .then( data => {
      console.log(data)
      createHeaderDiv(data)
      appendMain(data)
    })
}

