//  SIGN UP AND LOGIN PAGE

function addLog(activity) {
    let logs = JSON.parse(localStorage.getItem("systemLogs")) || [];

    logs.push({
        id: logs.length + 1,
        activity: activity,
        timestamp: new Date().toLocaleString()
    });

    localStorage.setItem("systemLogs", JSON.stringify(logs));
}
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

  let userIn = document.querySelector('#logincontainer input[type="text"]');
  let passIn = document.querySelector('#logincontainer input[type="password"]');
  userIn.style.border = "2px solid transparent";
  passIn.style.border = "2px solid transparent";

  //remember me box
 
  if (rememberCheckbox && rememberCheckbox.checked) {
    localStorage.setItem('savedUsername', username);
  } else {
    localStorage.removeItem('savedUsername');
  }

  let registeredUsers = JSON.parse(localStorage.getItem("registeredUser")) || [];
  if (!Array.isArray(registeredUsers)) registeredUsers = [];

  let foundUser = registeredUsers.find(acc => acc.username === username && acc.password === password);

  //admin login
 
  if (username === adminUser && password === adminPass) {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "admin.html";
    return;
  } 

  if (foundUser) {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "home1.html";
    return;
  }
});

document.querySelector("#signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let username = document.querySelector('#signupcontainer input[type="text"]').value;
    let password = document.querySelector('#signupcontainer input[type="password"]').value;
    let email = document.querySelector('#signupcontainer input[type="email"]').value;

    let users = JSON.parse(localStorage.getItem("registeredUser")) || [];
    if (!Array.isArray(users)) users = [];

    users.push({
        username: username,
        password: password,
        email: email
    });

    localStorage.setItem("registeredUser", JSON.stringify(users));

    goToLogin();
});



//automatically shows the login/sign up page first
// if (!localStorage.getItem("loggedInUser") &&
//     !window.location.pathname.includes("login-signup.html")) {
//   window.location.href = "login-signup.html";
// }

function goToSignup() {
  document.getElementById("logincontainer").style.display = "none";
  document.getElementById("signupcontainer").style.display = "flex";
}

function goToLogin() {
  document.getElementById("signupcontainer").style.display = "none";
  document.getElementById("logincontainer").style.display = "flex";
}

// END OF SIGN UP/LOGIN
