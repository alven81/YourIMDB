let userLogIn = true;
let userName;
const chatUserName = document.querySelector('.modal_chat_name_text');
const userRegisteredName = document.querySelector('.header_main_topbar_register');

function getUserName() {
    userName = JSON.parse(localStorage.getItem("yourImdbUserServer"))[0];
    chatUserName.textContent = `Hi, ${userName}!`;
    return userName;
}

export function setUserLogin() {
        userRegisteredName.innerHTML = "";
        getUserName();
        userRegisteredName.insertAdjacentHTML('beforeend',
            `<p>
                Hello ${userName}!
            </p>`
        )
}

