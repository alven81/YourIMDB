// Blocks
const openUserMenu = document.querySelector('.modal_user');

// Buttons
const userMenuBtn = document.querySelector('.header_main_logobar_buttons_avatar');
const logOutBtn = document.querySelector('.modal_user_list_logout');

userMenuBtn.addEventListener("click", () => {
    openUserMenu.classList.toggle('hide');
})

logOutBtn.addEventListener("click", () => {
    localStorage.setItem("loginKeepsignedCheck", false);
    sessionStorage.setItem("temporaryLogin", false);
    window.location.reload ();
})