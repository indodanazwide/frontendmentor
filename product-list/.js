let cart = []

function addToCart(name) {
    try {
        const dessertObject = desserts.find(dessert => dessert.name === name)

        if (dessertObject) {
            let cartItem = { name: dessertObject.name, price: dessertObject.price }
            cart.push(cartItem)
        }

        console.log(cart)
        updateCartUI()
    } catch (error) {
        console.error('Error:', error)
    }
}

function updateCartUI() {
    const cartSection = document.querySelector(".cart")
    cartSection.innerHTML = `<h2>Your Cart(${cart.length})</h2>`

    if (cart.length === 0) {
        cartSection.innerHTML += "<p>Your cart is empty.</p>"
        return
    }

    let total = 0
    cart.forEach((item, index) => {
        total += item.price
        cartSection.innerHTML += `
            <div class="cart-item">
                <p>${item.name} - $${item.price.toFixed(2)}</p>
                <button onClick="removeFromCart(${index})">Remove</button>
            </div>
        `
    })

    cartSection.innerHTML += `<h3>Total: $${total.toFixed(2)}</h3>`
}

function removeFromCart(index) {
    cart.splice(index, 1)
    updateCartUI()
}

document.getElementById('items').innerHTML = desserts.map(item => `
    <li>
        <img src=${item.image.desktop} />
        <button class="cart-btn" onClick="addToCart('${item.name}')">
            <img src="./assets/images/icon-add-to-cart.svg" alt="Add to cart">
            
            <p>Add to cart</p>
        </button>
        <p class="category">${item.category}</p>
        <p class="name">${item.name}</p> 
        <p class="price">$${item.price.toString()}</p>
    </li>
`).join('')

