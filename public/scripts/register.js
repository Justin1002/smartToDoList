$(() => {
  $(document).on('submit','#register-form', function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    register(serializedData)
  })

})

const register = function(data) {

  $.ajax({
    method: "POST",
    url:'/users/',
    data: data,
    })
    .then( data => {
      console.log(data)
      createHeaderDiv(data)
      appendMain(data)
    })
}

