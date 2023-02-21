"use strict"


function create_the_quiz(user_name) {

    create_quiz_layout()

    function create_quiz_layout() {

        document.querySelector("#wrapper").style.backgroundImage = "url('media/logo.png'";

        document.querySelector("main").innerHTML = `
         <div class="user">
         <div> ${user_name} </div>
         <button>LOG OUT </button>
         </div>
         <div class="game"></div>
         `;

        start_the_quiz();

        async function start_the_quiz() {

            let array_with_animal = []

            while (array_with_animal.length < 4) {
                const new_dog = ALL_BREEDS[random_number(ALL_BREEDS.length)];
                if (!array_with_animal.includes(new_dog)) {
                    array_with_animal.push(new_dog)
                } else {
                    console.log("finns");
                }
            }


            document.querySelector(".feedback").classList.add("visible");
            document.querySelector("#filter").classList.add("visible");
            document.querySelector(".feedback").classList.add("alert");
            document.querySelector(".feedback").textContent = "Getting a random image....";
            document.querySelector(".feedback").style.backgroundColor = "white";

            let random_dog = array_with_animal[random_number(array_with_animal.length)];

            let link_to_dog = `https://dog.ceo/api/breed/${random_dog.url}/images/random`;


            let picture = await (await get_fetch(link_to_dog)).json();

            document.querySelector("#wrapper").style.removeProperty("background-image");

            document.querySelector(".feedback").classList.remove("visible");
            document.querySelector("#filter").classList.remove("visible");
            document.querySelector(".feedback").classList.remove("alert");


            let photo_of_dog = document.createElement("img");
            photo_of_dog.src = `${picture.message}`;
            photo_of_dog.classList.add("image");

            let alt = document.createElement("div");
            alt.classList.add("alternatives");

            document.querySelector(".game").append(photo_of_dog);
            document.querySelector(".game").append(alt);

            for (let i = 0; i < array_with_animal.length; i++) {
                let button_alt = document.createElement("button");
                button_alt.classList.add("alt");
                document.querySelector(".alternatives").append(button_alt);
                button_alt.textContent = array_with_animal[i].name;
                button_alt.addEventListener("click", log_something);
            }

            document.querySelector("main").style.backgroundImage = "";

            function log_something(event) {
                if (event.target.textContent === random_dog.name) {
                    document.querySelector(".feedback").classList.add("visible");
                    document.querySelector("#filter").classList.add("visible");
                    document.querySelector(".feedback").innerHTML = `
                         <p>Correct!!</p>
                         <button>One more</button>
                     `;
                    document.querySelector(".feedback").style.backgroundColor = "green";
                } else {
                    document.querySelector(".feedback").classList.add("visible");
                    document.querySelector("#filter").classList.add("visible");
                    document.querySelector(".feedback").innerHTML = `
                         <p>Wrong answer! Try again</p>
                         <button>One more</button>
                     `;
                    document.querySelector(".feedback").style.backgroundColor = "red";
                }

                document.querySelector(".feedback button").addEventListener("click", toggle_button);
                document.querySelector(".feedback button").addEventListener("click", create_quiz_layout);
            }
            document.querySelector(".user button").addEventListener("click", logout);
        }
    }
}

console.log(logout);

function logout() {
    localStorage.removeItem("user_name");
    location.reload();
    console.log("hej");
}

