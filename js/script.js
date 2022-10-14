// DECLARING THE VARIABLES
const searchBtn = document.getElementById('search-btn')
const searchInput = document.querySelector('.search');
const searchIcon = document.querySelector('.logo');
const cartBtn = document.querySelector('.cart');
const cartItems = document.querySelector('.cart-items');
const menuBtn = document.querySelector('.menu')
const responsiveNav = document.querySelector('.responsive-nav');
const addBtn = document.querySelectorAll('.menu-button');
const menuText = document.querySelectorAll('.menu-text')
const add = document.querySelectorAll('.add');
const menuPic = document.querySelectorAll('.menu-pic');
const menuOne = document.querySelectorAll('.menu-one');
const cartContents = document.querySelector('.cart-contents');
const removeCartItemBtn = document.querySelectorAll('.uil-times');
const cartItemOne = document.querySelectorAll('.cart-item-one');
const cartQuantityInput = document.querySelectorAll('.cart-quantity-input');
const purchase = document.querySelector('.purchase');
const cartCount = document.querySelector('.cart-count');
const descCloseBtn = document.getElementById('description-close-btn');
const coffeeContainer = document.getElementById('coffee-container');
const coffeeDetails = document.querySelector('.coffee-details');
const searchBtnTwo = document.querySelector('.search-btn-two');
const coffeeDetailsContent = document.querySelector('.coffee-details-content');
const SocialLinkTag = document.querySelectorAll('.socials');


SocialLinkTag.forEach(social => {
    social.addEventListener('click', (event) => {
        event.preventDefault();
    })
})



// TOGGLING THE SEARCH BUTTON
searchBtn.addEventListener('click', click)

function click() {
    if(searchInput.classList.contains('search')) {
      searchInput.classList.toggle('open')
   } 
   
   if(searchIcon.classList.contains('logo')) {
       searchIcon.classList.toggle('search-logo')
   }
   cartItems.classList.remove('open-items')
   responsiveNav.classList.remove('open-nav')
};

//TOGGLING THE CART BUTTON
cartBtn.addEventListener('click', cart)

function cart() {
   if(cartItems.classList.contains('cart-items')) {
       cartItems.classList.toggle('open-items')
   }
   searchInput.classList.remove('open')
   searchIcon.classList.remove('search-logo')
   responsiveNav.classList.remove('open-nav')
}

// TOGGLING MENU BUTTON FOR SMALLER SCREENS
menuBtn.addEventListener('click', navOpen) 

function navOpen() {
  if(responsiveNav.classList.contains('responsive-nav')) {
       responsiveNav.classList.toggle('open-nav')
  }
   searchInput.classList.remove('open')
   searchIcon.classList.remove('search-logo')
   cartItems.classList.remove('open-items')
};

// ADDING THE CART EVENT LISTENER TO THE COUNT
cartCount.addEventListener('click', cart)

// ADD ITEM BUTTON EVENT LISTENER
add.forEach(btn => {
   btn.addEventListener('click', addItem)
   function addItem() {
       btn.innerText = 'ITEM ADDED !';
   }
})

// FUNCTION ADDING ITEMS TO CART
for (i = 0; i < addBtn.length; i++) {
    let button = addBtn[i]
    button.addEventListener('click', addToCart)
}

purchase.addEventListener('click', purchaseClicked);

function purchaseClicked() {
     while (cartContents.hasChildNodes()) {
        cartContents.removeChild(cartContents.firstChild)
        purchase.innerText = 'THANK YOU FOR YOUR PURCHASE !';
    }
    let count = parseFloat(cartCount.innerText);
    count = 0;
    cartCount.innerText = count;
    updateCartTotal()
}

function addToCart(event) {
    let button = event.target;
    let menuItem = button.parentElement.parentElement;
    let title = menuItem.querySelectorAll('.menu-text')[0].children[0].innerText;
    let price = menuItem.querySelectorAll('.menu-text')[0].children[1].innerText;
    let imageSrc = menuItem.querySelectorAll('.img-menu')[0].src;
    addItemtoCart(title, price, imageSrc);
    updateCartTotal();
    purchase.innerText = 'PURCHASE';
    let count = parseFloat(cartCount.innerText);
    console.log(count)
    count++;
    cartCount.innerText = count;
}


function addItemtoCart(title, price, imageSrc) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-item-one')
    let cartItemsNames = cartItems.querySelectorAll('.cart-title');
    for(i = 0; i < cartItemsNames.length; i++) {
        if(cartItemsNames[i].innerText === title) {
            add.forEach(btn => {
                btn.innerText = 'ITEM ALREADY ADDED!';
            }) 
            cartCount.innerText = count;
            return 
        }
    }
    let cartRowContents = `
        <div class="item-start">
            <img src="${imageSrc}" alt="pic">
            <p class="cart-title">${title}</p>
        </div>  
        <div class ="item-center">
        <p class="cart-price">${price}</p>
        </div>
        <div class="item-end">
            <input class="cart-quantity-input" type="number" value="1">
            <i class="uil uil-times"></i>
        </div>  
    `;
    cartRow.innerHTML = cartRowContents;
    cartContents.append(cartRow); 
    cartRow.querySelectorAll('.uil-times')[0].addEventListener('click', removeCartItem);
    cartRow.querySelectorAll('.cart-quantity-input')[0].addEventListener('change', quantitychanged);
}

// REMOVING CART ITEMS EVENT LISTENER
for(i = 0; i < removeCartItemBtn.length; i++) {
    removeCartItemBtn[i].addEventListener('click', removeCartItem)
}

for(i = 0; i < cartQuantityInput.length; i++) {
    let cartInput = cartQuantityInput[i];
    cartInput.addEventListener('change', quantitychanged)
}

function removeCartItem(event) {
    buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
    let count = parseFloat(cartCount.innerText);
    count--;
    cartCount.innerText = count;
}
// SET INPUT QUANTITY NUMBER TO 1
function quantitychanged(event) {
    let cartInput = event.target;
    if(isNaN(cartInput.value) || cartInput.value <= 0) {
        cartInput.value = 1;
    }
    updateCartTotal();
}

function updateCartTotal() {
    let cartItemContainer = document.querySelector('.cart-contents')
    const cartRows = cartItemContainer.querySelectorAll('.cart-item-one');
    let total = 0;
    for(i = 0; i < cartRows.length; i++) {
        let cartItem = cartRows[i];
        let priceElement = cartItem.querySelectorAll('.cart-price')[0];
        let quantityElement = cartItem.querySelectorAll('.cart-quantity-input')[0];
        let price = parseFloat(priceElement.innerText.replace('#', ''));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
        console.log(total)
    }
    document.querySelector('.cart-total-price').innerText = '#' + total;
}
// CONVERTING DECLARED VARIABLES TO ARRAYS
const array1 = Array.prototype.slice.call(menuOne);
const array2 = Array.prototype.slice.call(addBtn);
const array3 = Array.prototype.slice.call(add);
const array4 = Array.prototype.slice.call(menuPic);
const array5 = Array.prototype.slice.call(menuText)


// ADDING BUTTON ANIMATION TO EACH CART ITEM
array1[0].addEventListener('mouseenter', () => {
    addBtn[0].classList.add('button-up')
    addBtn[0].classList.remove('button-down')
    add[0].innerText = 'ADD TO CART';
});

array1[0].addEventListener('mouseleave', () => {
    addBtn[0].classList.add('button-down');
});

array1[1].addEventListener('mouseenter', () => {
    addBtn[1].classList.add('button-up');
    addBtn[1].classList.remove('button-down');
    add[1].innerText = 'ADD TO CART';
})


array1[1].addEventListener('mouseleave', () => {
    addBtn[1].classList.add('button-down');
})


array1[2].addEventListener('mouseenter', () => {
    addBtn[2].classList.add('button-up');
    addBtn[2].classList.remove('button-down');
    add[2].innerText = 'ADD TO CART';
})


array1[2].addEventListener('mouseleave', () => {
    addBtn[2].classList.add('button-down');
})

array1[3].addEventListener('mouseenter', () => {
    addBtn[3].classList.add('button-up')
    addBtn[3].classList.remove('button-down')
    add[3].innerText = 'ADD TO CART';
})

array1[3].addEventListener('mouseleave', () => {
    addBtn[3].classList.add('button-down');
})

array1[4].addEventListener('mouseenter', () => {
    addBtn[4].classList.add('button-up')
    addBtn[4].classList.remove('button-down')
    add[4].innerText = 'ADD TO CART';
})

array1[4].addEventListener('mouseleave', () => {
    addBtn[4].classList.add('button-down');
})

array1[5].addEventListener('mouseenter', () => {
    addBtn[5].classList.add('button-up');
    addBtn[5].classList.remove('button-down');
    add[5].innerText = 'ADD TO CART';
})

array1[5].addEventListener('mouseleave', () => {
    addBtn[5].classList.add('button-down');
})

array1[6].addEventListener('mouseenter', () => {
    addBtn[6].classList.add('button-up');
    addBtn[6].classList.remove('button-down');
    add[6].innerText = 'ADD TO CART';
})

array1[6].addEventListener('mouseleave', () => {
    addBtn[6].classList.add('button-down');
})

array1[7].addEventListener('mouseenter', () => {
    addBtn[7].classList.add('button-up');
    addBtn[7].classList.remove('button-down');
    add[7].innerText = 'ADD TO CART';
})

array1[7].addEventListener('mouseleave', () => {
    addBtn[7].classList.add('button-down');
})

array1[8].addEventListener('mouseenter', () => {
    addBtn[8].classList.add('button-up')
    addBtn[8].classList.remove('button-down')
    add[8].innerText = 'ADD TO CART';
})

array1[8].addEventListener('mouseleave', () => {
    addBtn[8].classList.add('button-down');
    
});



// CALLING THE COFFEE DESCRIPTION API
coffeeContainer.addEventListener('click', getDescription)

function getDescription(event) {
    if(event.target.classList.contains('description-btn')) {
        let coffeeItem = event.target.parentElement.parentElement;
        
        fetch('https://api.sampleapis.com/coffee/hot')
            .then(response => response.json())
            .then(data => {
                for(i = 0; i < data.length; i++) {
                    let item = (coffeeItem.getAttributeNode("data-id"));
                    let itemNumberValue = parseInt(item.value)
                    if(itemNumberValue === data[i].id) {
                        let htmlTwo = `
                        <h2 class="coffee-name-two">${data[i].title}</h2>
                        <div class="coffee-description">
                            <h2>Description</h2>
                            <p>${data[i].description}</p>
                        </div>
                        <div class="coffee-ingredients">
                            <h2>Ingredients</h2>
                            <p>${data[i].ingredients}</p>
                        </div> 
            `;
            coffeeDetailsContent.innerHTML = htmlTwo;
            coffeeDetailsContent.parentElement.classList.add('showDetails')
                } 
            }
        }) 
    }
}

// CALLING THE COFFEE API 
descCloseBtn.addEventListener('click', () => {
    coffeeDetailsContent.parentElement.classList.remove('showDetails')
});

fetch('https://api.sampleapis.com/coffee/hot')
.then(response => response.json())
.then(data => {
    let html = "";
        data.forEach(data => {
        html +=  `
    <div class="coffee-items" data-id= "${data.id}">
        <div class="coffee-img">
            <img src="${data.image}" alt="food">
        </div>
        <div class="coffee-name">
            <h3>${data.title}</h3>
            <button class="description-btn">Description</button>
        </div>
    </div>
        `;
    })
    coffeeContainer.innerHTML  = html;
})

// SWIPER FOR THE REVIEWS
var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    gragCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
  });

