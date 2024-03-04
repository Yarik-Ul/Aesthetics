// button show more products *****

const mainCatalogContainer = document.querySelector(".main_container_catalog");
const btnShowMore = document.querySelector(".show_more"); //btn show more products
const catalog = document.querySelector(".catalog"); // catalog wrapper

function showMoreProducts(event) {
  if (event.target === btnShowMore) {
    //by the date attribute, we determine the product that is already on the page
    const productsOnPage = document.querySelectorAll(".detail"); //get node list
    const idProductsOnPage = Array.from(productsOnPage).map(elem => elem.dataset.id); //get the ID of the elements that are currently on the page
    const filteredCatalog = productsCatalog.filter(elem => !idProductsOnPage.includes(elem.id)); //create a catalog of products that are not yet on the page

    let outProductInPage = "";

    if (filteredCatalog.length < 1) {
      btnShowMore.style.display = "none";
      return;
    } else {
      for (let i = 0; i < 3; i++) {
        outProductInPage += `<li class="item_card">
        <div class="item_img">
          <img src="${filteredCatalog[i].image}" alt="#" />
        </div>
        <h3>${filteredCatalog[i].name}</h3>
        <p class="item_price">${filteredCatalog[i].price + " грн"}</p>
        <div class="item_btns">
          <span class="detail" data-id="${filteredCatalog[i].id}">Детальніше</span>
          <div class="in_basket_wrap" >
            <button class="in_basket" data-index="${
              filteredCatalog[i].id
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
    //to up
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  // btn back
  backArrow.onclick = () => {
    productContainer.classList.toggle("active");
    catalogContainer.classList.toggle("active");
  };
}
mainCatalogContainer.addEventListener("click", showProductPage);

// END creation and display of the product page *****

//add product to basket *****
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

      howManyProductsInBasket (productInBasket);
      
    });
  }
  sessionStorage.setItem("basket", JSON.stringify(basket));
}

mainCatalogContainer.addEventListener("click", addProductToBasket);

// END add product to basket *****