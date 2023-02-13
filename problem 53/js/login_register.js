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
</div>`;

document.querySelector("a").addEventListener("click", register);

function register() {
    document.querySelector("#link").classList.toggle("selected");
    if (document.querySelector("#link").classList.contains("selected")) {
        new_user();
        document.querySelector("button").textContent = "Register";
    } else {
        login();
        document.querySelector("button").textContent = "Login";
    }
}
let request = new Request("https://teaching.maumt.se/apis/access/");

let input_one = document.querySelector("input[type='User Name']");
let input_two = document.querySelector("input[type='Password']");




function login() {
    document.querySelector("body").style.backgroundColor = "turquoise";
    document.querySelector("main h1").textContent = "LOGIN";
    document.querySelector("a").textContent = "New to this? Register for free";
    document.querySelector("#text_under_password").textContent = "Let the magic begin!";
    // document.querySelector("button").textContent = "Login";
}


function new_user() {
    document.querySelector("body").style.backgroundColor = "green";
    document.querySelector("main h1").textContent = "REGISTER";
    document.querySelector("a").textContent = "Already have an account? Go to loggin";
    document.querySelector("#text_under_password").textContent = "Ready when you are...";
    // document.querySelector("button").textContent = "Register";
}

async function send_post() {

    let rqst = await fetch(request, {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            action: "register",
            user_name: input_one.value,
            password: input_two.value
        }),
    });

    let resource = await rqst.json();
    console.log(resource);
    console.log(rqst);

    if (rqst.ok) {
        console.log("tjena");
    }
}


