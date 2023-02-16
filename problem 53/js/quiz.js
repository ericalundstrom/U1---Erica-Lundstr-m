"use strict"


async function get_alternatives() {

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

    document.querySelector(".feedback").textContent = "Getting a random image....";
    document.querySelector("main").style.backgroundImage = "url('media/logo.png'";

    get_rest_of_info();

    async function get_rest_of_info() {

        let random_dog = array_with_animal[random_number(array_with_animal.length)];
        // let random_dog = ALL_BREEDS[random_number(ALL_BREEDS.length)];
        console.log(random_dog);

        let link_to_dog = `https://dog.ceo/api/breed/${random_dog.url}/images/random`;


        let picture = await (await send_response(link_to_dog)).json();


        console.log(random_dog);
        console.log(picture.message);

        let photo_of_dog = document.createElement("div");
        photo_of_dog.classList.add("image");
        photo_of_dog.style.backgroundImage = `url(${picture.message})`;
        let alt = document.createElement("div");
        alt.classList.add("alternatives");
        document.querySelector(".game").append(photo_of_dog);
        document.querySelector(".game").append(alt);

        for (let i = 0; i < array_with_animal.length; i++) {
            let button_alt = document.createElement("button");
            button_alt.classList.add("alt");
            document.querySelector(".alternatives").append(button_alt);
            // button_alt.textContent = ALL_BREEDS[random_number(ALL_BREEDS.length)].name;
            button_alt.textContent = array_with_animal[i].name;

            button_alt.addEventListener("click", log_something);
            // button_alt.style.gridArea = `${spots_in_grid[random_number(spots_in_grid.length)].row} / ${spots_in_grid[random_number(spots_in_grid.length)].col}`;
            // let current_spot = spots_in_grid.splice(random_spot, 1);
            // let random_spot = random_number(array_with_animal.length);
            // array_with_animal.splice(random_spot, 1);
        }
        // // let current_spot = spots_in_grid.splice(random_spot, 1);
        // let the_right_one = document.createElement("button");
        // document.querySelector(".alternatives").append(the_right_one);
        // the_right_one.classList.add("alt");
        // // the_right_one.textContent = random_dog.name;
        // the_right_one.textContent = array_with_animal[random_number(array_with_animal.length)].name;
        // the_right_one.addEventListener("click", log_something);





        function log_something(event) {
            console.log(event.target.textContent);
            console.log(random_dog.name);
            if (event.target.textContent === random_dog.name) {
                console.log("rätt");

                document.querySelector(".feedback").classList.add("visible");
                document.querySelector("#filter").classList.add("visible");
                document.querySelector(".feedback").innerHTML = `
            <p>Rätt svar!</p>
            <button>CLOSE</button>
            `;
                document.querySelector(".feedback").style.backgroundColor = "green";
            } else {
                console.log("fel");
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
    }

}

console.log(random_number(4));






// console.log(spots_in_grid);
// console.log(current_spot);

// for (let i = 0; i < 3; i++) {
//     let div_dom = document.createElement("button");
//     document.querySelector("alternatives").append(div_dom);
//     div_dom.textContent = ALL_BREEDS[random_number(ALL_BREEDS.length)].name;

// }


// let all_alternatives = document.querySelectorAll("main button").add


// console.log(all_alternatives);

// let random_picture = ALL_BREEDS[random_number(ALL_BREEDS.length)].url

function random_number(max) {
    return Math.floor(max * Math.random());
}



{/* <button class="alt">${ALL_BREEDS[random_number(ALL_BREEDS.length)].name}</button>
<button class="alt">${ALL_BREEDS[random_number(ALL_BREEDS.length)].name}</button>
<button class="alt">${random_dog.name}</button>
<button class="alt">${ALL_BREEDS[random_number(ALL_BREEDS.length)].name}</button> */}



