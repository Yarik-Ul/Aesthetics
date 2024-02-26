// button show more products *****
productInBasket
const mainCatalogContainer = document.querySelector(".main_container_catalog");

const btnShowMore = document.querySelector(".show_more"); //btn show more products
const catalog = document.querySelector(".catalog"); // catalog wrapper

function showMoreProducts(event) {
  if (event.target === btnShowMore) {
    //by the date attribute, we determine the product that is already on the page
    const productsOnPage = document.querySelectorAll(".detail"); //get node list
    let inPage = [];
    productsOnPage.forEach((elem) => {
      inPage.push(elem.dataset.id);
    });
    //determine by ID products that are not yet on the page
    let inCtalog = [];
    productsCatalog.map((elem) => {
      if (!inPage.includes(elem.id)) inCtalog.push(elem);
    });

    let outProductInPage = "";

    if (inCtalog.length < 1) {
      btnShowMore.style.display = "none";
      return;
    } else {
      for (let i = 0; i < 3; i++) {
        outProductInPage += `<li class="item_card">
        <div class="item_img">
          <img src="${inCtalog[i].image}" alt="#" />
        </div>
        <h3>${inCtalog[i].name}</h3>
        <p class="item_price">${inCtalog[i].price + " грн"}</p>
        <div class="item_btns">
          <span class="detail" data-id="${inCtalog[i].id}">Детальніше</span>
          <div class="in_basket_wrap" >
            <button class="in_basket" data-index="${
              inCtalog[i].id
            }">В кошик</button>
          </div>
        </div>
      </li>`;
      }
    }
    catalog.insertAdjacentHTML("beforeend", outProductInPage);
  }
}

mainCatalogContainer.addEventListener("click", showMoreProducts);

// END button show more products *****

//creation and display of the product page *****

const backArrow = document.querySelector(".return"); // btn back
const productContainer = document.querySelector(".container_product_card"); //container with products information
const catalogContainer = document.querySelector(".container_catalog"); // container with products
const productsInfo = document.querySelectorAll(".detail"); //btn to show products page

function showProductPage(event) {
  if (event.target.dataset.id) {
    //all variables for editing product information
    const productImg = document.querySelector(".information_img");
    const productTitle = document.querySelector(".information_title");
    const productDisc = document.querySelector(".information_discr");
    const productPrice = document.querySelector(".price");
    const productCompos = document.querySelector(".product_composition");
    const dtnProductInBasket = document.querySelector(".product_to_basket");

    productsCatalog.forEach((elem) => {
      if (elem.id === event.target.dataset.id) {
        productImg.setAttribute("src", elem.image);
        productTitle.innerText = elem.name;
        productDisc.innerText = elem.discription;
        productPrice.innerText = elem.price + " грн";
        productCompos.innerText = elem.composition;
        dtnProductInBasket.setAttribute("data-index", elem.id);
      }
    });

    productContainer.classList.toggle("active");
    catalogContainer.classList.toggle("active");

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  // btn back
  backArrow.onclick = () => {
    productContainer.classList.toggle("active");
    catalogContainer.classList.toggle("active");
  };
}
mainCatalogContainer.addEventListener("click", showProductPage);

// ENDcreation and display of the product page *****



// operations with basket ****

//add product to basket
const btnToBasket = document.querySelector(".in_basket");

function addProductToBasket(event) {
  if (event.target.dataset.index) {
    productsCatalog.forEach((elem) => {
      if (elem.id === event.target.dataset.index) {
        event.target.innerHTML = "&#10003;";
        if(basket.includes(elem)) {
          elem.counter++;
        } else {
        basket.push(elem);
        }
      }
      productInBasket.innerText = howManyProductInBasket;
    });
  }
  sessionStorage.setItem("basket", JSON.stringify(basket));
}

mainCatalogContainer.addEventListener("click", addProductToBasket);

// remove product from basket


function removeFromBasket (event) {
  let index;
  if (event.target.dataset.index) {
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].id === event.target.dataset.index) {
            index = i; 
        }
}
basket.splice(index, 1);

sessionStorage.setItem("basket", JSON.stringify(basket));
productInBasket.innerText = howManyProductInBasket;
  }
 
}

function basketActions(event) {
  if (event.target.classList.contains("btn_minus")) {
 //minus products
    basket.forEach((elem)=>{
      if(elem.id === event.target.dataset.id && elem.counter >  1) {
          elem.counter--;
        }
        
      
    })
  }
  //plus products
  if (event.target.classList.contains("btn_plus")) {
    
    basket.forEach((elem)=>{
      if(elem.id === event.target.dataset.id) {
        elem.counter++;
      }
    })
  }
  sessionStorage.setItem("basket", JSON.stringify(basket));
  removeFromBasket(event);
}

basketWindow.addEventListener("click", basketActions);


// operations with basket ****