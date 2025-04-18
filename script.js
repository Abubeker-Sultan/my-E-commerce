const bar = document.getElementById('bar')
const cancl = document.getElementById('cancl')
const nav = document.getElementById('navbar')

if(bar){
    bar.addEventListener('click', () =>{
        nav.classList.add('active')
    })
}


if(cancl){
    cancl.addEventListener('click', () =>{
        nav.classList.remove('active')
    })
}
var sngleimage = document.getElementById("sngleimage");
var smallimage = document.getElementsByClassName("smallimage");

smallimage[0].onclick = function (){
    sngleimage.src= smallimage[0].src; 
}
smallimage[1].onclick = function (){
    sngleimage.src= smallimage[1].src; 
}
smallimage[2].onclick = function (){
    sngleimage.src= smallimage[2].src; 
}
smallimage[3].onclick = function (){
    sngleimage.src= smallimage[3].src; 
}
smallimage[4].onclick = function (){
    sngleimage.src= smallimage[4].src; 
}
smallimage[5].onclick = function (){
    sngleimage.src= smallimage[5].src; 
}
smallimage[6].onclick = function (){
    sngleimage.src= smallimage[6].src; 
}
smallimage[7].onclick = function (){
    sngleimage.src= smallimage[7].src; 
}




document.addEventListener("DOMContentLoaded", function() {

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.getElementById("cart-count");
  const addToCartButton = document.getElementById("add-to");
  const cartIcon = document.querySelector(".fa-cart-shopping");
  const sideCart = document.getElementById("side-cart");
  const productSelect = document.querySelector("select");
  const priceElement = document.querySelector(".sing-detail h2");

  const prices = {
      "Men's": 42000,
      "Women's": 40000
  };


  function updateCartCount() {
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = totalItems;
  }


  function updateSideCart() {
      sideCart.innerHTML = '';
      
      if (cart.length === 0) {
          sideCart.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
          return;
      }
      
   
      const cartHeader = document.createElement('div');
      cartHeader.className = 'cart-header';
      cartHeader.innerHTML = '<h3>Your Cart</h3>';
      sideCart.appendChild(cartHeader);
      
      const cartItemsContainer = document.createElement('div');
      cartItemsContainer.className = 'cart-items-container';
      
  
      cart.forEach((item, index) => {
          const cartItem = document.createElement('div');
          cartItem.className = 'cart-item';
          cartItem.innerHTML = `
              <div class="cart-item-image">
                  <img src="${item.image}" alt="${item.name}">
              </div>
              <div class="cart-item-details">
                  <span class="cart-item-name">${item.name} (${item.option})</span>
                  <span class="cart-item-price">${item.price.toLocaleString()} ETB x ${item.quantity}</span>
                  <div class="cart-item-actions">
                      <button class="quantity-btn minus" data-index="${index}">-</button>
                      <span class="item-quantity">${item.quantity}</span>
                      <button class="quantity-btn plus" data-index="${index}">+</button>
                      <button class="remove-btn" data-index="${index}">Remove</button>
                  </div>
              </div>
          `;
          cartItemsContainer.appendChild(cartItem);
      });
      
      sideCart.appendChild(cartItemsContainer);
      
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      const cartFooter = document.createElement('div');
      cartFooter.className = 'cart-footer';
      cartFooter.innerHTML = `
          <div class="cart-total">
              <span>Total:</span>
              <span class="total-amount">${total.toLocaleString()} ETB</span>
          </div>
          <div class="payment-methods">
              <h4>Payment Methods:</h4>
              <div class="payment-options">
                  <img src="resource/tele birr.png" alt="Telebirr">
                  <img src="resource/Santim.png" alt="SantimPay">
                  <img src="resource/visa.png" alt="Visa">
              </div>
          </div>
          <button class="checkout-btn">Proceed to Checkout</button>
      `;
      sideCart.appendChild(cartFooter);
      
    
      document.querySelectorAll('.quantity-btn').forEach(button => {
          button.addEventListener('click', function() {
              const index = parseInt(this.getAttribute('data-index'));
              const item = cart[index];
              
              if (this.classList.contains('minus')) {
                  if (item.quantity > 1) {
                      item.quantity--;
                  } else {
                      cart.splice(index, 1);
                  }
              } else if (this.classList.contains('plus')) {
                  item.quantity++;
              }
              
              saveCart();
              updateSideCart();
          });
      });
  
      document.querySelectorAll('.remove-btn').forEach(button => {
          button.addEventListener('click', function() {
              const index = parseInt(this.getAttribute('data-index'));
              cart.splice(index, 1);
              saveCart();
              updateSideCart();
          });
      });
      
    
      const checkoutBtn = document.querySelector('.checkout-btn');
      if (checkoutBtn) {
          checkoutBtn.addEventListener('click', function() {
              alert('Proceeding to checkout with ' + cart.reduce((total, item) => total + item.quantity, 0) + ' items');
              
          });
      }
  }
  

  function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
  }
  

  if (addToCartButton) {
      addToCartButton.addEventListener("click", function() {
          const productName = document.querySelector('.sing-detail h4').textContent;
          const selectedOption = productSelect.value;
          const quantity = parseInt(document.querySelector('.sing-detail input[type="number"]').value) || 1;
          const productImage = document.querySelector('.sing-pro-img .singleimage').src;
          const price = prices[selectedOption];
          
     
          const existingIndex = cart.findIndex(item => 
              item.name === productName && item.option === selectedOption
          );
          
          if (existingIndex >= 0) {
          
              cart[existingIndex].quantity += quantity;
          } else {
         
              cart.push({
                  name: productName,
                  option: selectedOption,
                  price: price,
                  quantity: quantity,
                  image: productImage
              });
          }
          
          saveCart();
          updateSideCart();
       
          sideCart.classList.add('active');
          
     
          alert(`${quantity} ${productName} (${selectedOption}) added to cart!`);
      });
  }
  
  if (productSelect) {
      productSelect.addEventListener("change", function() {
          const selectedProduct = productSelect.value;
          priceElement.textContent = `${prices[selectedProduct].toLocaleString()} ETB`;
      });
  }
  
 
  if (cartIcon) {
      cartIcon.addEventListener("click", function(e) {
          e.stopPropagation();
          sideCart.classList.toggle('active');
      });
  }
  

  document.addEventListener('click', function(e) {
      if (!sideCart.contains(e.target) && !cartIcon.contains(e.target)) {
          sideCart.classList.remove('active');
      }
  });
  

  sideCart.addEventListener('click', function(e) {
      e.stopPropagation();
  });
  

  updateCartCount();
  updateSideCart();
});

  










  