"use strict"

function login_data(username, password) {
    let user_info = {
        user_name: username,
        psw: password
    }

    let user_data = JSON.stringify(user_info);
    localStorage.setItem("user", user_data);

}



