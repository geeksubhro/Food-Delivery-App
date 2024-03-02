document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    const closeBtn = document.getElementById('closeBtn');

    menuBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', closeMenu);

    document.addEventListener('click', function (event) {
        const isClickInsideMenu = menu.contains(event.target);
        const isClickInsideMenuBtn = menuBtn.contains(event.target);

        if (!isClickInsideMenu && !isClickInsideMenuBtn && menu.classList.contains('active')) {
            closeMenu();
        }
    });
});

function toggleMenu() {
    menu.classList.toggle('active');
    menuBtn.classList.toggle('active');
}

function closeMenu() {
    menu.classList.remove('active');
    menuBtn.classList.remove('active');
}



function highlightCategory(categoryId) {
    const categoryElement = document.getElementById(categoryId);
    if (categoryElement) {
        categoryElement.classList.add('active');
    }
}

function unhighlightCategory() {
    const activeCategory = document.querySelector('.categories li.active');
    if (activeCategory) {
        activeCategory.classList.remove('active');
    }
}

function toggleQuantity(foodId) {
    const quantityDiv = document.getElementById(`quantity-${foodId}`);
    const quantityValue = quantityDiv.querySelector('.quantity');
    if (parseInt(quantityValue.innerText) === 0) {
        quantityDiv.style.display = quantityDiv.style.display === 'none' ? 'flex' : 'none';
    }
    event.stopPropagation(); // Stop the event from propagating to the document level
}

document.addEventListener('click', function (event) {
    const isQuantityContainer = event.target.matches('.quantity-container') || event.target.closest('.quantity-container');
    const isQuantityButton = event.target.matches('.quantity-buttons button');
    const isQuantityZero = event.target.closest('.quantity-container') && event.target.matches('.quantity') && parseInt(event.target.innerText) === 0;

    if (!isQuantityContainer && !isQuantityZero && !isQuantityButton) {
        const quantityDivs = document.querySelectorAll('.quantity-container');
        quantityDivs.forEach(div => {
            const quantityValue = div.querySelector('.quantity');
            if (parseInt(quantityValue.innerText) === 0) {
                div.style.display = 'none';
            }
        });
    }
});

function changeQuantity(foodId, amount) {
    const quantityElement = document.getElementById(`quantity-value-${foodId}`);
    let quantity = parseInt(quantityElement.innerText);
    quantity = Math.max(0, quantity + amount);
    quantityElement.innerText = quantity;
}

      // Function to update and display the cart details
      function updateCartDetails() {
        const cartItemsDiv = document.getElementById("cart-items");
        const subtotalAmount = document.getElementById("subtotal-amount");
        const discountAmount = document.getElementById("discount-amount");
        const gstAmount = document.getElementById("gst-amount");
        const totalAmount = document.getElementById("total-amount");

        // Clear existing cart items
        cartItemsDiv.innerHTML = "";

        // Loop through selected items
        const selectedItems = document.querySelectorAll(".food-item");
        let cartSubtotal = 0;

        selectedItems.forEach((item) => {
          const itemName = item.querySelector(".food-name").innerText;
          const itemQuantity = parseInt(
            item.querySelector(".quantity").innerText
          );
          const itemPrice = parseFloat(
            item.querySelector(".food-price").innerText.slice(1)
          ); // Removing the $ sign

          // Calculate item subtotal without rounding
          const itemSubtotal = itemQuantity * itemPrice;
          cartSubtotal += itemSubtotal;

          // Display item in cart without rounding
          const cartItemDiv = document.createElement("div");
          cartItemDiv.innerHTML = `${itemName} x${itemQuantity} - $${itemSubtotal.toFixed(
            2
          )}`;
          cartItemsDiv.appendChild(cartItemDiv);
        });

        // Round the values only when displaying them
        const discount = 0.1 * cartSubtotal; // 10% discount
        const gst = 0.05 * cartSubtotal; // 5% GST
        const total = cartSubtotal - discount + gst;

        subtotalAmount.innerText = cartSubtotal.toFixed(2);
        discountAmount.innerText = discount.toFixed(2);
        gstAmount.innerText = gst.toFixed(2);
        totalAmount.innerText = total.toFixed(2);
      }

      // Call the function when the quantity changes
      document.addEventListener("click", function (event) {
        if (event.target.matches(".quantity-buttons button")) {
          updateCartDetails();
        }
      });