//User credentials
let yourImbdToken = 0;
let userName;
let userEmail;
let userPassword = "";
let userToken;
//Credentials inputs
const createName = document.getElementById("create_name");
const createEmail = document.getElementById("create_email");
const createPassword = document.getElementById("create_password");
const comparePassword = document.getElementById("compare_password");
const logInEmail = document.getElementById("login_email");
//Credentials DOM
const createAlert = document.querySelector('.modal_signin_alert');
const signInModal = document.querySelector('.modal_signin');
const needToLogAlert = document.querySelector('.needtologin_alert');
//DOM elements
const mainDom = document.querySelector('.main');

function createUserToken() {
    for (let i = 0; i < 6; i++) {
        yourImbdToken += Math.random().toString(36).substring(2)
    }
    return yourImbdToken;
};

function checkUserExist(userEmail) {
    if (localStorage.getItem("yourImdbUserServer")) {
        if (JSON.parse(localStorage.getItem("yourImdbUserServer"))[1] === userEmail) {
            return true;
        }
        else {
            return false;
        }
    }
    return false;
}

function checkCredentialsExists() {
    userEmail = createEmail.value;
    if (checkUserExist(userEmail)) {
        needToLogAlert.classList.remove("hide");
        //alert("You're already signed, please log in.")
        setTimeout(logInButtonClick, 5000);
        logInEmail.value = createEmail.value;
        return false;
    } else {
        return userEmail;
    }
}

function checkPassValid() {
    userPassword = createPassword.value;
    if (userPassword.length <= 7) {
        alert("To short password");
        return false;
    } else {
        if (userPassword === comparePassword.value) {
            return userPassword;
        } else {
            alert("You entered doesn't same passwords");
            return false;
        }
    }
}

function checkCredentialsFilled() {
    if (!createEmail.value || !createName.value || !createPassword.value || !comparePassword.value) {
        createAlert.classList.remove("hide");
        alert("Not all fields are filled!");
        return false;
    } else {
        return true;
    }
}

function setCredentialsToServer(serverCredentials) {
    localStorage.setItem("yourImdbUserServer", JSON.stringify(serverCredentials));  //server emulation
}

export function createUser() {
    let userCredentials = [];
    let serverCredentials = [];
    createAlert.classList.add("hide");
    if (!checkCredentialsFilled()) {
        return;
    }
    userName = createName.value;
    if (!checkCredentialsExists()) {
        return;
    }
    if (checkPassValid()) {
        userToken = createUserToken();
        userCredentials = [userName, userEmail, new Date(), userToken];
        serverCredentials = [userName, userEmail, new Date(), userToken, userPassword]
        setCredentialsToServer(serverCredentials);
        alert("You're succesfully registered!");
        signInModal.classList.add('hide');
        mainDom.classList.remove('hide');
    }
};
