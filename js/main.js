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
const productInBasket = document.querySelector(".product_in_busket");

let basket = [];

function checkLocalBasket() {
  if (sessionStorage.getItem("basket") != null) {
    basket = JSON.parse(sessionStorage.getItem("basket"));
  }
}

checkLocalBasket();

productInBasket.innerText = basket.length;

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
          <p>${basket[i].price} грн</p>
      </div>
    </div>`;
  }
  totalSum.innerText = basket.reduce((sum, elem) => {
    return sum + elem.price;
  }, 0);

  quanOfProducts.innerText = basket.length;
  basketContainer.innerHTML = outProductInBasket;

  if (event.target === showBasket || event.target === continueBuy) {
    basketWindow.classList.toggle("show_basket_active");
  } else if (event.target === toOrder) {
    showOrder.classList.toggle("to_order_active");
  }
}

header.addEventListener("click", showMyBasket);

//Show basket ***
