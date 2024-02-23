// berger menu
const header = document.querySelector(".menu_burger");
const menuBtns = document.querySelectorAll(".burger_line");
const navMenu = document.querySelector(".navigate");
 header.onclick = () => {
     menuBtns.forEach(btn => {
         btn.classList.toggle("opened");
     });
     navMenu.classList.toggle("opened_nav");

 };
 // END berger menu

 //Slider
 const sliderContainer = document.querySelector(".slider_wrap");
 const sliderlItems = document.querySelectorAll(".slider_item");
 const elWidth = sliderlItems[0].offsetWidth;

 function moveSlider() {
   sliderContainer.classList.add("slider_animating");
   sliderContainer.style.transform = `translateX(-${elWidth}px)`;

   setTimeout(() => {
     sliderContainer.classList.remove("slider_animating");
     sliderContainer.append(sliderContainer.firstElementChild);
     sliderContainer.style.transform = `translateX(0px)`;
   }, 600);
 }

setInterval(moveSlider, 2000);
 //END Slider