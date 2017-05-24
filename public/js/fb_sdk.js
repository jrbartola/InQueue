window.fbAsyncInit = function() {
  FB.init({
    appId      : '655501524640528',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.AppEvents.logPageView();
  FB.Event.subscribe('xfbml.render', finished_rendering);
  // Check login status of current user's facebook
  checkLoginState();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    console.log("Reponse from facebook login authentication is...");
    if (response.status === 'connected') {
      //console.log(response.authResponse.accessToken);
      // Redirect to main screen from here...
    }
    console.log(response);
  });
}

var finished_rendering = function() {
  //console.log("finished rendering plugins");
  var spinner = document.getElementById("spinner");
  spinner.removeAttribute("style");
  spinner.removeChild(spinner.childNodes[0]);
}