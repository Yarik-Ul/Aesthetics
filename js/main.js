// berger menu
const headerBurger = document.querySelector(".menu_burger");
const menuBtns = document.querySelectorAll(".burger_line");
const navMenu = document.querySelector(".navigate");
headerBurger.onclick = () => {
  menuBtns.forEach((btn) => {
    btn.classList.toggle("opened");
  });
  navMenu.classList.toggle("opened_nav");
};
// END berger menu



//tabs for basket
const showBasket = document.querySelector(".basket_icon");
const basket = document.querySelector(".show_basket");
const continueBuy = document.querySelector(".continue");
const header = document.querySelector("header");
const showOrder = document.querySelector(".to_order");
const toOrder = document.querySelector(".buy");
function showMyBasket(event) {
  if (event.target === showBasket || event.target === continueBuy) {
    basket.classList.toggle("show_basket_active");
  } else if (event.target === toOrder) {
    showOrder.classList.toggle("to_order_active");
  }
}
header.addEventListener("click", showMyBasket);
// END tabs for basket
