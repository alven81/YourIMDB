import { setCredentialsToLocalstorage } from "./set_credentials_to_localstorage.js";
import { setUserLogin } from "./set_user_login.js";

const userRegisteredName = document.querySelector('.header_main_topbar_register');
const fromLoginModalSignInButton = document.querySelector('.modal_login-signin_button');
const needToSignAlert = document.querySelector('.needtosign_alert');
const logInNotCorrectSpan = document.querySelectorAll('.modal_login_span');
const logInEmail = document.getElementById("login_email");
const logInPassword = document.getElementById("login_password");
const loginKeepsignedCheck = document.querySelector('.modal_login_keepsigned_check');
let userName;

function checkLogInCredentialsFilled() {
    if (!logInEmail.value || !logInPassword.value) {
        [...logInNotCorrectSpan].forEach(i => i.classList.remove("hide"));
        //alert("Not all fields are filled!");
        return false;
    } else {
        return true;
    }
}

function checkLogInCredentialsPass() {
    if (localStorage.getItem("yourImdbUserServer")) {
        if ((JSON.parse(localStorage.getItem("yourImdbUserServer"))[1] === logInEmail.value) && (JSON.parse(localStorage.getItem("yourImdbUserServer"))[4] === logInPassword.value)) {
            //alert("Credentials OK");
            window.location.reload ();
            return true;
        } else {
            alert("Incorrect Email or Password");
            [...logInNotCorrectSpan].forEach(i => i.classList.remove("hide"));
            return false;
        }
    } else {
        needToSignAlert.classList.remove("hide");
        fromLoginModalSignInButton.focus();
        //alert("You're not signed yet. Please sign in!")
    }
}

function setKeepSigned() {
    if (loginKeepsignedCheck.checked) {
        localStorage.setItem("loginKeepsignedCheck", true);
        return true;
    } else {
        return false;
    }
}

export function logInUser() {
    [...logInNotCorrectSpan].forEach(i => i.classList.add("hide"));
    if (checkLogInCredentialsFilled()) {
        if (checkLogInCredentialsPass()) {
            if (setKeepSigned()) {
                setCredentialsToLocalstorage();
                setUserLogin();
            } else {
                setUserLogin();
                sessionStorage.setItem('temporaryLogin', true);
            }
        }
    }


}


