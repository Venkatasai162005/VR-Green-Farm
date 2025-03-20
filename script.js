
//footer
// Smooth Scrolling Effect for Footer Links
document.querySelectorAll('footer ul li').forEach(item => {
    item.addEventListener('click', () => {
        alert('This feature is coming soon!'); // Add real links instead
    });
});
//welcome
// JavaScript to add fade-in effect on scroll
document.addEventListener("DOMContentLoaded", function () {
    // Select all "Add to Cart" buttons
        document.querySelectorAll(".add-to-cart-alex-jones").forEach(button => {
        button.addEventListener("click", function () {
            let product = this.closest(".product-jane-doe");
    
            if (!product) {
                console.error("Product container not found!");
                return;
            }
    
            let productImageElement = product.querySelector("img");
    
            if (!productImageElement) {
                console.error("Product image not found!");
                return;
            }
    
            let productImage = productImageElement.src;
            let productName = product.querySelector("h3").textContent;
            let productPrice = product.querySelector("p:nth-of-type(3)").textContent.replace("Price:Rs ", "");
            let quantity = product.querySelector(".quantity-input-john-doe").value;
    
            console.log("Product Image URL:", productImage); // ✅ Check in Console
    
            let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    
            let existingItem = cartItems.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity = parseInt(existingItem.quantity) + parseInt(quantity);
            } else {
                cartItems.push({
                    name: productName,
                    price: productPrice,
                    image: productImage, // ✅ Store image properly
                    quantity: quantity
                });
            }
    
            localStorage.setItem("cart", JSON.stringify(cartItems));
    
            alert("Added to Cart!");
            console.log(cartItems);
        });
    });
    

    // Function to update cart UI
    function updateCart() {
        let cartTable = document.getElementById("cart-items");
        let cartTotal = document.getElementById("cart-total");
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

        if (!cartTable) return; // Prevent error if cart page doesn't exist

        cartTable.innerHTML = "";
        let totalPrice = 0;

        cartItems.forEach((item, index) => {
            let row = `
                <tr>
                    <td><img src="${item.image}" width="50"></td>
                    <td>${item.name}</td>
                    <td>Rs ${item.price}</td>
                    <td>${item.quantity}</td>
                    <td>Rs ${item.price * item.quantity}</td>
                    <td><button onclick="removeItem(${index})">Remove</button></td>
                </tr>
            `;
            cartTable.innerHTML += row;
            totalPrice += item.price * item.quantity;
        });

        cartTotal.textContent = `Total: Rs ${totalPrice}`;
    }

    // Function to remove an item
    window.removeItem = function (index) {
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        cartItems.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        updateCart();
    };

    // If on the cart page, display cart items
    if (document.getElementById("cart-items")) {
        updateCart();
    }
});
