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

let adminUser = "admin";
let adminPass = "bobaTea";

document.querySelector('.login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  let username = document.querySelector('#logincontainer input[type="text"]').value;
  let password = document.querySelector('#logincontainer input[type="password"]').value;
  let rememberCheckbox = document.getElementById('rememberMe');

 
  if (rememberCheckbox && rememberCheckbox.checked) {
    localStorage.setItem('savedUsername', username);
  } else {
    localStorage.removeItem('savedUsername');
  }

 
  if (username === adminUser && password === adminPass) {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "home.html";
  } else {
     
  }
});


if (!localStorage.getItem("loggedInUser") &&
    !window.location.pathname.includes("login-signup.html")) {
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
