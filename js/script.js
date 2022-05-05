import { logInUser } from "./login.js";
import { createUser } from "./signup.js";
import { addItemToCart, fillCartOnLoad } from "./cart.js";
import { setUserLogin } from "./set_user_login.js";

//User credentials
let userLogIn = false;
let userTempLogIn = false;

//Credentials inputs
const logInEmail = document.getElementById("login_email");

//Credentials DOM
const signInModal = document.querySelector('.modal_signin');
const logInModal = document.querySelector('.modal_login');
const needToLogAlert = document.querySelector('.needtologin_alert');

//Credentials Buttons
const createAccountButton = document.querySelector('.modal_signin_buttonblock_button');
const logInAccountButton = document.querySelector('.modal_login_buttonblock_button');
const logInButton = document.querySelector('.header_main_topbar_login_log');
const signInButton = document.querySelector('.header_main_topbar_login_sign');
const fromLoginModalSignInButton = document.querySelector('.modal_login-signin_button');
const openCartButton = document.querySelector('.header_main_logobar_buttons_cart');

//Variables
let image_url;
let rating;
let title;
let searchInputVal;
let searchSelectVal;
let watchList = new Set();

//DOM elements
const sliderDom = document.querySelector('.slider_block');
const trendingDom = document.querySelector('.trending_dom');
const nextDom = document.querySelector('.trending_next');
const nextSliderDom = document.querySelector('.slider_next');
const watchlistDom = document.querySelector('.watchlist_dom');
const mainDom = document.querySelector('.main');
const modalCart = document.querySelector('.modal_cart');
const domRate = trendingDom;

//Buttons
const navbarDropmenuBlockBtn = document.querySelector(".header_navbar_dropmenu");
const headerNavbarDropmenuList = document.querySelector(".header_navbar_dropmenu_list");
const headerMainSearchButton = document.querySelector('.header_main_logobar_button');

//API query
let searchByFilmLink = "https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/";
let searchByYearLink = "https://data-imdb1.p.rapidapi.com/movie/byYear/,/?page_size=20";
let searchByGenreLink = "https://data-imdb1.p.rapidapi.com/movie/byGen/,/?page_size=20";
let searchByActorsLink = "https://data-imdb1.p.rapidapi.com/actor/imdb_id_byName/";
const offerSetTopLink1 = document.querySelector(".offer_set_top_link1");
const offerSetTopLink3 = document.querySelector(".offer_set_top_link3");
const offerSetTopLink2 = document.querySelector(".offer_set_top_link2");

let index = 0;

// Receive list of genres - create All Cllections menu
function createAllCollectionMenu() {
    fetch("https://data-imdb1.p.rapidapi.com/genres/", { 
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
            "x-rapidapi-key": "c04d5c51a5msh047c372412060c6p112bb0jsn8412e6440278"
        }
 })
    .then(response => {
        return response.json();
    })
    .then(resGenres => {
        resGenres.results.forEach((genre, index) => {
        headerNavbarDropmenuList.insertAdjacentHTML('beforeend',
        `<a class="header_navbar_dropmenu_list${index}" href="#sliderBlock">
        <li id="${genre.genre}">${genre.genre}</li>
        </a>`);
    })
})
    .catch(err => {
        console.log(err);
    })
}           

//Event listeners

//EvL   -   Open drop down menu
headerNavbarDropmenuList.addEventListener('click', (event) => {
    let target;
    target = event.target;
    console.log(target.id);
    getInfo(`https://data-imdb1.p.rapidapi.com/movie/byGen/${target.id}/?page_size=15`, sliderDom);
})

navbarDropmenuBlockBtn.addEventListener('click', (event) => {
    //event.preventDefault();
    headerNavbarDropmenuList.classList.toggle('hide');
})

//EvL   -   open sign in modal
signInButton.addEventListener('click', event => {
    mainDom.classList.add('hide');
    logInModal.classList.add("hide");
    signInModal.classList.remove("hide");
})
fromLoginModalSignInButton.addEventListener('click', event => {
    mainDom.classList.add('hide');
    logInModal.classList.add("hide");
    signInModal.classList.remove("hide");
})

//EvL   -   open log in modal
function logInButtonClick() {
    mainDom.classList.add('hide');
    signInModal.classList.add('hide');
    logInModal.classList.remove("hide");
    needToLogAlert.classList.add("hide");
    if (localStorage.getItem("yourImdbUserCredentials")) {
        logInEmail.value = JSON.parse(localStorage.getItem("yourImdbUserCredentials"))[1];
    }
}

logInButton.addEventListener('click', logInButtonClick);

//EvL   -   open cart
openCartButton.addEventListener('click', (event) => {
    userLogIn = localStorage.getItem("loginKeepsignedCheck");
    userTempLogIn = sessionStorage.getItem("temporaryLogin");
    if ((userLogIn === "true") || (userTempLogIn === "true")) {
        event.preventDefault();
        modalCart.classList.toggle('modal_cart_show');
    } else {
        alert("Please log in befor shopping!");
    }
})

//LogIn if registered - add whenever token check
function logInOnStart() {
    createAllCollectionMenu();
    if (localStorage.getItem("yourImdbUserServer")) {
        userLogIn = localStorage.getItem("loginKeepsignedCheck");
        userTempLogIn = sessionStorage.getItem("temporaryLogin");
        if ((userLogIn === "true") || (userTempLogIn === "true")) { setUserLogin() };
        if (!fillCartOnLoad()) {
            return;
        }
    }
}

logInOnStart()

getInfo()

let resultsCount = 0;
const trendingNext = document.querySelector('.trending_next');
let activePage = 1;
const trendingNextGtBtn = document.querySelector('.trending_next_gt');


async function getInfo(url = "https://data-imdb1.p.rapidapi.com/movie/order/byRating/?page_size=10", dom = trendingDom, nextSliderDom = nextDom) {
    try {
        dom.innerHTML = "";
        const response = await fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                "x-rapidapi-key": "c04d5c51a5msh047c372412060c6p112bb0jsn8412e6440278"
            }
        });
        const results = await response.json();
        resultsCount = results.count;
        //console.log('results: ', resultsCount);
        await Promise.all(results.results.map(async ({ imdb_id, title, results }) => {
            const src = await getInfoByID(imdb_id);
            dom.insertAdjacentHTML('beforeend',
                `<div class="dom_element">
                    <a href="movie.html?${imdb_id}">
                        <div class="dom_element_img">
                            <div class="dom_element_img_main_loader loader"></div>
                            <img class="dom_element_img_main" src="${image_url ? image_url : "./img/dom_elem.png"}" title="${title}">
                            <a id="${imdb_id}" class="dom_element_img_main_watchlist"><svg class="dom_element_img_flag" width="24px" height="34px" viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg"></button>
                            <polygon class="ipc-watchlist-ribbon__bg-ribbon" fill="#000000" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                            <polygon class="ipc-watchlist-ribbon__bg-hover" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                            <polygon class="ipc-watchlist-ribbon__bg-shadow" points="24 31.7728343 24 33.7728343 12.2436611 28.2926049 0 34 0 32 12.2436611 26.2926049"></polygon></svg>
                        </div>
                    </a>
                <div class="dom_element_info">
                    <div class="dom_element_info_rating">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="dom_element_info_star" id="iconContext-star-inline" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg> 
                        <span>&nbsp${rating ? rating : "no data"}</span>
                    </div>
                    <div class="dom_element_title">
                        ${title}
                    </div>
                    <div class="dom_element_buy">
                        <span class="dom_element_buy_quantity">5$</span>
                        <button id="${imdb_id}" class="dom_element_buy_addtocart">Add to cart</button>
                    </div>
                </div>
            </div>`);
            image_url = "";
        })
        );
        let setCircleLoader = document.querySelectorAll('.dom_element_img_main_loader');
        [...setCircleLoader].forEach(i => i.classList.remove('loader'));
        //console.log('results: ', resultsCount);
        //return resultsCount;
    } catch (err) {
        console.log(err);
    } finally {
        console.log('results: ', resultsCount);
        nextSliderDom.innerHTML = "";
        nextSliderDom.insertAdjacentHTML('beforeend',
        `
            <button class="trending_next_page">Next page &rarr; </button>
            <span>Page</span>
            <input class="trending_next_input" type="text" value="">
            <span class="trending_next_number">of ${Math.floor(resultsCount/10)}</span>
            <button class="trending_next_lt"> &lt; </button>
            <button class="trending_next_gt"> &gt; </button>
        `);
        let tempUrl;
        console.log("activePage", activePage);
        document.querySelector('.trending_next_input').value = activePage;
        switchPageBtnAccess(resultsCount, activePage)
        console.log(url);

        document.querySelector('.trending_next_input').addEventListener('click', () => {
            document.querySelector('.trending_next_page').removeAttribute('disabled');
        });
        document.querySelector('.trending_next_page').addEventListener('click', () => {
            activePage = document.querySelector('.trending_next_input').value;
            if (activePage > Math.floor(resultsCount/10)) {
                activePage = Math.floor(resultsCount/10);
                document.querySelector('.trending_next_input').value = activePage;
                switchPageBtnAccess(resultsCount, activePage);
            } else {
                if (+activePage >= 1) {
                    tempUrl = `${url}&page=${activePage}`;
                    console.log(tempUrl)
                    getInfo(tempUrl); 
                }
            }
        });
        document.querySelector('.trending_next_lt').addEventListener('click', () => {
            if (+activePage > 1) {
                activePage = +activePage - 1;
                switchPageBtnAccess(resultsCount, activePage)
                tempUrl = `${url}&page=${activePage}`;
                console.log(tempUrl)
                getInfo(tempUrl); 
            }
        });
        document.querySelector('.trending_next_gt').addEventListener('click', () => {
            if (+activePage >= 1) {
            activePage = +activePage + 1;
            switchPageBtnAccess(resultsCount, activePage)
            tempUrl = `${url}&page=${activePage}`;
            console.log(tempUrl)
            getInfo(tempUrl); 
            }
        });
    }
}

function switchPageBtnAccess(resultsCount, activePage) {
    if (activePage == "1") {
        document.querySelector('.trending_next_lt').setAttribute('disabled', true);
    } else {
        if (activePage >= Math.floor(resultsCount/10)) {
            document.querySelector('.trending_next_page').setAttribute('disabled', true);
            document.querySelector('.trending_next_gt').setAttribute('disabled', true);
        }
        else {
            document.querySelector('.trending_next_page').removeAttribute('disabled');
            document.querySelector('.trending_next_lt').removeAttribute('disabled');
            document.querySelector('.trending_next_gt').removeAttribute('disabled');
        }
    }
}

getWatchList()

async function getWatchList() {
    try {
        watchlistDom.innerHTML = "";
        watchList = JSON.parse(localStorage.getItem("yourImbdWatchList"));
        console.log('results: ', watchList);
        await Promise.all(watchList.map(async (imdb_id) => {
            const src = await getInfoByID(imdb_id);
            watchlistDom.insertAdjacentHTML('beforeend',
                `<div class="dom_element">
                    <a href="movie.html?${imdb_id}">
                        <div class="dom_element_img">
                            <div class="dom_element_img_main_loader loader"></div>
                            <img class="dom_element_img_main" src="${image_url ? image_url : "./img/dom_elem.png"}" title="${title}">
                            
                        </div>
                    </a>
                <div class="dom_element_info">
                    <div class="dom_element_info_rating">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="dom_element_info_star" id="iconContext-star-inline" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg> 
                        <span>&nbsp${rating ? rating : "no data"}</span>
                    </div>
                    <div class="dom_element_title">
                        ${title}
                    </div>
                    <div class="dom_element_buy">
                        <span class="dom_element_buy_quantity">5$</span>
                        <button id="${imdb_id}" class="dom_element_buy_addtocart">Add to cart</button>
                    </div>
                </div>
            </div>`);
            image_url = "";
        })
        );
        let setCircleLoader = document.querySelectorAll('.dom_element_img_main_loader');
        [...setCircleLoader].forEach(i => i.classList.remove('loader'));
    } catch (err) {
        console.log(err);
    }
}

//callback for drawDom
function getInfoByID(imdb_id) {
    let url = `https://data-imdb1.p.rapidapi.com/movie/id/${imdb_id}/`;
    return fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
            "x-rapidapi-key": "c04d5c51a5msh047c372412060c6p112bb0jsn8412e6440278"
        }
    })
        .then((getInfoByIDresponse) => {
            return getInfoByIDresponse.json();
        })
        .then((getByID) => {
            //console.log('getByID: ', getByID);
            image_url = getByID.results.image_url;
            rating = getByID.results.rating;
            title = getByID.results.title;
            return image_url, rating, title;
        })
        .catch(err => console.log(err));

}

headerMainSearchButton.addEventListener("click", () => getFoundedElements());   // Search button

// Menu API Links
offerSetTopLink1.addEventListener("click", () => getInfo("https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/zombie/", sliderDom));
offerSetTopLink3.addEventListener("click", () => getInfo("https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/love/", sliderDom));
offerSetTopLink2.addEventListener("click", () => getInfo("https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/hollywood/", sliderDom));

function getFoundedElements() {
    sliderDom.innerHTML = "";
    searchInputVal = document.getElementById("logobar_input").value;
    searchSelectVal = document.getElementById("logobar_select").value;
    switch (searchSelectVal) {
        case "searchByFilm":
            getInfo(`${searchByFilmLink}${searchInputVal}/`, sliderDom);
            break;
        case "searchByYear":
            getInfo(`${genSearchURL(searchInputVal, searchByYearLink)}`, sliderDom);
            break;
        case "searchByGenre":
            getInfo(`${genSearchURL(searchInputVal, searchByGenreLink)}`, sliderDom)
            break;
        case "searchByActors":
            getInfo(`${searchByActorsLink}${searchInputVal}/`, sliderDom);
        default: console.log("default");
            break;
    }
}

function genSearchURL(searchInputVal, searchByActorsLink) {
    let transArr = [];
    const finSearchURL = "";
    transArr = searchByActorsLink.split(",");
    return transArr[0] + searchInputVal + transArr[1];
}

createAccountButton.addEventListener("click", () => createUser()); // Sign Up

logInAccountButton.addEventListener("click", () => logInUser());    // Log In

trendingDom.addEventListener('click', () => addItemToCart()); // Add to cart
sliderDom.addEventListener('click', () => addItemToCart());

trendingDom.addEventListener('click', () => addToWatchList()); // Add to cart
sliderDom.addEventListener('click', () => addToWatchList());

watchlistDom.addEventListener('click', () => addItemToCart());




function addToWatchList() {
    let tempSet;
    let target;
    tempSet = JSON.parse(localStorage.getItem("yourImbdWatchList"));
    let tempList = new Set(tempSet);
    console.log('tempList: ', tempList);
    target = event.target;
    console.log('target.id: ', target.id);
    if (target.id) {
        tempList.add(target.id);
    }
    localStorage.setItem("yourImbdWatchList", JSON.stringify([...tempList]));
    getWatchList();
}

