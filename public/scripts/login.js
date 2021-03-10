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
  })
    .then( data => {
      location.reload()
    })
}

