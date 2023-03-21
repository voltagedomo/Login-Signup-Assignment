// USER LOGIN / SIGNUP

// HTML VARIABLES
let signInBtn = document.getElementById("sign-in-btn");
let signUpBtn = document.getElementById("sign-up-btn");
let usernameInputEl = document.getElementById("username-input");
let passwordInputEl = document.getElementById("password-input");
let passwordConfirmationEl = document.getElementById("password-confimation");
let loginUsernameEl = document.getElementById("login-username");
let loginPasswordEl = document.getElementById("login-password");
// let inputUsername = usernameInputEl.value;
// let inputPassword = passwordInputEl.value;
// let inputConfirmPassword = passwordConfirmationEl.value;

// Global Variables
let users = loadUsers();

// SIGN UP BTN CLICKED
signUpBtn.addEventListener("click", signUpHandler);

function signUpHandler() {
  let username = usernameInputEl.value;
  let password = passwordInputEl.value;
  let passwordConfirm = passwordConfirmationEl.value;
  if (username === "" || password === "" || passwordConfirm === "") {
    // check if input elements are empty
    alert("One or more field is empty.");
  } else {
    // check for username duplicate
    if (findByUsername(username) === "Username not found.") {
      // username is unique, now checking for passwords to match
      if (password === passwordConfirm) {
        // if passwords match and username is unique create add a new user to users array
        users.push(newUser(username, password, passwordConfirm));
        saveUsers();
        alert("Sign Up SUCCESSFUL!");
      } else {
        alert("Your passwords do not match.");
      }
    } else {
      alert("That username is already in use.");
    }
  }
}

// SIGN IN BTN CLICKED
signInBtn.addEventListener("click", signInHandler);

function signInHandler() {
  let username = loginUsernameEl.value;
  let password = loginPasswordEl.value;
  if (username === "" || password === "") {
    alert("One or more fields are empty.");
  } else {
    if (findByUsername(username) !== "Username not found.") {
      let usernameAttempt = findByUsername(username);
      console.log(usernameAttempt);
      if (users[usernameAttempt].password === password) {
        alert("Login SUCCESSFUL!");
      } else {
        alert("Login FAILED.");
      }
    } else {
      alert("Login FAILED.");
    }
  }
}

// Helper Functions
// Return new user details
function newUser(username, password, passwordConfirm) {
  return {
    username: username,
    password: password,
    confirmPassword: passwordConfirm,
  };
}

// Save global User login details to local storage
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

// Load user information from local storage
function loadUsers() {
  let userStr = localStorage.getItem("users");
  return JSON.parse(userStr) ?? [];
}

// Check for username duplicates
function findByUsername(findUsername) {
  let usernameFound = "";
  for (let i = 0; i < users.length; i++) {
    if (users[i].username.indexOf(findUsername) !== -1) {
      usernameFound += i;
    }
  }
  if (usernameFound === "") {
    return "Username not found.";
  } else {
    return usernameFound;
  }
}
