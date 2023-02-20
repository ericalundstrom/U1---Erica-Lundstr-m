"use strict"

load_page();


function random_number(max) {
    return Math.floor(max * Math.random());
}

function logout() {
    localStorage.removeItem("user_name");
    location.reload();
}

