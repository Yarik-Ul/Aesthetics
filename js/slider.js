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
