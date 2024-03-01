const productsCatalog = JSON.parse(localStorage.getItem("goods")); //receive a catalog of goods from local storage

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

  howManyProductsInBasket(quanOfProducts);

  basketContainer.innerHTML = outProductInBasket;

  if (event.target === showBasket || event.target === continueBuy) {
    basketWindow.classList.toggle("show_basket_active");
  } else if (event.target === toOrder) {
    showOrder.classList.toggle("to_order_active");
  }
}

header.addEventListener("click", showMyBasket);

//Show basket ***

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

//// button to up
