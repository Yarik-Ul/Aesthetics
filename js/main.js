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
  if(navMenu.classList.contains("opened_nav")) {
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
const quanOfProducts = document.querySelector(".quantity_of_products");
const totalSum = document.querySelector(".total_sum");
const counter = document.querySelector(".counter");
const productInBasket = document.querySelector(".product_in_busket");

let basket = [];

function checkLocalBasket() {
  if (sessionStorage.getItem("basket") != null) {
    basket = JSON.parse(sessionStorage.getItem("basket"));
  }
}

checkLocalBasket();

let howManyProductInBasket = basket.reduce((sum, elem) => {
  return sum + elem.counter;
}, 0);
productInBasket.innerText = howManyProductInBasket;

function showMyBasket(event) {
  let outProductInBasket = "";
  for (let i = 0; i < basket.length; i++) {
    outProductInBasket += `<div class="basket_item">
      <div class="basket_items_img">
        <img src="${basket[i].image}" alt="#" />
      </div>
      <div class="basket_item_info">
        <div class="item_info">
          <h3 style="font-size: 20px">${basket[i].name}</h3>
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
    return sum + (elem.price * elem.counter);
  }, 0);

  quanOfProducts.innerText = basket.reduce((sum, elem) => {
    return sum + elem.counter;
  }, 0);
  basketContainer.innerHTML = outProductInBasket;

  if (event.target === showBasket || event.target === continueBuy) {
    basketWindow.classList.toggle("show_basket_active");
  } else if (event.target === toOrder) {
    showOrder.classList.toggle("to_order_active");
  }
}

header.addEventListener("click", showMyBasket);

//Show basket ***
