const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCartIcon = document.querySelector("#cart-close")

cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
    
})
closeCartIcon.addEventListener("click", () => {
    cart.classList.remove("active");
    
})

// start when the document is ready 
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", start)
}else{
    start();
}
// =================START====================
function start() {
    addEvents();
}
// ======= UPDATE & RENDER ========
function update() {
    addEvents();
    updateTotal();
}
// ADD EVENTS FUNCTION
function addEvents() {
    // remove item from cart
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn)=> {
        btn.addEventListener("click", handle_removeCart);
    });

    // change item 
    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
    cartQuantity_inputs.forEach(input => {
      input.addEventListener("change", handle_changeItemQuantity);  
    });
    // Add item to cart
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach(btn => {
        btn.addEventListener("click", handle_addCartItem);
    });

    // Buy Order
    const buy_btn = document.querySelector(".buy-btn");
    buy_btn.addEventListener("click", handle_buyOrder);
}


//============== HANDLE EVENTS=============
let itemsAdded = []

function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    console.log(title, price, imgSrc);

    let newToAdd = {
        title,
        price,
        imgSrc,
    };

    if (itemsAdded.find((el) => el.title == newToAdd.title)) {
        alert("This item already exist!");
        return;
    }else{
        itemsAdded.push(newToAdd);
    }

    // Add Product to cart
    let cartBoxElement = cartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();
};



function handle_removeCart() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(el => 
        el.title != 
        this.parentElement.querySelector(".cart-product-title").innerHTML)

    update();
}

function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value);

    update();
}

function handle_buyOrder(e) {
    e.preventDefault();
    if (itemsAdded.length <= 0) {
        alert("There is no order to place yet!. Please place an order");
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = "",
    alert("Your Order is placed");
    itemsAdded = [];

    update();
}

// UPDATE & RERENDER FUNCTION

function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    let totalElement = document.querySelector(".total-price");
    let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total +=  price * quantity;
    });

    // to keep 2 digits after the decimal point
    total = total.toFixed(2);
    // or you can use this also
    // total = Math.round(total * 100) / 100;

    totalElement.innerHTML = "$" + total;
}

// ====HTML COMPONENTS======

function  cartBoxComponent(title, price, imgSrc){
    return `
    <div class="cart-box">
    <img src=${imgSrc} class="cart-img">
    <div class="details-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>   
    <!-- Remove Cart -->
    <i class='bx bx-trash cart-remove'></i>
    
</div>`
}

       