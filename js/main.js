const productsCatalog = JSON.parse(localStorage.getItem("goods")); //receive a catalog of goods from local storage
const body = document.querySelector('body');
// berger menu ******

const headerBurger = document.querySelector(".menu_burger"); //burger-menu btn for click
const menuBtns = document.querySelectorAll(".burger_line"); //burger-menu line for animating
const navMenu = document.querySelector(".navigate"); // navigate

headerBurger.onclick = () => {
  menuBtns.forEach((btn) => {
    btn.classList.toggle("opened");
  });
  navMenu.classList.toggle("opened_nav");
  if (navMenu.classList.contains("opened_nav")) {
    headerBurger.style.position = "fixed";
  } else {
    headerBurger.style.position = "absolute";
  }
};

// END berger menu *****

//Show basket ***

const showBasket = document.querySelector(".basket_icon"); //basket btn for click
const basketWindow = document.querySelector(".show_basket"); //displaying the shopping cart window
const continueBuy = document.querySelector(".continue"); // button close basket
const header = document.querySelector("header");
const showOrder = document.querySelector(".to_order"); //window form for ordering
const toOrder = document.querySelector(".buy"); //btn for show ordring window
const basketContainer = document.querySelector(".basket_items");
const quanOfProducts = document.querySelector(".quantity_of_products"); //displays the number of products in the basket window
const totalSum = document.querySelector(".total_sum"); //displays the total cost of goods in the shopping cart window
const counter = document.querySelector(".counter"); //quantity of the product
const productInBasket = document.querySelector(".product_in_busket"); //displays the number of products in the global window

let basket = [];
//check basket in session storage
function checkLocalBasket() {
  if (sessionStorage.getItem("basket") != null) {
    basket = JSON.parse(sessionStorage.getItem("basket"));
  }
}

checkLocalBasket();

//the number of products in the basket
function howManyProductsInBasket(elem) {
  elem.innerText = basket.reduce((sum, elem) => {
    return sum + elem.counter;
  }, 0);
}
howManyProductsInBasket(productInBasket);
//output basket to HTML
function showMyBasket(event) {
  let outProductInBasket = "";
  for (let i = 0; i < basket.length; i++) {
    outProductInBasket += `<div class="basket_item">
      <div class="basket_items_img">
        <img src="${basket[i].image}" alt="#" />
      </div>
      <div class="basket_item_info">
        <div class="item_info">
          <h3>${basket[i].name}</h3>
          <span data-index="${basket[i].id}" class="delete"></span>
        </div>
        <div class="item_info">
        <div class="counter_wrap">
        <button data-id="${basket[i].id}" class="btn_minus">-</button>
          <span class="counter">${basket[i].counter}</span>
          <button data-id="${basket[i].id}" class="btn_plus">+</button>
        </div>
          <p>${basket[i].price} грн</p>
        </div>
      </div>
    </div>`;
  }
  totalSum.innerText = basket.reduce((sum, elem) => {
    return sum + elem.price * elem.counter;
  }, 0);

  if (event.target === showBasket) {
    basketWindow.classList.toggle("show_basket_active");
    body.style.overflow = 'hidden';
  } else if(event.target === continueBuy){
    basketWindow.classList.toggle("show_basket_active");
    body.style.overflow = '';
  } else if (event.target === toOrder) {
    if (!basket.length) {
      showPopUp("Ваш кошик порожній!");
    } else {
      showOrder.classList.toggle("to_order_active");
    }
  }
  basketContainer.innerHTML = outProductInBasket;
  howManyProductsInBasket(quanOfProducts);
}

header.addEventListener("click", showMyBasket);

//Show basket ***

// operations with basket ****

// remove product from basket

function removeFromBasket(event) {
  let index;
  if (event.target.dataset.index) {
    for (let i = 0; i < basket.length; i++) {
      if (basket[i].id === event.target.dataset.index) {
        index = i;
      }
    }
    basket.splice(index, 1);

    sessionStorage.setItem("basket", JSON.stringify(basket));
  }
}

function basketActions(event) {
  if (event.target.classList.contains("btn_minus")) {
    //minus products
    basket.forEach((elem) => {
      if (elem.id === event.target.dataset.id && elem.counter > 1) {
        elem.counter--;
      }
    });
  }
  //plus products
  if (event.target.classList.contains("btn_plus")) {
    basket.forEach((elem) => {
      if (elem.id === event.target.dataset.id) {
        elem.counter++;
      }
    });
  }
  sessionStorage.setItem("basket", JSON.stringify(basket));
  removeFromBasket(event);
  howManyProductsInBasket(productInBasket);
}

basketWindow.addEventListener("click", basketActions);

// operations with basket ****

//smooth transition by anchor link*****

const anchor = document.querySelector(".anchor_link"); //link contacts
anchor.addEventListener("click", (e) => {
  e.preventDefault();
  let target = document.querySelector("#contacts");
  target.scrollIntoView({ behavior: "smooth" });
});

// END smooth transition by anchor link*****

// button to up
const arrowTop = document.querySelector(".btn_to_top"); // btn to top
let arrowIsShown = false; // flag to show btn
const screenHeight = window.screen.height; //window height

function scroll() {
  if (!arrowIsShown && window.scrollY >= screenHeight) {
    arrowIsShown = true;
    arrowTop.classList.remove("hidden_btn_to_top");
  }
  if (arrowIsShown && window.scrollY < screenHeight) {
    arrowIsShown = false;
    arrowTop.classList.add("hidden_btn_to_top");
  }
}

arrowTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});

window.addEventListener("scroll", scroll);

// button to up

//validation form

const url = "#";
const orderForm = document.querySelector(".order_form");
const orderBtn = document.querySelector(".send_order");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("secondname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const namePattern = /^(?:[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ']{2,})$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phonePattern = /^\+380\d{9}$/;

//pop-ua after request
function showPopUp(text) {
  const popUpThanks = document.createElement("div");
  popUpThanks.classList.add("pop_up_thanks");
  popUpThanks.innerText = text;
  basketWindow.append(popUpThanks);
  setTimeout(() => {
    popUpThanks.remove();
  }, 4000);
}

function sendOrder(event) {
  event.preventDefault();
  if (
    firstname.value === "" ||
    lastname.value === "" ||
    email.value === "" ||
    phone.value === ""
  ) {
    showPopUp("Будь ласка, заповніть усі поля форми.");
  } else {
    firstname.value = "";
    lastname.value = "";
    email.value = "";
    phone.value = "";
    showPopUp(
      "Дякуємо за замовлення! Найближчим часом з вами зв'яжеться наш менеджер"
    );
  }
}
orderForm.addEventListener("submit", sendOrder);

//validation function
function validateInput(input, pattern) {
  let checkPattern = input.value.trim().match(pattern);
  if (checkPattern) {
    input.classList.add("not-error");
    input.classList.remove("error");
  } else {
    input.classList.add("error");
    input.classList.remove("not-error");
  }
}

//validate first name
firstname.addEventListener("input", () => {
  validateInput(firstname, namePattern);
});

//validate last name
lastname.addEventListener("input", () => {
  validateInput(lastname, namePattern);
});

//validate email
email.addEventListener("input", () => {
  validateInput(email, emailPattern);
});

//validate phone
phone.addEventListener("input", () => {
  validateInput(phone, phonePattern);
});
