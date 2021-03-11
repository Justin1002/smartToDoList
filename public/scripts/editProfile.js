$(() => {
  $(document).on('submit','#update-profile-form', function(event) {
    event.preventDefault();
    console.log('click')
    const serializedData = $('#update-profile-form').serialize();
    console.log(serializedData)
    editProfile(serializedData)
  })

})

const editProfile = function(data) {

  $.ajax({
    method: "PUT",
    url:'/users',
    data: data,
    success: alert('Profile changed!')
    })
    .then(() => {
      return getUser()
      })
    .then(userObj => {
      console.log(userObj);
      createHeaderDiv(userObj);
      appendMain(userObj);
    })
}

