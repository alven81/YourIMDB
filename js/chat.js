// Variables
let messageToChat;

// Chat array object
let yourImdbChat = [
    {
        "id": "0",
        "chatUser": "Admin",
        "message": "Hello my little friend! What do you want to talk about?",
        "admStatus": "true",
    }
]

const botAnswers = [
    "Sorry, I'm little stupid now... &#128522",
    "Nice question, guy! &#128521",
    "One more question, please!",
    "I agree with you",
    "Better to buy something! &#127916",
    "I can't answer this question, ask something else...",
    "You so curuios! What is you name? 	&#128580",
    "Yeah!",
    "&#128578",
    "&#129299",
    "Mmmm, don't know..."
]

// Inputs
const sendMessageToChat = document.querySelector('.modal_chat_message_input');
const chatWindow = document.querySelector('.modal_chat_text');
const chatWindowArrow = document.querySelector('.modal_chat_state');

// Buttons
const sentMessageBtn = document.querySelector('.modal_chat_message_button');
const openChat = document.querySelector('.modal_chat_name_arrow');
const sizeOfChat = document.querySelector('.modal_chat');

openChat.addEventListener("click", () => {
    if (chatWindowArrow.classList.contains("arrow_down")) {
        chatWindowArrow.classList.add("arrow_up");
        chatWindowArrow.classList.remove("arrow_down");
        sizeOfChat.classList.remove("chat_window_open");
    } else {
        chatWindowArrow.classList.add("arrow_down");
        chatWindowArrow.classList.remove("arrow_up");
        sizeOfChat.classList.add("chat_window_open");
        sendMessageToChat.focus();
    }
})

function sendUserMessageToChat(id, chatUser, message) {
    chatWindow.insertAdjacentHTML('beforeend',
        `<li id="${id}" class="modal_chat_text_bubble">   
            <b>${chatUser}:&nbsp</b>
            <p class="modal_chat_text_window">${message}</p>
        </li>`);
    scrollDown();
}

function sendAdminMessageToChat(id, chatUser, message) {
    chatWindow.insertAdjacentHTML('beforeend',
        `<li id="${id}" class="modal_chat_text_bubble_admin">   
            <b>${chatUser}:&nbsp</b>
            <p class="modal_chat_text_window">${message}</p>
        </li>`);
    scrollDown();
}

function fillChat() {
    yourImdbChat = JSON.parse(localStorage.getItem("yourImdbChat"));
    yourImdbChat.forEach((value) => {
        if (value.admStatus === "true") {
            sendAdminMessageToChat(value.id, value.chatUser, value.message)
        } else {
            sendUserMessageToChat(value.id, value.chatUser, value.message)
        }
    })
}

function chatOnLoad() {
    if (localStorage.getItem("yourImdbChat")) {
        fillChat();
    } else {
        yourImdbChat.forEach(() => {
            yourImdbChatSet(yourImdbChat);
            fillChat();
        })
    }
}

function writeMessageTolocalStorage(id, chatUser, message, admStatus) {
    console.log('id, chatUser, message, admStatus: ', id, chatUser, message, admStatus);
    yourImdbChat.push({
        "id": id,
        "chatUser": chatUser,
        "message": message,
        "admStatus": admStatus,
    });
    yourImdbChatSet(yourImdbChat);
}

sentMessageBtn.addEventListener("click", () => {
    let id = localStorage.getItem("yourImdbChat").length;
    let message = sendMessageToChat.value;
    let chatUser = "User";
    let admStatus = "false";
    sendMessageToChat.value = "";
    sendMessageToChat.focus();
    sendUserMessageToChat(id, chatUser, message);
    writeMessageTolocalStorage(id, chatUser, message, admStatus);
    setTimeout(() => botAnswer(), 2000);
})

sendMessageToChat.addEventListener('keyup', function(event){
    if(event.keyCode == 13){
        sentMessageBtn.click();
    }
});

function botAnswer() {
    let id = localStorage.getItem("yourImdbChat").length;
    let max = botAnswers.length - 1;
    function getRndInteger(max) {
        return Math.floor(Math.random() * (max + 1));
    };
    let message = botAnswers[getRndInteger(max)];
    let chatUser = "Admin";
    let admStatus = "true";
    sendAdminMessageToChat(id, chatUser, message);
    writeMessageTolocalStorage(id, chatUser, message, admStatus);
}

function scrollDown() {
    chatWindow.scrollTop = chatWindow.scrollHeight
}

function yourImdbChatSet(yourImdbChat) {
    localStorage.setItem("yourImdbChat", JSON.stringify(yourImdbChat));
}

chatOnLoad()
