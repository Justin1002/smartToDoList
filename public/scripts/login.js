$(() => {
  $(document).on('submit','#login-form', function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    login(serializedData)
  })

})

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
      console.log(data)
      createHeaderDiv(data)
      appendMain(data)
    })
}

