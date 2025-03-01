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

let orderPrice = []

function sum(orderItems) {
    let sum = 0
    for (let i of orderItems) {
        sum += i
    }

    return sum
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
                orderPrice.push(existingCartItem.price)
            } else {
                cart.push({
                    name: dessertObject.name,
                    price: dessertObject.price,
                    quantity: 1,
                    total: dessertObject.price,
                })

                orderPrice.push(dessertObject.price)
            }
        }
        
        console.log(cart)

        const cartUpdate = `
            <h2>Your Cart(${cart.length})</h2>
            ${
                cart.map(item => `
                    <article class="with-items">
                        <div class="top">
                            <p class="name">${item.name}</p> 
                            <img src="./assets/images/icon-remove-item.svg" onClick="removeItemFromcart(${item.name})" />
                        </div>

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
                <h1>$${sum(orderPrice)}</h1>
            </article>

            <aside>
                <img src="./assets/images/icon-carbon-neutral.svg" />
                <p>This is a <strong>carbon-neutral</strong> delivery</p>
            </aside>

            <button class="btn-secondary">Confirm Order</button>
        `
        document.getElementById('cart').innerHTML = cartUpdate
    } catch (error) {
        console.error('Error adding to cart:', error)
    }
}

 function removeItemFromcart(item) {
    try {
        console.log('List')
    } catch (error) {
        console.error(error)
    }
}

fetchAndDisplayData()