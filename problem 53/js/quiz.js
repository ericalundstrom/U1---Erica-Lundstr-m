"use strict"


function get_alternatives() {


    document.querySelector("main").style.backgroundImage = "url('media/logo.png'";

    let array_with_animal = [];
    for (let i = 0; i < 4; i++) {
        array_with_animal.push(ALL_BREEDS[random_number(ALL_BREEDS.length)]);
    }


    console.log(array_with_animal[random_number(4)].url);
    console.log(array_with_animal[random_number(4)].name);
    console.log(array_with_animal);

    document.querySelector("main").innerHTML = `
     <div class="user">
     <div> ${input_one.value} </div>
     <button>LOG OUT </button>
     </div>
     <div class="game"></div>
     `;


    get_rest_of_info();

    async function get_rest_of_info() {
        document.querySelector(".feedback").classList.add("visible");
        document.querySelector("#filter").classList.add("visible");
        document.querySelector(".feedback").classList.add("alert");
        document.querySelector(".feedback").textContent = "Getting a random image....";
        document.querySelector(".feedback").style.backgroundColor = "white";

        let random_dog = array_with_animal[random_number(array_with_animal.length)];

        let link_to_dog = `https://dog.ceo/api/breed/${random_dog.url}/images/random`;


        let picture = await (await get_fetch(link_to_dog)).json();

        document.querySelector(".feedback").classList.remove("visible");
        document.querySelector("#filter").classList.remove("visible");
        document.querySelector(".feedback").classList.remove("alert");

        console.log(picture.message);

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


        function log_something(event) {
            console.log(event.target.textContent);
            console.log(random_dog.name);
            if (event.target.textContent === random_dog.name) {
                document.querySelector(".feedback").classList.add("visible");
                document.querySelector("#filter").classList.add("visible");
                document.querySelector(".feedback").innerHTML = `
            <p>Rätt svar!</p>
            <button>CLOSE</button>
            `;
                document.querySelector(".feedback").style.backgroundColor = "green";
            } else {
                document.querySelector(".feedback").classList.add("visible");
                document.querySelector("#filter").classList.add("visible");
                document.querySelector(".feedback").innerHTML = `
            <p>Fel svar!</p>
            <button>CLOSE</button>
            `;
                document.querySelector(".feedback").style.backgroundColor = "red";
            }

            document.querySelector(".feedback button").addEventListener("click", toggle_button);
            document.querySelector(".feedback button").addEventListener("click", get_alternatives);
        }
        document.querySelector(".user button").addEventListener("click", logout);
    }

}

function random_number(max) {
    return Math.floor(max * Math.random());
}


function logout() {
    console.log("hej");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
}

