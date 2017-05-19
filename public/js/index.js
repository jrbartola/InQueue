/*
 * Index.js jQuery handlers
 */

$(document).ready(function() {

$('.login-btn').on('click', function() {

  swal({
    title: 'Enter the party!',
    html:
      '<span style="display:block;text-align:left;">Email</span>' +
      '<input id="swal-login" type="email" class="swal2-input">' +
      '<span style="display:block;text-align:left;">Password</span>' +
      '<input id="swal-password" type="password" class="swal2-input">',
    preConfirm: function () {
      return new Promise(function (resolve) {
        resolve([
          $('#swal-login').val(),
          $('#swal-password').val()
        ])
      })
    },
    onOpen: function () {
      $('#swal-login').focus()
    }
  }).then(function (result) {
  	if (!validateEmail(result[0])) {
      swal({
      	title: 'Uh oh!',
      	text: 'Incorrect email/password combination',
      	type: 'error'
      });
  	} else {
    
    // Send login data to authentication API...

	}
    
    //swal(JSON.stringify(result))
  }).catch(swal.noop)
  
});

$('.register-btn').on('click', function() {


  swal.setDefaults({
    input: 'text',
    confirmButtonText: 'Next &rarr;',
    showCancelButton: true,
    animation: true
    //progressSteps: ['Email', 'Setup', '3']
  })

  var steps = [
    {
      title: 'What is your email address?',
      input: 'email'
    },
    {
      title: 'Set a password',
      input: 'password'
    },
    {
      title: 'Confirm your password',
      input: 'password'
    }
  ]

  swal.queue(steps).then(function (result) {
    swal.resetDefaults()
    if (result[1] != result[2]) {
      swal({
        title: 'Uh oh!',
        text: 'Your passwords do not match. Try again',
        type: 'error',
        confirmButtonText: 'Okay',
        showCancelButton: false
      })
    } else {

      // Make call to registration API here...
      swal({
        title: 'All done!',
        text: 'You may now log in with your new credentials',
        type: 'success',
        confirmButtonText: 'Nice!',
        showCancelButton: false
      })
    }
  }, function () {
    swal.resetDefaults()
  })
});





// End $(document).ready
});