"use strict"

let random_dog = ALL_BREEDS[random_number(ALL_BREEDS.length)];

console.log(random_dog.name);

let link_to_dog = `https://dog.ceo/api/breed/${random_dog.url}/images/random`;

async function get_alternatives() {


    let picture = await (await send_response(link_to_dog)).json();
    console.log(picture);

    document.querySelector("main").innerHTML = `
     <div class="user">
     <div> ${input_one.value} </div>
     <button>LOG OUT </button>
     </div>
     <div class="image" style="background-image:url(${picture.message})"></div>
    <div class="alternatives">
        <button class="alt">${ALL_BREEDS[random_number(ALL_BREEDS.length)].name}</button>
        <button class="alt">${ALL_BREEDS[random_number(ALL_BREEDS.length)].name}</button>
        <button class="alt">${random_dog.name}</button>
        <button class="alt">${ALL_BREEDS[random_number(ALL_BREEDS.length)].name}</button>
    </div>
     `;


}

console.log(random_dog);

// let random_picture = ALL_BREEDS[random_number(ALL_BREEDS.length)].url

function random_number(max) {
    return Math.floor(max * Math.random());
}






