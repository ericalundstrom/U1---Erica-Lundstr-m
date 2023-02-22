"use strict"

function where_to() {

    //inloggad eller ej? Kolla status.
    if (localStorage.getItem("user_name") === null) {
        load_structure_of_start_page();
    } else {
        create_quiz(localStorage.getItem("user_name"));
    }
}

function load_structure_of_start_page() {
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

    document.querySelector("a").addEventListener("click", register_or_login);

    function register_or_login() {
        document.querySelector("#link").classList.toggle("selected");
        if (document.querySelector("#link").classList.contains("selected")) {
            register();
        } else {
            login();
        }
    }


    document.querySelector("main button").addEventListener("click", check_button);


    function check_button() {
        let input_one = document.querySelector("input[type='User Name']");
        let input_two = document.querySelector("input[type='Password']");

        if (input_one.value === "" && input_two.value === "") {

            document.querySelector(".feedback").classList.add("visible");
            document.querySelector("#filter").classList.add("visible");
            document.querySelector(".feedback").innerHTML = `
             <p>  Write your username and password </p>
             <button> Ok </button>
             `;

            document.querySelector(".feedback button").addEventListener("click", remove_classes);

        } else {
            if (document.querySelector("button").textContent === "Register") {
                register_user(input_one, input_two);
            } else {
                login_user();
            }
        }
    }


    function login() {
        document.querySelector("#wrapper").style.transition = "background-color 1s";
        document.querySelector("#wrapper").style.backgroundColor = "turquoise";
        document.querySelector("#wrapper h1").textContent = "LOGIN";
        document.querySelector("a").textContent = "New to this? Register for free";
        document.querySelector("#text_under_password").textContent = "Let the magic begin!";
        document.querySelector("button").textContent = "Login";
    }


    function register() {
        document.querySelector("#wrapper").style.transition = "background-color 1s";
        document.querySelector("#wrapper").style.backgroundColor = "green";
        document.querySelector("#wrapper h1").textContent = "REGISTER";
        document.querySelector("a").textContent = "Already have an account? Go to login";
        document.querySelector("#text_under_password").textContent = "Ready when you are...";
        document.querySelector("button").textContent = "Register";
    }
}
