
// Array
let yourImbdCart = [];

// Variables
let price = 0;
let quantity = 0;
let target;

// Buttons
const decreaseFilmQuantity = document.querySelector('.modal_cart_minus');
const increaseFilmQuantity = document.querySelector('.modal_cart');


//DOM elements
const modalCart = document.querySelector('.modal_cart');
const modalCartElement = document.querySelector('.modal_cart_element_total')
const modalCartQuantity = document.querySelector('.modal_cart_element_quantity')

//Put film to cart
function putToCart(filmId, filmPrice, filmQuantity) {
    yourImbdCart.push({
        "id": filmId,
        "price": filmPrice,
        "quantity": filmQuantity,
    })
    localStorage.setItem("yourImbdCart", JSON.stringify(yourImbdCart));
    addToCart(filmId, filmPrice, filmQuantity)
}

function countQuantity(filmId) {
    yourImbdCart = JSON.parse(localStorage.getItem("yourImbdCart"));
    yourImbdCart.forEach((element) => {
        if (element.id === filmId) {
            element.quantity += 1;
            element.price += 5;
            localStorage.setItem("yourImbdCart", JSON.stringify(yourImbdCart));
        }
    })
}

function checkSameInCart(filmId) {
    let yourImbdCart = JSON.parse(localStorage.getItem("yourImbdCart"));
    if (yourImbdCart.find(element => element.id === filmId)) {
        yourImbdCart.forEach((element, id) => {
            if (element.id === filmId) {
                countQuantity(filmId);
            };
        })
    } else {
        putToCart(filmId, price = 5, quantity = 1);
    }
}

export function fillCartOnLoad() {
    let totalQuantity = 0;
    let totalPrice = 0;
    if (JSON.parse(localStorage.getItem("yourImbdCart"))) {
        yourImbdCart = JSON.parse(localStorage.getItem("yourImbdCart"));
        yourImbdCart.forEach((element, index, yourImbdCart) => {
            addToCart(element.id, element.price, element.quantity)
            totalQuantity += element.quantity;
            totalPrice += element.price;
        })
    } else {
        return false;
    }
    modalCart.insertAdjacentHTML('beforeend',
        `   <div class="modal_cart_total">
            <p>Total films:&nbsp;<span>${totalQuantity}</span></p>
            <p>Total price:&nbsp;<span>${totalPrice} $</span></p>
        </div>`)
}

function addToCart(idNumber, price, quantity) {
    let url = `https://data-imdb1.p.rapidapi.com/movie/id/${idNumber}/`; ///id/${imdb_id}/`;
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
        .then((getById) => {
            const { imdb_id, image_url, title } = getById.results;
            modalCart.insertAdjacentHTML('beforeend',
                `<div class="modal_cart_element">
                    <div class="modal_cart_element_info">
                        <div class="modal_cart_element_info_picture">
                            <img src="${image_url}">
                        </div>
                        <div class="modal_cart_element_info_name">
                            ${title}
                        </div>
                    </div>
                    <hr class="modal_cart_divider">
                    <div id="${imdb_id}" class="modal_cart_element_total">
                        <p>Quantity:&nbsp;
                        <button class="modal_cart_minus">-</button></p>
                        <p style="display: inline" class="modal_cart_element_quantity">${quantity}</p>
                        <button class="modal_cart_plus">+</button>
                        <p>Price:&nbsp;
                            <span class="modal_cart_element_price">${price} $</span>
                        </p>
                    </div>
                </div>`)
        })
    // .catch((err) => {
    //     console.log('err: ', err);
    // })
    // .finally(() => {
    //     increaseFilmQuantity.addEventListener('click', event => {
    //         let target;
    //         target = event.target;
    //         console.log("target");
    //     })
    // })
}

export function addItemToCart() {
    let target;
    target = event.target;
    if (target.classList.contains("dom_element_buy_addtocart")) {
        if (localStorage.getItem("yourImbdCart")) {     //if cart exist
            checkSameInCart(target.id);
            //console.log(target.id)
        } else {                                        //if cart not exist
            // !!! in future - add price rate depending on film rating
            putToCart(target.id, price = 5, quantity = 1);
        }
    }
}

// //function increaseQuantity() {
//     increaseFilmQuantity.addEventListener('click', (event) => {
//         //event.preventDefault();
//         let target;
//         target = event.target;
//         console.log(modalCartQuantity.textContent);
//     })
// //}