"use strict"

document.querySelector("main").innerHTML = `<h1>LOGIN</h1>
<div class="inputs">
    <label for="User Name">User Name:</label>
    <br>
    <input type="User Name">
</div>
<div class="inputs">
    <label for="Password">Password:</label>
    <br>
    <input type="Password">
</div>
<div id="text_under_password">Let the magic begin!</div>
<button>Login</button>
<div id="link">
<a href="#">New to this? Register for free</a>
</div>
`;

document.querySelector("a").addEventListener("click", register);

function register() {
    document.querySelector("#link").classList.toggle("selected");
    if (document.querySelector("#link").classList.contains("selected")) {
        new_user();
    } else {
        login();
    }
}


const input_one = document.querySelector("input[type='User Name']");
const input_two = document.querySelector("input[type='Password']");

document.querySelector("main button").addEventListener("click", check_button);


async function check_button() {
    if (document.querySelector("button").textContent === "Register") {
        send_post();
    } else {
        get_post();
    }
}


function login(params) {
    document.querySelector("body").style.backgroundColor = "turquoise";
    document.querySelector("main h1").textContent = "LOGIN";
    document.querySelector("a").textContent = "New to this? Register for free";
    document.querySelector("#text_under_password").textContent = "Let the magic begin!";
    document.querySelector("button").textContent = "Login";
    console.log("nu är vi i login_function");

}


function new_user() {
    document.querySelector("body").style.backgroundColor = "green";
    document.querySelector("main h1").textContent = "REGISTER";
    document.querySelector("a").textContent = "Already have an account? Go to loggin";
    document.querySelector("#text_under_password").textContent = "Ready when you are...";
    document.querySelector("button").textContent = "Register";

}


