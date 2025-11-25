
//  SIGN UP AND LOGIN PAGE
window.addEventListener('load', function() {
  let savedUser = localStorage.getItem('savedUsername');
  if (savedUser) {
    let usernameInput = document.querySelector('.login1-1 input[type="text"]');
    let rememberCheckbox = document.getElementById('rememberMe');
    if (usernameInput) usernameInput.value = savedUser;
    if (rememberCheckbox) rememberCheckbox.checked = true;
  }
});

document.querySelector('.login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  let usernameInput = document.querySelector('.login1-1 input[type="text"]');
  let rememberCheckbox = document.getElementById('rememberMe');

  if (rememberCheckbox && rememberCheckbox.checked) {
    localStorage.setItem('savedUsername', usernameInput.value);
  } else {
    localStorage.removeItem('savedUsername');
  }
  window.location.href = "login.html";

});


function goToSignup() {
  window.location.href = "login-signup.html";
}


function goToLogin() {
  window.location.href = "login-signup.html";
}
function goToSignup() {
    document.getElementById("logincontainer").style.display = "none";
    document.getElementById("signupcontainer").style.display = "flex";
}

function goToLogin() {
    document.getElementById("signupcontainer").style.display = "none";
    document.getElementById("logincontainer").style.display = "flex";
}
// END OF SIGN UP/LOGIN