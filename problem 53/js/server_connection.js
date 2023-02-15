"use strict"
let request = "https://teaching.maumt.se/apis/access/";

async function send_response(link) {
    let rqst = await fetch(link)
    return rqst;
}


async function send_post() {

    try {
        document.querySelector(".feedback").classList.add("visible");
        document.querySelector("#filter").classList.add("visible");
        document.querySelector(".feedback").innerHTML = `
        <p> Connectning to server.. </p>
        `;

        let rqst = await send_response(request, {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
                action: "register",
                user_name: input_one.value,
                password: input_two.value
            }),
        });

        console.log(rqst);
        console.log(input_one.value);
        console.log(input_two.value);


        if (rqst.ok) {
            document.querySelector(".feedback").classList.add("visible");
            document.querySelector("#filter").classList.add("visible");
            document.querySelector(".feedback").innerHTML = `
        <p>Registration complete</p>
        <p>Please proceed to login</p>
        <button>CLOSE</button>
        `;
        } else {
            document.querySelector(".feedback").classList.add("visible");
            document.querySelector("#filter").classList.add("visible");
            document.querySelector(".feedback").innerHTML = `
        <p>${rqst.statusText}</p>
        <button>OK</button>`;
            switch (rqst.status) {
                case 418:
                    document.querySelector(".feedback").innerHTML = `
                <p>The server thinks it's not a teapot!</p>
                <button>OK</button>`;
                    break;
                case 409:
                    document.querySelector(".feedback").innerHTML = `
                    <p>Sorry, that name is taken. Please try with another one</p>
                    <button>OK</button>`;
                    break;
            }
        }
    }
    catch (e) {
        document.querySelector(".feedback").innerHTML = `
    <p>${e.message}</p>
    <button>OK</button>`;
        console.log(e);
    }

    document.querySelector(".feedback button").addEventListener("click", toggle_button);

}

function toggle_button() {
    document.querySelector(".feedback").classList.remove("visible");
    document.querySelector("#filter").classList.remove("visible");
}

async function get_post() {
    document.querySelector(".feedback").classList.add("visible");
    document.querySelector("#filter").classList.add("visible");
    document.querySelector(".feedback").innerHTML = `
    <p> Connectning to server.. </p>
    `;

    let response = await send_response(`${request}?action=check_credentials&user_name=${input_one.value}&password=${input_two.value}`);


    console.log(response);
    if (response.ok) {
        document.querySelector("main").innerHTML = `
        <div class="user">
        <div> ${input_one.value} </div>
        <button>LOG OUT </button>
        </div>
        <img src="/media/logo.png">
        <div id="image"></div>
    `;

        get_alternatives();
        toggle_button();
    } else {
        document.querySelector(".feedback").classList.remove("visible");
        document.querySelector("#filter").classList.remove("visible");
        document.querySelector("#text_under_password").textContent = "Wrong username or password"
        document.querySelector("#text_under_password").style.backgroundColor = "white";

    }

    // sessionStorage.setItem("currentloggedin", input_one);
}