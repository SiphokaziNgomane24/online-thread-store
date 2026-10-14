import { db, auth } from "../Firebase/Firebase.js";
import { collection, getDocs, doc, getDoc, setDoc }
from "firebase/firestore";

const productGrid = document.getElementById("product-grid");

// Function to fetch products from Firestore

const categoryFilter = document.getElementById("category-filter");
let products = [];

async function loadProducts() {
    const snapshot = await getDocs(collection(db, "hoodies"));
        products = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            displayProducts(products);
}

function displayProducts(items) {
    productGrid.innerHTML = "";
        items.forEach(product => {

            const card = document.createElement("article");
                card.className = "product-card";
                    card.innerHTML = `
                            <img src="${product.imageURL}" alt="${product.name}">
                                <h2>${product.name}</h2>
                                        <p>${product.description}</p>
                                            <p>R${Number(product.price).toFixed(2)}</p>
                                                <button data-id="${product.id}">Add to Cart</button>
`;
    card.querySelector("button").addEventListener("click", () => {
        addToCart(product.id);
});

    productGrid.appendChild(card);
});
}
async function addToCart(productId) {
    const user = auth.currentUser;
        if (!user) {
alert("Please log in first.");
window.location.href = "login.html";
return;
}
        const cartRef = doc(db, "users", user.uid, "cart", productId);
            const existing = await getDoc(cartRef);
if (existing.exists()) {
        await setDoc(cartRef,
                { quantity: existing.data().quantity + 1 },
            { merge: true });} else {
                            await setDoc(cartRef, { productId, quantity: 1 });
}
alert("Added to cart!");
}
categoryFilter.addEventListener("change", () => {
            const value = categoryFilter.value;
            displayProducts(value === "All"
? products
: products.filter(p => p.category === value));
});
loadProducts();