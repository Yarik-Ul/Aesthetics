//Slider
const sliderContainer = document.querySelector(".slider_wrap");
const sliderItems = document.querySelectorAll(".slider_item");
const sliderDot = document.querySelectorAll(".dot");
const elWidth = sliderItems[0].offsetWidth;
let sliderInterval = 2500;
let sliderCounter = 0;

function moveSlider() {
  //pagination
  sliderCounter++;
  if (sliderCounter === sliderItems.length) {
    sliderCounter = 0;
  }

  sliderDot.forEach((elem) => {
    if (Number(elem.dataset.dot) === sliderCounter) {
      elem.style.background = "#4b6049";
    } else {
      elem.style.background = "none";
    }
  });
  //slide switch
  sliderContainer.classList.add("slider_animating");
  sliderContainer.style.transform = `translateX(-${elWidth}px)`;

  setTimeout(() => {
    sliderContainer.classList.remove("slider_animating");
    sliderContainer.append(sliderContainer.firstElementChild);
    sliderContainer.style.transform = `translateX(0px)`;
  }, 600);
}

const intervalId = setInterval(moveSlider, sliderInterval);
//END Slider
