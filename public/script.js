// ======================
// CART
// ======================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ======================
// ADD ITEM
// ======================

function addItem(name, price) {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({
            name: name,
            price: Number(price),
            qty: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " Added To Cart 🛒");
}

// ======================
// REMOVE ITEM
// ======================

function removeItem(index) {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    showCart();
}

// ======================
// SHOW CART
// ======================

function showCart() {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    let html = "";
    let total = 0;

    cart.forEach((food, index) => {

        total += food.price * food.qty;

        html += `
        <div class="card">
            <h2>${food.name}</h2>
            <p>Price : ₹${food.price}</p>
            <p>Quantity : ${food.qty}</p>

            <button onclick="removeItem(${index})">
                Remove
            </button>
        </div>
        <br>
        `;

    });

    if (document.getElementById("items"))
        document.getElementById("items").innerHTML = html;

    if (document.getElementById("total"))
        document.getElementById("total").innerHTML =
            "<h2>Total : ₹" + total + "</h2>";

    if (document.getElementById("item"))
        document.getElementById("item").value =
            cart.map(x => x.name).join(", ");

    if (document.getElementById("price"))
        document.getElementById("price").value = total;
}

// ======================
// LOAD FOOD API
// ======================

function loadFoods(search = "chicken") {

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then(res => res.json())
        .then(data => {

            let html = "";

            if (!data.meals) {
                document.getElementById("foods").innerHTML =
                    "<h2>No Food Found 😔</h2>";
                return;
            }

            data.meals.forEach(meal => {

                let price = Math.floor(Math.random() * 300) + 100;

                html += `
                <div class="card">

                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

                    <h2>${meal.strMeal}</h2>

                    <p>${meal.strCategory}</p>

                    <h3>₹${price}</h3>

                    <button
                        class="addBtn"
                        data-name="${meal.strMeal}"
                        data-price="${price}">
                        Add To Cart
                    </button>

                </div>
                `;

            });

            document.getElementById("foods").innerHTML = html;

            document.querySelectorAll(".addBtn").forEach(btn => {

                btn.addEventListener("click", function () {

                    addItem(
                        this.dataset.name,
                        this.dataset.price
                    );

                });

            });

        })
        .catch(err => {
            console.log(err);
        });
}

// ======================
// SEARCH
// ======================

function searchFood() {

    let food = document.getElementById("search").value.trim();

    if (food === "")
        food = "chicken";

    loadFoods(food);
}

// ======================
// AUTO LOAD
// ======================

if (document.getElementById("foods")) {
    loadFoods();
}