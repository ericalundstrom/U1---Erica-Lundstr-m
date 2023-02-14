"use strict"
let request = "https://teaching.maumt.se/apis/access/";

async function send_post() {

    try {
        document.querySelector(".feedback").classList.add("visible");
        document.querySelector("#filter").classList.add("visible");
        document.querySelector(".feedback").innerHTML = `
        <p> Connectning to server.. </p>
        `;


        let rqst = await fetch(request, {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
                action: "register",
                user_name: input_one.value,
                password: input_two.value
            }),
        });

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

    const response = await fetch(
        `${request}?action=check_credentials&user_name=${input_one.value}&password=${input_two.value}`
    );

    if (response.ok) {
        start_the_quiz();
        toggle_button();

    } else {
        document.querySelector(".feedback").classList.add("visible");
        document.querySelector("#filter").classList.add("visible");
        document.querySelector(".feedback").innerHTML = `
      ${response.statusText}
      <p>Wrong password, try again</p>
      <button>OK</button>
      `;
    }

    document.querySelector(".feedback button").addEventListener("click", toggle_button);

}