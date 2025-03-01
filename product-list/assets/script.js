let cart = []

async function fetchAndDisplayData() {
    try {
        let res = await fetch('/data.json')
        let data = await res.json()

        document.getElementById('items').innerHTML = data.map(item => `
            <li>
                <img src=${item.image.desktop} alt="${item.name}" class="dessert-img"/>
                <button class="btn-primary" onClick="addToCartAndDisplay('${item.name}')">
                    <img src="./assets/images/icon-add-to-cart.svg" alt="Add to cart">
                    
                    <p>Add to cart</p>
                </button>
                <p class="category">${item.category}</p>
                <p class="name">${item.name}</p> 
                <p class="price">$${item.price.toString()}</p>
            </li>
        `).join('')
    } catch (error) {
        console.error('Error while fetching data:', error)
    }
}

async function addToCartAndDisplay(name) {
    try {
        let res = await fetch('/data.json')
        let data = await res.json()

        const dessertObject =  await data.find(dessert => dessert.name === name)

        if (dessertObject) {
            const existingCartItem = await cart.find(item => item.name === dessertObject.name)

            if (existingCartItem) {
                existingCartItem.quantity += 1
                existingCartItem.total += existingCartItem.price
            } else {
                cart.push({
                    name: dessertObject.name,
                    price: dessertObject.price,
                    quantity: 1,
                    total: dessertObject.price
                })
            }
            
        }

        console.log(cart)

        const cartUpdate = `
            <h2>Your Cart(${cart.length})</h2>
            ${
                cart.map(item => `
                    <article class="with-items">
                        <p class="name">${item.name}</p> 

                        <div>
                            <p class="num">x${item.quantity}</p>
                            <p class="price">$${item.price.toString()}</p>
                            <p class="total">$${item.total}</p>
                        </div>
                        <hr />  
                    </article> 
                `).join('')
            }
            <article class="order">
                <p>Order Total</p>
                <h1>$</h1>
            </article>

            <button class="btn-secondary">Confirm Order</button>
        `
        document.getElementById('cart').innerHTML = cartUpdate
    } catch (error) {
        console.error('Error adding to cart:', error)
    }
}

fetchAndDisplayData()