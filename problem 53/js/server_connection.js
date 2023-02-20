"use strict"
async function get_fetch(link) {
    let rqst = await fetch(link)
    return rqst;
}


async function register_user(input_one, input_two) {

    try {
        document.querySelector(".feedback").classList.add("visible");
        document.querySelector("#filter").classList.add("visible");
        document.querySelector(".feedback").innerHTML = `
            <p> Connectning to server.. </p>
            `;

        let rqst = await get_fetch(new Request("https://teaching.maumt.se/apis/access/", {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
                action: "register",
                user_name: input_one.value,
                password: input_two.value,
            }),
        }));

        if (rqst.ok) {
            console.log(rqst);
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
            <button>OK</button>
            `;
            switch (rqst.status) {
                case 418:
                    document.querySelector(".feedback").innerHTML = `
                    <p>The server thinks it's not a teapot!</p>
                    <button>OK</button>
                    `;
                    break;
                case 409:
                    document.querySelector(".feedback").innerHTML = `
                        <p>Sorry, that name is taken. Please try with another one</p>
                        <button>OK</button>
                        `;
                    break;
            }
        }
    }
    catch (e) {
        document.querySelector(".feedback").innerHTML = `
        <p>${e.message}</p>
        <button>OK</button>
        `;
        console.log(e);
    }

    document.querySelector(".feedback button").addEventListener("click", toggle_button);

}

function toggle_button() {
    document.querySelector(".feedback").classList.remove("visible");
    document.querySelector("#filter").classList.remove("visible");
}

async function login_function() {

    try {

        document.querySelector(".feedback").classList.add("visible");
        document.querySelector("#filter").classList.add("visible");
        document.querySelector(".feedback").innerHTML = `
             <p> Connectning to server.. </p>
             `;
        const input_one = document.querySelector("input[type='User Name']");
        const input_two = document.querySelector("input[type='Password']");

        let response = await get_fetch(`https://teaching.maumt.se/apis/access/?action=check_credentials&user_name=${input_one.value}&password=${input_two.value}`);

        if (response.ok) {
            localStorage.setItem("user_name", input_one.value);
            create_the_quiz(input_one.value);
            toggle_button(input_one);
        } else {
            document.querySelector(".feedback").classList.add("visible");
            document.querySelector("#filter").classList.add("visible");
            switch (response.status) {
                case 400:
                    document.querySelector(".feedback").innerHTML = `
                    <p>Bad request</p>
                    <button>OK</button>
                    `;
                    break;
                case 404:
                    document.querySelector(".feedback").classList.remove("visible");
                    document.querySelector("#filter").classList.remove("visible");
                    document.querySelector("#text_under_password").textContent = "Wrong username or password"
                    document.querySelector("#text_under_password").style.backgroundColor = "white";
                    break;
                case 418:
                    document.querySelector(".feedback").innerHTML = `
                     <p>The server thinks it's not a teapot!</p>
                     <button>OK</button>
                     `;
                    break;

            }
            document.querySelector(".feedback button").addEventListener("click", toggle_button);
        }
    } catch (error) {
        console.log(error);
        if (error.message.includes("NetworkError")) {
            document.querySelector(".feedback").classList.add("visible");
            document.querySelector("#filter").classList.add("visible");
            document.querySelector(".feedback").innerHTML = `
            <p> Couldn't reach server, please try again</p>
            <button>OK</button>
            `;
        }
    }
}