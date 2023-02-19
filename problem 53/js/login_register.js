"use strict"

function load_page() {

    //inloggad eller ej? Kolla status.
    if (localStorage.getItem("user_name") === null) {
        load_structure();
    } else {
        create_the_quiz(localStorage.getItem("user_name"));
    }
}

const input_one = document.querySelector("input[type='User Name']");
const input_two = document.querySelector("input[type='Password']");

function load_structure() {
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


    document.querySelector("main button").addEventListener("click", check_button);


    async function check_button() {
        const input_one = document.querySelector("input[type='User Name']");
        const input_two = document.querySelector("input[type='Password']");

        if (input_one.value === "" && input_two.value === "") {

            document.querySelector(".feedback").classList.add("visible");
            document.querySelector("#filter").classList.add("visible");
            document.querySelector(".feedback").innerHTML = `
             <p>  Write your username and password </p>
             <button> Ok </button>
             `;

            document.querySelector(".feedback button").addEventListener("click", toggle_button);

        } else {
            if (document.querySelector("button").textContent === "Register") {
                register_user(input_one, input_two);
            } else {
                login_function();
            }
        }

    }


    function login() {
        document.querySelector("#wrapper").style.backgroundColor = "turquoise";
        document.querySelector("#wrapper h1").textContent = "LOGIN";
        document.querySelector("a").textContent = "New to this? Register for free";
        document.querySelector("#text_under_password").textContent = "Let the magic begin!";
        document.querySelector("#text_under_password").style.backgroundColor = "turquoise";
        document.querySelector("button").textContent = "Login";

    }


    function new_user() {
        document.querySelector("#wrapper").style.backgroundColor = "green";
        document.querySelector("#wrapper h1").textContent = "REGISTER";
        document.querySelector("a").textContent = "Already have an account? Go to loggin";
        document.querySelector("#text_under_password").textContent = "Ready when you are...";
        document.querySelector("#text_under_password").style.backgroundColor = "green";
        document.querySelector("button").textContent = "Register";

    }
}
